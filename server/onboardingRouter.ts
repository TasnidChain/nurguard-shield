import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { users, blockingRules } from "../drizzle/schema";
import { eq } from "drizzle-orm";

type ProtectionIntent = "social_media" | "adult_content" | "gaming" | "news" | "custom";

// Preset blocking rules for each intent
const PRESETS: Record<ProtectionIntent, Array<{ type: "website" | "app" | "category"; value: string; schedule?: { days: number[]; startTime: string; endTime: string } }>> = {
  social_media: [
    { type: "category", value: "social_media", schedule: { days: [1, 2, 3, 4, 5], startTime: "09:00", endTime: "17:00" } },
    { type: "website", value: "youtube.com" },
    { type: "website", value: "instagram.com" },
    { type: "website", value: "tiktok.com" },
    { type: "website", value: "reddit.com" },
    { type: "website", value: "x.com" },
  ],
  adult_content: [
    { type: "category", value: "adult", schedule: { days: [0, 1, 2, 3, 4, 5, 6], startTime: "00:00", endTime: "23:59" } },
  ],
  gaming: [
    { type: "category", value: "gaming", schedule: { days: [1, 2, 3, 4, 5], startTime: "09:00", endTime: "17:00" } },
    { type: "website", value: "steam.com" },
    { type: "website", value: "epicgames.com" },
    { type: "app", value: "Steam" },
  ],
  news: [
    { type: "category", value: "news", schedule: { days: [0, 1, 2, 3, 4, 5, 6], startTime: "00:00", endTime: "23:59" } },
    { type: "website", value: "cnn.com" },
    { type: "website", value: "bbc.com" },
  ],
  custom: [],
};

export const onboardingRouter = router({
  complete: protectedProcedure
    .input(
      z.object({
        protectionIntent: z.array(z.enum(["social_media", "adult_content", "gaming", "news", "custom"])),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userId = ctx.user.id;

      // Save protection intent
      await db
        .update(users)
        .set({
          hasCompletedOnboarding: 1,
          protectionIntent: JSON.stringify(input.protectionIntent),
          streakDays: 1,
          streakStartedAt: new Date(),
          complianceScore: 100,
          totalBlockedAttempts: 0,
        })
        .where(eq(users.id, userId));

      // Create blocking rules for selected intents
      for (const intent of input.protectionIntent) {
        const presets = PRESETS[intent as ProtectionIntent];
        for (const preset of presets) {
          await db.insert(blockingRules).values({
            userId,
            ruleType: preset.type,
            value: preset.value,
            isActive: true,
            schedule: preset.schedule ? JSON.stringify(preset.schedule) : null,
          });
        }
      }

      return {
        success: true,
        message: "Onboarding completed. Protection activated.",
      };
    }),

  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);

    if (!user.length) throw new Error("User not found");

    return {
      hasCompletedOnboarding: user[0].hasCompletedOnboarding === 1,
      protectionIntent: user[0].protectionIntent ? JSON.parse(user[0].protectionIntent) : [],
      streakDays: user[0].streakDays,
      complianceScore: user[0].complianceScore,
    };
  }),
});
