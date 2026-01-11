import { eq, and, desc, sql, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  blockingRules, InsertBlockingRule, BlockingRule,
  usageAnalytics, InsertUsageAnalytic,
  streaks, InsertStreak,
  affiliateReferrals, InsertAffiliateReferral,
  transactions, InsertTransaction,
  giftCodes, InsertGiftCode,
  foundationDonations, InsertFoundationDonation
} from "../drizzle/schema";
import { ENV } from './_core/env';
import { nanoid } from 'nanoid';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================================================
// USER HELPERS
// ============================================================================
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
      affiliateCode: nanoid(8).toUpperCase(), // Generate affiliate code on creation
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByAffiliateCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.affiliateCode, code)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserSubscription(userId: number, data: {
  subscriptionStatus: "free" | "active" | "cancelled" | "expired";
  subscriptionId?: string;
  lemonSqueezyCustomerId?: string;
  subscriptionEndsAt?: Date;
}) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set(data).where(eq(users.id, userId));
}

export async function updateUserAffiliateBalance(userId: number, amount: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({
    affiliateEarnings: sql`${users.affiliateEarnings} + ${amount.toFixed(2)}`,
    availableBalance: sql`${users.availableBalance} + ${amount.toFixed(2)}`,
  }).where(eq(users.id, userId));
}

// ============================================================================
// BLOCKING RULES HELPERS
// ============================================================================
export async function getBlockingRules(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blockingRules).where(eq(blockingRules.userId, userId)).orderBy(desc(blockingRules.createdAt));
}

export async function createBlockingRule(rule: InsertBlockingRule) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(blockingRules).values(rule);
  return result[0].insertId;
}

export async function updateBlockingRule(id: number, userId: number, data: Partial<InsertBlockingRule>) {
  const db = await getDb();
  if (!db) return;
  await db.update(blockingRules).set(data).where(and(eq(blockingRules.id, id), eq(blockingRules.userId, userId)));
}

export async function deleteBlockingRule(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(blockingRules).where(and(eq(blockingRules.id, id), eq(blockingRules.userId, userId)));
}

// ============================================================================
// USAGE ANALYTICS HELPERS
// ============================================================================
export async function getUsageAnalytics(userId: number, startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(usageAnalytics)
    .where(and(
      eq(usageAnalytics.userId, userId),
      gte(usageAnalytics.date, startDate),
      lte(usageAnalytics.date, endDate)
    ))
    .orderBy(desc(usageAnalytics.date));
}

export async function upsertUsageAnalytics(data: InsertUsageAnalytic) {
  const db = await getDb();
  if (!db) return;
  await db.insert(usageAnalytics).values(data).onDuplicateKeyUpdate({
    set: {
      totalScreenTime: data.totalScreenTime,
      blockedAttempts: data.blockedAttempts,
      complianceScore: data.complianceScore,
      rulesViolated: data.rulesViolated,
      categoryBreakdown: data.categoryBreakdown,
    }
  });
}

// ============================================================================
// STREAKS HELPERS
// ============================================================================
export async function getStreak(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(streaks).where(eq(streaks.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertStreak(userId: number, data: Partial<InsertStreak>) {
  const db = await getDb();
  if (!db) return;
  await db.insert(streaks).values({ userId, ...data }).onDuplicateKeyUpdate({
    set: data
  });
}

// ============================================================================
// AFFILIATE HELPERS
// ============================================================================
export async function createAffiliateReferral(data: InsertAffiliateReferral) {
  const db = await getDb();
  if (!db) return;
  await db.insert(affiliateReferrals).values(data);
}

export async function getAffiliateReferrals(referrerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(affiliateReferrals).where(eq(affiliateReferrals.referrerId, referrerId)).orderBy(desc(affiliateReferrals.createdAt));
}

export async function convertAffiliateReferral(referredId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const referral = await db.select().from(affiliateReferrals)
    .where(and(eq(affiliateReferrals.referredId, referredId), eq(affiliateReferrals.status, "pending")))
    .limit(1);
  
  if (referral.length === 0) return null;
  
  await db.update(affiliateReferrals).set({
    status: "converted",
    convertedAt: new Date()
  }).where(eq(affiliateReferrals.id, referral[0].id));
  
  return referral[0];
}

export async function getAffiliateLeaderboard(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: users.id,
    name: users.name,
    affiliateCode: users.affiliateCode,
    affiliateEarnings: users.affiliateEarnings,
  }).from(users)
    .where(sql`${users.affiliateCode} IS NOT NULL`)
    .orderBy(desc(users.affiliateEarnings))
    .limit(limit);
}

// ============================================================================
// TRANSACTIONS HELPERS
// ============================================================================
export async function createTransaction(data: InsertTransaction) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(transactions).values(data);
  return result[0].insertId;
}

export async function getUserTransactions(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(transactions).where(eq(transactions.userId, userId)).orderBy(desc(transactions.createdAt)).limit(limit);
}

// ============================================================================
// GIFT CODES HELPERS
// ============================================================================
export async function createGiftCode(data: Omit<InsertGiftCode, 'code'>) {
  const db = await getDb();
  if (!db) return null;
  const code = nanoid(12).toUpperCase();
  await db.insert(giftCodes).values({ ...data, code });
  return code;
}

export async function getGiftCodeByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(giftCodes).where(eq(giftCodes.code, code)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function redeemGiftCode(code: string, userId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const giftCode = await getGiftCodeByCode(code);
  if (!giftCode || giftCode.status !== "available") return false;
  
  await db.update(giftCodes).set({
    status: "redeemed",
    redeemedById: userId,
    redeemedAt: new Date()
  }).where(eq(giftCodes.code, code));
  
  return true;
}

export async function getUserGiftCodes(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(giftCodes).where(eq(giftCodes.purchaserId, userId)).orderBy(desc(giftCodes.purchasedAt));
}

// ============================================================================
// FOUNDATION DONATIONS HELPERS
// ============================================================================
export async function createFoundationDonation(data: InsertFoundationDonation) {
  const db = await getDb();
  if (!db) return;
  await db.insert(foundationDonations).values(data);
}

export async function getTotalFoundationDonations() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({
    total: sql<number>`SUM(${foundationDonations.amount})`
  }).from(foundationDonations);
  return result[0]?.total || 0;
}

// ============================================================================
// ONBOARDING HELPERS
// ============================================================================
export async function getOnboardingStatus(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}


// ============================================================================
// LEMON SQUEEZY & NEXTDNS INTEGRATION
// ============================================================================
export async function getUserByLemonSqueezyCustomerId(customerId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.lemonSqueezyCustomerId, customerId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserNextDNSProfile(userId: number, profileId: string | null) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({
    nextdnsProfileId: profileId,
  }).where(eq(users.id, userId));
}

export async function createUserFromCheckout(data: {
  email: string;
  name: string;
  lemonSqueezyCustomerId: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const user: InsertUser = {
    openId: `lsq_${data.lemonSqueezyCustomerId}`,
    email: data.email,
    name: data.name,
    loginMethod: "lemon_squeezy",
    affiliateCode: nanoid(8).toUpperCase(),
    lemonSqueezyCustomerId: data.lemonSqueezyCustomerId,
    subscriptionStatus: "active",
    subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  };
  
  const result = await db.insert(users).values(user);
  const userId = result[0].insertId as number;
  
  const createdUser = await getUserById(userId);
  if (!createdUser) throw new Error("Failed to create user");
  
  return createdUser;
}
