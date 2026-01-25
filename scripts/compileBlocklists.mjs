import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

async function compileBlocklists() {
  // Connect to database
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] || "localhost",
    user: process.env.DATABASE_URL?.split("://")[1]?.split(":")[0] || "root",
    password: process.env.DATABASE_URL?.split(":")[2]?.split("@")[0] || "",
    database: process.env.DATABASE_URL?.split("/").pop() || "nurguard",
  });

  try {
    const listsDir = path.join(rootDir, "lists");

    // Read blocklists
    const pornList = fs
      .readFileSync(path.join(listsDir, "porn.txt"), "utf-8")
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"));

    const gamblingList = fs
      .readFileSync(path.join(listsDir, "gambling.txt"), "utf-8")
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"));

    console.log(
      `Loaded ${pornList.length} porn domains and ${gamblingList.length} gambling domains`
    );

    // Create Android ruleset
    const androidRulesetId = `ruleset_android_${Date.now()}`;
    const androidVersion = Math.floor(Date.now() / 1000);

    // Deactivate old Android rulesets
    await connection.execute(
      "UPDATE rulesets SET isActive = 0 WHERE platform = ?",
      ["android"]
    );

    // Create new Android ruleset
    await connection.execute(
      "INSERT INTO rulesets (id, platform, version, isActive, notes, createdAt) VALUES (?, ?, ?, ?, ?, NOW())",
      [androidRulesetId, "android", androidVersion, 1, `Android blocklist v${androidVersion}`]
    );

    // Add domains to ruleset
    const allDomains = [...pornList, ...gamblingList];
    let itemCount = 0;

    for (const domain of allDomains) {
      const itemId = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const category = pornList.includes(domain) ? "porn" : "gambling";
      const metaJson = JSON.stringify({ category, source: "nurguard" });

      await connection.execute(
        "INSERT INTO ruleset_items (id, rulesetId, type, action, key, metaJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())",
        [itemId, androidRulesetId, "domain", "block", domain.trim(), metaJson]
      );

      itemCount++;
      if (itemCount % 100 === 0) {
        console.log(`Inserted ${itemCount} items...`);
      }
    }

    // Create iOS ruleset
    const iosRulesetId = `ruleset_ios_${Date.now()}`;

    // Deactivate old iOS rulesets
    await connection.execute(
      "UPDATE rulesets SET isActive = 0 WHERE platform = ?",
      ["ios"]
    );

    // Create new iOS ruleset
    await connection.execute(
      "INSERT INTO rulesets (id, platform, version, isActive, notes, createdAt) VALUES (?, ?, ?, ?, ?, NOW())",
      [iosRulesetId, "ios", androidVersion, 1, `iOS blocklist v${androidVersion}`]
    );

    // Add same domains to iOS
    itemCount = 0;
    for (const domain of allDomains) {
      const itemId = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const category = pornList.includes(domain) ? "porn" : "gambling";
      const metaJson = JSON.stringify({ category, source: "nurguard" });

      await connection.execute(
        "INSERT INTO ruleset_items (id, rulesetId, type, action, key, metaJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())",
        [itemId, iosRulesetId, "domain", "block", domain.trim(), metaJson]
      );

      itemCount++;
      if (itemCount % 100 === 0) {
        console.log(`Inserted ${itemCount} iOS items...`);
      }
    }

    console.log(
      `✅ Compiled blocklists: Android v${androidVersion}, iOS v${androidVersion}`
    );
    console.log(`Total domains per platform: ${allDomains.length}`);
  } finally {
    await connection.end();
  }
}

compileBlocklists()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
