import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { nanoid } from "nanoid";

// ============================================================================
// SUBSCRIPTION ROUTER
// ============================================================================
const subscriptionRouter = router({
  // Get current user's subscription status
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.getUserById(ctx.user.id);
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    
    return {
      status: user.subscriptionStatus,
      subscriptionId: user.subscriptionId,
      endsAt: user.subscriptionEndsAt,
      isActive: user.subscriptionStatus === "active",
    };
  }),
  
  // Get checkout URL for Lemon Squeezy
  getCheckoutUrl: protectedProcedure
    .input(z.object({ affiliateCode: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const checkoutUrl = process.env.LEMON_SQUEEZY_CHECKOUT_URL;
      
      if (!checkoutUrl) {
        throw new TRPCError({ 
          code: "INTERNAL_SERVER_ERROR", 
          message: "Checkout URL not configured" 
        });
      }
      
      // Return the checkout URL directly
      return { url: checkoutUrl };
    }),
    
  // Redeem a gift code
  redeemGiftCode: protectedProcedure
    .input(z.object({ code: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const giftCode = await db.getGiftCodeByCode(input.code.toUpperCase());
      
      if (!giftCode) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Gift code not found" });
      }
      
      if (giftCode.status !== "available") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Gift code has already been used or expired" });
      }
      
      const success = await db.redeemGiftCode(input.code.toUpperCase(), ctx.user.id);
      
      if (success) {
        // Activate subscription for the user
        const endsAt = new Date();
        endsAt.setMonth(endsAt.getMonth() + giftCode.durationMonths);
        
        await db.updateUserSubscription(ctx.user.id, {
          subscriptionStatus: "active",
          subscriptionEndsAt: endsAt,
        });
        
        // Log transaction
        await db.createTransaction({
          userId: ctx.user.id,
          type: "gift_redemption",
          amount: "0.00",
          description: `Redeemed gift code for ${giftCode.durationMonths} month(s)`,
        });
      }
      
      return { success };
    }),
});

// ============================================================================
// BLOCKING ROUTER
// ============================================================================
const blockingRouter = router({
  // Get all blocking rules for current user
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.getBlockingRules(ctx.user.id);
  }),
  
  // Create a new blocking rule
  create: protectedProcedure
    .input(z.object({
      ruleType: z.enum(["website", "app", "keyword", "category"]),
      value: z.string().min(1).max(512),
      dailyLimitMinutes: z.number().min(0).max(1440).optional(),
      schedule: z.object({
        days: z.array(z.number().min(0).max(6)),
        startTime: z.string(),
        endTime: z.string(),
      }).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check subscription for premium features
      const user = await db.getUserById(ctx.user.id);
      if (!user || user.subscriptionStatus !== "active") {
        // Free users get limited rules
        const existingRules = await db.getBlockingRules(ctx.user.id);
        if (existingRules.length >= 5) {
          throw new TRPCError({ 
            code: "FORBIDDEN", 
            message: "Free users can only create 5 blocking rules. Upgrade to unlock unlimited rules." 
          });
        }
      }
      
      const id = await db.createBlockingRule({
        userId: ctx.user.id,
        ruleType: input.ruleType,
        value: input.value,
        dailyLimitMinutes: input.dailyLimitMinutes,
        schedule: input.schedule,
      });
      
      return { id };
    }),
    
  // Update a blocking rule
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      isActive: z.boolean().optional(),
      dailyLimitMinutes: z.number().min(0).max(1440).optional().nullable(),
      schedule: z.object({
        days: z.array(z.number().min(0).max(6)),
        startTime: z.string(),
        endTime: z.string(),
      }).optional().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.updateBlockingRule(input.id, ctx.user.id, {
        isActive: input.isActive,
        dailyLimitMinutes: input.dailyLimitMinutes,
        schedule: input.schedule,
      });
      return { success: true };
    }),
    
  // Delete a blocking rule
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.deleteBlockingRule(input.id, ctx.user.id);
      return { success: true };
    }),
});

