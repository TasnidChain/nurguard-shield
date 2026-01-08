import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { users, violations } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const complianceRouter = router({
  // Record a violation (blocked attempt or manual disable)
  recordViolation: protectedProcedure
    .input(
      z.object({
        ruleId: z.number(),
        violationType: z.enum(["attempt", "manual_disable"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userId = ctx.user.id;

      // Get current user
      const userResult = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (!userResult.length) throw new Error("User not found");

      const user = userResult[0];
      let newScore = user.complianceScore || 100;
      let resetStreak = false;

      // Calculate score penalty
      if (input.violationType === "attempt") {
        newScore = Math.max(0, newScore - 5); // Minor violation
      } else if (input.violationType === "manual_disable") {
        newScore = Math.max(0, newScore - 25); // Major violation
        resetStreak = true;
      }

      // Reset streak if score dropped significantly or manual disable
      let newStreakDays = user.streakDays;
      if (resetStreak || newScore < user.complianceScore - 10) {
        newStreakDays = 0;
      }

      // Record violation
      await db.insert(violations).values({
        userId,
        ruleId: input.ruleId,
        violationType: input.violationType,
      });

      // Update user
      await db
        .update(users)
        .set({
          complianceScore: newScore,
          streakDays: newStreakDays,
          lastViolationAt: new Date(),
          totalBlockedAttempts: (user.totalBlockedAttempts || 0) + 1,
        })
        .where(eq(users.id, userId));

      return {
        success: true,
        newScore,
        streakReset: resetStreak,
        message: resetStreak ? "Your streak was broken. Restart today stronger." : "Violation recorded",
      };
    }),

  // Get compliance status
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const userResult = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
    if (!userResult.length) throw new Error("User not found");

    const user = userResult[0];

    // Get today's violations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayViolations = await db
      .select()
      .from(violations)
      .where(eq(violations.userId, ctx.user.id));

    const todayViolationCount = todayViolations.filter((v) => {
      const vDate = new Date(v.createdAt);
      vDate.setHours(0, 0, 0, 0);
      return vDate.getTime() === today.getTime();
    }).length;

    return {
      complianceScore: user.complianceScore || 100,
      streakDays: user.streakDays || 0,
      totalBlockedAttempts: user.totalBlockedAttempts || 0,
      lastViolationAt: user.lastViolationAt,
      todayViolations: todayViolationCount,
      status: user.complianceScore! > 80 ? "ACTIVE" : user.complianceScore! > 50 ? "AT_RISK" : "BROKEN",
    };
  }),

  // Recover compliance score (1 point per clean day)
  recoverScore: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const userResult = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
    if (!userResult.length) throw new Error("User not found");

    const user = userResult[0];

    // Check if user had violations today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayViolations = await db
      .select()
      .from(violations)
      .where(eq(violations.userId, ctx.user.id));

    const hadViolationToday = todayViolations.some((v) => {
      const vDate = new Date(v.createdAt);
      vDate.setHours(0, 0, 0, 0);
      return vDate.getTime() === today.getTime();
    });

    if (!hadViolationToday && user.complianceScore! < 100) {
      // Recover 1 point per clean day
      const newScore = Math.min(100, (user.complianceScore || 100) + 1);
      await db
        .update(users)
        .set({ complianceScore: newScore })
        .where(eq(users.id, ctx.user.id));

      return { success: true, newScore };
    }

    return { success: false, message: "Had violations today" };
  }),
});
