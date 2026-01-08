import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

// ============================================================================
// USERS TABLE - Extended with subscription, affiliate, and onboarding fields
// ============================================================================
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Subscription fields
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["free", "active", "cancelled", "expired"]).default("free").notNull(),
  subscriptionId: varchar("subscriptionId", { length: 128 }),
  lemonSqueezyCustomerId: varchar("lemonSqueezyCustomerId", { length: 128 }),
  subscriptionEndsAt: timestamp("subscriptionEndsAt"),
  
  // Affiliate fields
  affiliateCode: varchar("affiliateCode", { length: 32 }).unique(),
  referredBy: varchar("referredBy", { length: 32 }),
  affiliateEarnings: decimal("affiliateEarnings", { precision: 10, scale: 2 }).default("0.00"),
  availableBalance: decimal("availableBalance", { precision: 10, scale: 2 }).default("0.00"),
  
  // Onboarding state
  hasCompletedOnboarding: int("hasCompletedOnboarding").default(0).notNull(),
  protectionIntent: text("protectionIntent"), // JSON array: ["social_media", "adult_content", etc]
  
  // Compliance & Streak tracking
  streakDays: int("streakDays").default(0).notNull(),
  streakStartedAt: timestamp("streakStartedAt"),
  complianceScore: int("complianceScore").default(100).notNull(),
  lastViolationAt: timestamp("lastViolationAt"),
  totalBlockedAttempts: int("totalBlockedAttempts").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================================
// BLOCKING RULES TABLE - Website, app, and keyword blocking
// ============================================================================
export const blockingRules = mysqlTable("blocking_rules", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  ruleType: mysqlEnum("ruleType", ["website", "app", "keyword", "category"]).notNull(),
  value: varchar("value", { length: 512 }).notNull(), // URL, app name, keyword, or category
  
  isActive: boolean("isActive").default(true).notNull(),
  dailyLimitMinutes: int("dailyLimitMinutes"), // null = fully blocked
  
  schedule: json("schedule"), // { days: [0-6], startTime: "HH:MM", endTime: "HH:MM" }
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlockingRule = typeof blockingRules.$inferSelect;
export type InsertBlockingRule = typeof blockingRules.$inferInsert;

// ============================================================================
// VIOLATIONS TABLE - Track compliance violations
// ============================================================================
export const violations = mysqlTable("violations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  ruleId: int("ruleId").notNull(),
  
  violationType: varchar("violationType", { length: 64 }).notNull(), // "attempt", "manual_disable"
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Violation = typeof violations.$inferSelect;
export type InsertViolation = typeof violations.$inferInsert;

// ============================================================================
// USAGE ANALYTICS TABLE - Track user activity and compliance
// ============================================================================
export const usageAnalytics = mysqlTable("usage_analytics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  date: timestamp("date").notNull(),
  
  // Time tracking (in minutes)
  totalScreenTime: int("totalScreenTime").default(0),
  blockedAttempts: int("blockedAttempts").default(0),
  
  // Compliance
  complianceScore: int("complianceScore").default(100), // 0-100
  rulesViolated: int("rulesViolated").default(0),
  
  // Categories breakdown (JSON)
  categoryBreakdown: json("categoryBreakdown"), // { "social": 30, "work": 120, ... }
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UsageAnalytic = typeof usageAnalytics.$inferSelect;
export type InsertUsageAnalytic = typeof usageAnalytics.$inferInsert;

// ============================================================================
// STREAKS TABLE - Track user discipline streaks
// ============================================================================
export const streaks = mysqlTable("streaks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastActiveDate: timestamp("lastActiveDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = typeof streaks.$inferInsert;

// ============================================================================
// AFFILIATE REFERRALS TABLE - Track referral relationships
// ============================================================================
export const affiliateReferrals = mysqlTable("affiliate_referrals", {
  id: int("id").autoincrement().primaryKey(),
  
  referrerId: int("referrerId").notNull(), // User who referred
  referredId: int("referredId").notNull(), // User who was referred
  referralCode: varchar("referralCode", { length: 32 }).notNull(),
  
  status: mysqlEnum("status", ["pending", "converted", "expired"]).default("pending").notNull(),
  convertedAt: timestamp("convertedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AffiliateReferral = typeof affiliateReferrals.$inferSelect;
export type InsertAffiliateReferral = typeof affiliateReferrals.$inferInsert;

// ============================================================================
// TRANSACTIONS TABLE - Track all financial transactions
// ============================================================================
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  type: mysqlEnum("type", ["subscription", "affiliate_commission", "foundation_donation", "gift_purchase", "gift_redemption", "payout"]).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  
  description: text("description"),
  
  // External references
  lemonSqueezyOrderId: varchar("lemonSqueezyOrderId", { length: 128 }),
  relatedUserId: int("relatedUserId"), // For affiliate commissions
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

// ============================================================================
// GIFT CODES TABLE - Gift subscription codes
// ============================================================================
export const giftCodes = mysqlTable("gift_codes", {
  id: int("id").autoincrement().primaryKey(),
  
  code: varchar("code", { length: 32 }).notNull().unique(),
  
  purchaserId: int("purchaserId").notNull(),
  redeemedById: int("redeemedById"),
  
  durationMonths: int("durationMonths").default(1).notNull(),
  
  status: mysqlEnum("status", ["available", "redeemed", "expired"]).default("available").notNull(),
  
  purchasedAt: timestamp("purchasedAt").defaultNow().notNull(),
  redeemedAt: timestamp("redeemedAt"),
  expiresAt: timestamp("expiresAt"),
});

export type GiftCode = typeof giftCodes.$inferSelect;
export type InsertGiftCode = typeof giftCodes.$inferInsert;

// ============================================================================
// FOUNDATION DONATIONS TABLE - Track 20% donations
// ============================================================================
export const foundationDonations = mysqlTable("foundation_donations", {
  id: int("id").autoincrement().primaryKey(),
  
  transactionId: int("transactionId").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  
  // Masajid Builder Foundation tracking
  foundationName: varchar("foundationName", { length: 128 }).default("Masajid Builder Foundation").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FoundationDonation = typeof foundationDonations.$inferSelect;
export type InsertFoundationDonation = typeof foundationDonations.$inferInsert;
