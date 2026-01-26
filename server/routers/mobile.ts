import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { eq, and } from "drizzle-orm";
import * as schema from "../../drizzle/schema";
import { getDb } from "../db";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ENV } from "../_core/env";

// ============================================================================
// MOBILE API ROUTERS
// ============================================================================

/**
 * Generate a ULID-like ID (simplified)
 */
function generateId(): string {
  return crypto.randomBytes(13).toString("hex").substring(0, 26);
}

/**
 * Sign an entitlement token (JWT)
 */
function signEntitlementToken(userId: number, status: string, expiresIn = "24h"): string {
  return jwt.sign(
    {
      sub: userId.toString(),
      ent: status,
    },
    ENV.cookieSecret || "fallback-secret",
    { expiresIn } as any
  );
}

export const mobileRouter = router({
  /**
   * Device Registration
   * POST /api/mobile/devices/register
   */
  devices: router({
    register: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          platform: z.enum(["android", "ios"]),
          deviceFingerprint: z.string().min(1),
          appVersion: z.string().min(1),
          osVersion: z.string().min(1),
          model: z.string().min(1),
          locale: z.string().min(1),
          timezone: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          // Check if device already registered
          const existing = await db
            .select()
            .from(schema.devices)
            .where(
              and(
                eq(schema.devices.userId, input.userId),
                eq(schema.devices.deviceFingerprint, input.deviceFingerprint)
              )
            )
            .limit(1);

          let deviceId: string;

          if (existing.length > 0) {
            // Update last seen
            deviceId = existing[0].id;
            await db
              .update(schema.devices)
              .set({ lastSeenAt: new Date() })
              .where(eq(schema.devices.id, deviceId));
          } else {
            // Create new device
            deviceId = generateId();
            await db.insert(schema.devices).values({
              id: deviceId,
              userId: input.userId,
              platform: input.platform,
              deviceFingerprint: input.deviceFingerprint,
              appVersion: input.appVersion,
              osVersion: input.osVersion,
              model: input.model,
              locale: input.locale,
              timezone: input.timezone,
              lastSeenAt: new Date(),
            });
          }

          // Get active ruleset version for this platform
          const activeRuleset = await db
            .select()
            .from(schema.rulesets)
            .where(
              and(
                eq(schema.rulesets.isActive, true),
                eq(schema.rulesets.platform, input.platform)
              )
            )
            .limit(1);

          return {
            deviceId,
            serverTime: new Date().toISOString(),
            activeRulesetVersion: activeRuleset[0]?.version || 1,
          };
        } catch (error) {
          console.error("Device registration error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to register device",
          });
        }
      }),
  }),

  /**
   * Entitlement Check
   * GET /api/mobile/entitlement
   */
  entitlement: router({
    check: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const entitlement = await db
            .select()
            .from(schema.entitlements)
            .where(eq(schema.entitlements.userId, input.userId))
            .limit(1);

          if (!entitlement || entitlement.length === 0) {
            return {
              status: "inactive",
              currentPeriodEnd: null,
              entitlementToken: null,
            };
          }

          const ent = entitlement[0];
          const token = signEntitlementToken(input.userId, ent.status);

          return {
            status: ent.status,
            currentPeriodEnd: ent.currentPeriodEnd?.toISOString(),
            entitlementToken: token,
          };
        } catch (error) {
          console.error("Entitlement check error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to check entitlement",
          });
        }
      }),
  }),

  /**
   * Rules Fetch
   * GET /api/mobile/rules
   */
  rules: router({
    get: publicProcedure
      .input(
        z.object({
          platform: z.enum(["android", "ios"]),
          currentRulesetVersion: z.number().optional(),
        })
      )
      .query(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          // Get active ruleset for platform
          const activeRuleset = await db
            .select()
            .from(schema.rulesets)
            .where(
              and(
                eq(schema.rulesets.isActive, true),
                eq(schema.rulesets.platform, input.platform)
              )
            )
            .limit(1);

          if (!activeRuleset || activeRuleset.length === 0) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "No active ruleset found",
            });
          }

          const ruleset = activeRuleset[0];

          // If client has latest version, return upToDate
          if (input.currentRulesetVersion === ruleset.version) {
            return { upToDate: true };
          }

          // Get ruleset items
          const items = await db
            .select()
            .from(schema.rulesetItems)
            .where(eq(schema.rulesetItems.rulesetId, ruleset.id));

          // For now, return empty arrays (will be populated with domain lists later)
          return {
            upToDate: false,
            rulesetVersion: ruleset.version,
            items: items.map((item) => ({
              type: item.type,
              action: item.action,
              key: item.key,
              meta: item.metaJson,
            })),
            timeBudgets: [], // Will be user-specific
            sacredHours: [], // Will be user-specific
            deviceOverrides: null,
          };
        } catch (error) {
          console.error("Rules fetch error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch rules",
          });
        }
      }),
  }),

  /**
   * Submit Daily Report
   * POST /api/mobile/reports/daily
   */
  reports: router({
    submitDaily: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          deviceId: z.string(),
          date: z.string().datetime(),
          blockedAttemptsTotal: z.number(),
          overridesTotal: z.number(),
          timeSavedSeconds: z.number(),
          categoryUsed: z.record(z.string(), z.number()).optional(),
          triggeredHours: z.record(z.string(), z.number()).optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const reportId = generateId();

          await db.insert(schema.dailyReports).values({
            id: reportId,
            userId: input.userId,
            deviceId: input.deviceId,
            date: new Date(input.date),
            blockedAttemptsTotal: input.blockedAttemptsTotal,
            overridesTotal: input.overridesTotal,
            timeSavedSeconds: input.timeSavedSeconds,
            categoryUsedJson: input.categoryUsed || {},
            triggeredHoursJson: input.triggeredHours || {},
          });

          return { ok: true, reportId };
        } catch (error) {
          console.error("Report submission error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to submit report",
          });
        }
      }),
  }),

  /**
   * Get User Config (Time Budgets + Sacred Hours)
   */
  config: router({
    getUser: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const timeBudgets = await db
            .select()
            .from(schema.timeBudgets)
            .where(eq(schema.timeBudgets.userId, input.userId));
          
          const sacredHours = await db
            .select()
            .from(schema.sacredHours)
            .where(eq(schema.sacredHours.userId, input.userId));

          return {
            timeBudgets: timeBudgets.map((tb) => ({
              id: tb.id,
              category: tb.category,
              dailyLimitSeconds: tb.dailyLimitSeconds,
              isEnabled: tb.isEnabled,
            })),
            sacredHours: sacredHours.map((sh) => ({
              id: sh.id,
              label: sh.label,
              daysMask: sh.daysMask,
              startMinute: sh.startMinute,
              endMinute: sh.endMinute,
              timezone: sh.timezone,
              isEnabled: sh.isEnabled,
            })),
          };
        } catch (error) {
          console.error("Config fetch error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch config",
          });
        }
      }),

    /**
     * Get User Preferences (Cooldown, etc.)
     */
    getPreferences: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const prefs = await db
            .select()
            .from(schema.userPreferences)
            .where(eq(schema.userPreferences.userId, input.userId))
            .limit(1);

          if (!prefs || prefs.length === 0) {
            // Return defaults
            return {
              cooldownSeconds: 7,
              lastSyncedAt: null,
            };
          }

          return {
            cooldownSeconds: prefs[0].cooldownSeconds,
            lastSyncedAt: prefs[0].updatedAt?.toISOString(),
          };
        } catch (error) {
          console.error("Preferences fetch error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch preferences",
          });
        }
      }),

    /**
     * Update User Preferences
     */
    updatePreferences: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          cooldownSeconds: z.number().min(3).max(60),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          // Check if preferences exist
          const existing = await db
            .select()
            .from(schema.userPreferences)
            .where(eq(schema.userPreferences.userId, input.userId))
            .limit(1);

          if (existing.length > 0) {
            // Update existing
            await db
              .update(schema.userPreferences)
              .set({
                cooldownSeconds: input.cooldownSeconds,
                updatedAt: new Date(),
              })
              .where(eq(schema.userPreferences.userId, input.userId));
          } else {
            // Create new
            await db.insert(schema.userPreferences).values({
              id: generateId(),
              userId: input.userId,
              cooldownSeconds: input.cooldownSeconds,
              updatedAt: new Date(),
            });
          }

          return { ok: true };
        } catch (error) {
          console.error("Preferences update error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update preferences",
          });
        }
      }),

    /**
     * Update Time Budget
     */
    updateTimeBudget: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          category: z.enum(["social", "entertainment", "learning", "deen"]),
          dailyLimitSeconds: z.number(),
          isEnabled: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const existing = await db
            .select()
            .from(schema.timeBudgets)
            .where(
              and(
                eq(schema.timeBudgets.userId, input.userId),
                eq(schema.timeBudgets.category, input.category)
              )
            )
            .limit(1);

          if (existing.length > 0) {
            await db
              .update(schema.timeBudgets)
              .set({
                dailyLimitSeconds: input.dailyLimitSeconds,
                isEnabled: input.isEnabled,
              })
              .where(eq(schema.timeBudgets.id, existing[0].id));
          } else {
            await db.insert(schema.timeBudgets).values({
              id: generateId(),
              userId: input.userId,
              category: input.category,
              dailyLimitSeconds: input.dailyLimitSeconds,
              isEnabled: input.isEnabled,
            });
          }

          return { ok: true };
        } catch (error) {
          console.error("Time budget update error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update time budget",
          });
        }
      }),

    /**
     * Update Sacred Hour
     */
    updateSacredHour: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          label: z.string(),
          daysMask: z.number(),
          startMinute: z.number(),
          endMinute: z.number(),
          timezone: z.string(),
          isEnabled: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const existing = await db
            .select()
            .from(schema.sacredHours)
            .where(
              and(
                eq(schema.sacredHours.userId, input.userId),
                eq(schema.sacredHours.label, input.label)
              )
            )
            .limit(1);

          if (existing.length > 0) {
            await db
              .update(schema.sacredHours)
              .set({
                daysMask: input.daysMask,
                startMinute: input.startMinute,
                endMinute: input.endMinute,
                timezone: input.timezone,
                isEnabled: input.isEnabled,
              })
              .where(eq(schema.sacredHours.id, existing[0].id));
          } else {
            await db.insert(schema.sacredHours).values({
              id: generateId(),
              userId: input.userId,
              label: input.label,
              daysMask: input.daysMask,
              startMinute: input.startMinute,
              endMinute: input.endMinute,
              timezone: input.timezone,
              isEnabled: input.isEnabled,
            });
          }

          return { ok: true };
        } catch (error) {
          console.error("Sacred hour update error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update sacred hour",
          });
        }
      }),
  }),
});
