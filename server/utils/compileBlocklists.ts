import fs from "fs";
import path from "path";
import { getDb } from "../db";
import { rulesets, rulesetItems } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Compile domain blocklists into rulesets
 * Run this after updating lists/porn.txt or lists/gambling.txt
 */
export async function compileBlocklists() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  const listsDir = path.join(process.cwd(), "lists");

  // Read blocklists
  const pornList = fs
    .readFileSync(path.join(listsDir, "porn.txt"), "utf-8")
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"));

  const gamblingList = fs
    .readFileSync(path.join(listsDir, "gambling.txt"), "utf-8")
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"));

  console.log(`Loaded ${pornList.length} porn domains and ${gamblingList.length} gambling domains`);

  // Create or update rulesets for Android
  const androidRulesetId = `ruleset_android_${Date.now()}`;
  const androidVersion = Math.floor(Date.now() / 1000);

  // Deactivate old Android rulesets
  const oldAndroidRulesets = await db
    .select()
    .from(rulesets)
    .where(eq(rulesets.platform, "android"));

  for (const ruleset of oldAndroidRulesets) {
    await db
      .update(rulesets)
      .set({ isActive: false })
      .where(eq(rulesets.id, ruleset.id));
  }

  // Create new Android ruleset
  await db.insert(rulesets).values({
    id: androidRulesetId,
    platform: "android",
    version: androidVersion,
    isActive: true,
    notes: `Android blocklist v${androidVersion} - porn + gambling`,
  });

  // Add porn domains to ruleset
  const pornItems = pornList.map((domain) => ({
    id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    rulesetId: androidRulesetId,
    type: "domain" as const,
    action: "block" as const,
    key: domain.trim(),
    metaJson: { category: "porn", source: "nurguard" },
  }));

  // Add gambling domains to ruleset
  const gamblingItems = gamblingList.map((domain) => ({
    id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    rulesetId: androidRulesetId,
    type: "domain" as const,
    action: "block" as const,
    key: domain.trim(),
    metaJson: { category: "gambling", source: "nurguard" },
  }));

  // Insert in batches to avoid query size limits
  const batchSize = 100;
  const allItems = [...pornItems, ...gamblingItems];

  for (let i = 0; i < allItems.length; i += batchSize) {
    const batch = allItems.slice(i, i + batchSize);
    await db.insert(rulesetItems).values(batch);
    console.log(`Inserted ${Math.min(batchSize, allItems.length - i)} items`);
  }

  // Create iOS ruleset (same domains, different platform)
  const iosRulesetId = `ruleset_ios_${Date.now()}`;
  const iosVersion = androidVersion;

  // Deactivate old iOS rulesets
  const oldIosRulesets = await db
    .select()
    .from(rulesets)
    .where(eq(rulesets.platform, "ios"));

  for (const ruleset of oldIosRulesets) {
    await db
      .update(rulesets)
      .set({ isActive: false })
      .where(eq(rulesets.id, ruleset.id));
  }

  // Create new iOS ruleset
  await db.insert(rulesets).values({
    id: iosRulesetId,
    platform: "ios",
    version: iosVersion,
    isActive: true,
    notes: `iOS blocklist v${iosVersion} - porn + gambling`,
  });

  // Add same items to iOS ruleset
  const iosItems = allItems.map((item) => ({
    ...item,
    id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    rulesetId: iosRulesetId,
  }));

  for (let i = 0; i < iosItems.length; i += batchSize) {
    const batch = iosItems.slice(i, i + batchSize);
    await db.insert(rulesetItems).values(batch);
  }

  console.log(
    `✅ Compiled blocklists: Android v${androidVersion}, iOS v${iosVersion}`
  );
  console.log(`Total domains: ${allItems.length}`);
}

// Run if called directly
if (require.main === module) {
  compileBlocklists()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