// ============================================================================
// ANALYTICS ROUTER
// ============================================================================
const analyticsRouter = router({
  // Get usage analytics for a date range
  getUsage: protectedProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const analytics = await db.getUsageAnalytics(
        ctx.user.id,
        new Date(input.startDate),
        new Date(input.endDate)
      );
      return analytics;
    }),
    
  // Get current streak
  getStreak: protectedProcedure.query(async ({ ctx }) => {
    const streak = await db.getStreak(ctx.user.id);
    return streak || { currentStreak: 0, longestStreak: 0 };
  }),
  
  // Get dashboard summary
  getDashboard: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const [analytics, streak, rules] = await Promise.all([
      db.getUsageAnalytics(ctx.user.id, weekAgo, today),
      db.getStreak(ctx.user.id),
      db.getBlockingRules(ctx.user.id),
    ]);
    
    // Calculate averages
    const avgCompliance = analytics.length > 0
      ? Math.round(analytics.reduce((sum, a) => sum + (a.complianceScore || 0), 0) / analytics.length)
      : 100;
    
    const totalBlockedAttempts = analytics.reduce((sum, a) => sum + (a.blockedAttempts || 0), 0);
    const avgScreenTime = analytics.length > 0
      ? Math.round(analytics.reduce((sum, a) => sum + (a.totalScreenTime || 0), 0) / analytics.length)
      : 0;
    
    return {
      complianceScore: avgCompliance,
      currentStreak: streak?.currentStreak || 0,
      longestStreak: streak?.longestStreak || 0,
      totalBlockedAttempts,
      avgScreenTimeMinutes: avgScreenTime,
      activeRules: rules.filter(r => r.isActive).length,
      totalRules: rules.length,
      weeklyAnalytics: analytics,
    };
  }),
});

// ============================================================================
// AFFILIATE ROUTER
// ============================================================================
const affiliateRouter = router({
  // Get affiliate stats for current user
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.getUserById(ctx.user.id);
    const referrals = await db.getAffiliateReferrals(ctx.user.id);
    
    const convertedCount = referrals.filter(r => r.status === "converted").length;
    const pendingCount = referrals.filter(r => r.status === "pending").length;
    
    return {
      affiliateCode: user?.affiliateCode || "",
      totalEarnings: parseFloat(user?.affiliateEarnings?.toString() || "0"),
      availableBalance: parseFloat(user?.availableBalance?.toString() || "0"),
      totalReferrals: referrals.length,
      convertedReferrals: convertedCount,
      pendingReferrals: pendingCount,
      referrals: referrals.slice(0, 20), // Last 20 referrals
    };
  }),
  
  // Get affiliate leaderboard
  getLeaderboard: publicProcedure.query(async () => {
    return db.getAffiliateLeaderboard(10);
  }),
  
  // Validate an affiliate code
  validateCode: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const user = await db.getUserByAffiliateCode(input.code.toUpperCase());
      return {
        valid: !!user,
        affiliateName: user?.name || "Anonymous",
      };
    }),
    
  // Get user's transactions
  getTransactions: protectedProcedure.query(async ({ ctx }) => {
    return db.getUserTransactions(ctx.user.id);
  }),
});

// ============================================================================
// GIFT ROUTER
// ============================================================================
const giftRouter = router({
  // Purchase a gift code
  purchase: protectedProcedure
    .input(z.object({ durationMonths: z.number().min(1).max(12) }))
    .mutation(async ({ ctx, input }) => {
      // In production, this would integrate with Lemon Squeezy
      // For now, create the gift code directly
      const code = await db.createGiftCode({
        purchaserId: ctx.user.id,
        durationMonths: input.durationMonths,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year expiry
      });
      
      await db.createTransaction({
        userId: ctx.user.id,
        type: "gift_purchase",
        amount: (7.77 * input.durationMonths).toFixed(2),
        description: `Purchased ${input.durationMonths} month gift code`,
      });
      
      return { code };
    }),
    
  // Get user's purchased gift codes
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.getUserGiftCodes(ctx.user.id);
  }),
});

// ============================================================================
// FOUNDATION ROUTER
// ============================================================================
const foundationRouter = router({
  // Get total donations to Masajid Builder Foundation
  getTotal: publicProcedure.query(async () => {
    const total = await db.getTotalFoundationDonations();
    return {
      total,
      foundationName: "Masajid Builder Foundation",
      percentage: 20,
    };
  }),
});

// ============================================================================
// MAIN APP ROUTER
// ============================================================================
export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  
  subscription: subscriptionRouter,
  blocking: blockingRouter,
  analytics: analyticsRouter,
  affiliate: affiliateRouter,
  gift: giftRouter,
  foundation: foundationRouter,
});

export type AppRouter = typeof appRouter;
