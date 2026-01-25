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
  
  // NextDNS Integration
  nextdnsProfileId: varchar("nextdnsProfileId", { length: 128 }),
  
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

// ============================================================================
// MOBILE API TABLES - Device registration, entitlements, blocking rules
// ============================================================================

// Devices table - Register devices for mobile app
export const devices = mysqlTable("devices", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  userId: int("userId").notNull(),
  platform: mysqlEnum("platform", ["android", "ios"]).notNull(),
  deviceFingerprint: varchar("deviceFingerprint", { length: 128 }).notNull(),
  pushToken: varchar("pushToken", { length: 255 }),
  appVersion: varchar("appVersion", { length: 32 }).notNull(),
  osVersion: varchar("osVersion", { length: 32 }).notNull(),
  model: varchar("model", { length: 64 }).notNull(),
  locale: varchar("locale", { length: 16 }).notNull(),
  timezone: varchar("timezone", { length: 64 }).notNull(),
  lastSeenAt: timestamp("lastSeenAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Device = typeof devices.$inferSelect;
export type InsertDevice = typeof devices.$inferInsert;

// Entitlements table - Normalized subscription status for mobile
export const entitlements = mysqlTable("entitlements", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  userId: int("userId").notNull().unique(),
  status: mysqlEnum("status", ["active", "past_due", "canceled", "trial"]).notNull(),
  plan: varchar("plan", { length: 32 }).default("nurguard_yearly").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd").notNull(),
  source: varchar("source", { length: 32 }), // stripe, lemon, etc
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Entitlement = typeof entitlements.$inferSelect;
export type InsertEntitlement = typeof entitlements.$inferInsert;

// Rulesets table - Versioned blocking configurations
export const rulesets = mysqlTable("rulesets", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  platform: mysqlEnum("platform", ["android", "ios", "all"]).notNull(),
  version: int("version").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  notes: varchar("notes", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Ruleset = typeof rulesets.$inferSelect;
export type InsertRuleset = typeof rulesets.$inferInsert;

// Ruleset items table - Individual blocking rules (apps, domains, categories)
export const rulesetItems = mysqlTable("ruleset_items", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  rulesetId: varchar("rulesetId", { length: 26 }).notNull(),
  type: mysqlEnum("type", ["app", "domain", "category"]).notNull(),
  action: mysqlEnum("action", ["block", "allow"]).notNull(),
  key: varchar("key", { length: 255 }).notNull(), // package name, domain, or category
  metaJson: json("metaJson"), // Additional metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RulesetItem = typeof rulesetItems.$inferSelect;
export type InsertRulesetItem = typeof rulesetItems.$inferInsert;

// Time budgets table - Daily usage limits per category
export const timeBudgets = mysqlTable("time_budgets", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  userId: int("userId").notNull(),
  category: mysqlEnum("category", ["social", "entertainment", "learning", "deen"]).notNull(),
  dailyLimitSeconds: int("dailyLimitSeconds").notNull(),
  isEnabled: boolean("isEnabled").default(true).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TimeBudget = typeof timeBudgets.$inferSelect;
export type InsertTimeBudget = typeof timeBudgets.$inferInsert;

// Sacred hours table - Time windows for automatic blocking
export const sacredHours = mysqlTable("sacred_hours", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  userId: int("userId").notNull(),
  label: varchar("label", { length: 32 }).notNull(), // fajr, work, isha, custom
  daysMask: int("daysMask").notNull(), // Bitmask for days of week (0-127)
  startMinute: int("startMinute").notNull(), // 0-1439
  endMinute: int("endMinute").notNull(), // 0-1439
  timezone: varchar("timezone", { length: 64 }).notNull(),
  isEnabled: boolean("isEnabled").default(true).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SacredHour = typeof sacredHours.$inferSelect;
export type InsertSacredHour = typeof sacredHours.$inferInsert;

// Daily reports table - Aggregated daily metrics
export const dailyReports = mysqlTable("daily_reports", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  userId: int("userId").notNull(),
  deviceId: varchar("deviceId", { length: 26 }),
  date: timestamp("date").notNull(),
  blockedAttemptsTotal: int("blockedAttemptsTotal").default(0).notNull(),
  overridesTotal: int("overridesTotal").default(0).notNull(),
  timeSavedSeconds: int("timeSavedSeconds").default(0).notNull(),
  categoryUsedJson: json("categoryUsedJson"), // {"social": 2100, "entertainment": 900}
  triggeredHoursJson: json("triggeredHoursJson"), // {"0": 2, "1": 0, ..., "23": 5}
  topAppsJson: json("topAppsJson"), // Optional
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyReport = typeof dailyReports.$inferSelect;
export type InsertDailyReport = typeof dailyReports.$inferInsert;

// Device overrides table - Device-specific configuration overrides
export const deviceOverrides = mysqlTable("device_overrides", {
  id: varchar("id", { length: 26 }).primaryKey(), // ULID
  deviceId: varchar("deviceId", { length: 26 }).notNull().unique(),
  overridesJson: json("overridesJson").notNull(), // {"delay_seconds": 15, "strict_mode": true}
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DeviceOverride = typeof deviceOverrides.$inferSelect;
export type InsertDeviceOverride = typeof deviceOverrides.$inferInsert;
