import { Express } from "express";
import { getDb } from "./db";
import { users, entitlements } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { ulid } from "ulid";

export function registerWebhooks(app: Express) {
  // Lemon Squeezy webhook handler
  app.post("/api/webhooks/lemon-squeezy", async (req, res) => {
    try {
      const signature = req.headers["x-signature"] as string;
      const body = JSON.stringify(req.body);
      const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";

      // Verify webhook signature
      const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");

      if (hash !== signature) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      const data = req.body;
      const event = data.meta?.event_name;
      const order = data.data?.attributes;

      if (event === "order_created" && order?.status === "paid") {
        const email = order.user_email;
        const db = await getDb();

        if (db && email) {
          // Create subscription that expires in 1 year
          const endsAt = new Date();
          endsAt.setFullYear(endsAt.getFullYear() + 1);

          // Insert or update user
          const result = await db.insert(users).values({
            openId: email,
            email,
            name: order.user_name || "User",
            subscriptionStatus: "active",
            subscriptionId: data.data?.id?.toString(),
            lemonSqueezyCustomerId: order.customer_id?.toString(),
            subscriptionEndsAt: endsAt,
          }).onDuplicateKeyUpdate({
            set: {
              subscriptionStatus: "active",
              subscriptionId: data.data?.id?.toString(),
              lemonSqueezyCustomerId: order.customer_id?.toString(),
              subscriptionEndsAt: endsAt,
            },
          });

          // Get user ID (either from insert or from existing user)
          let userId: number | undefined;
          if ('insertId' in result && typeof result.insertId === 'number') {
            userId = result.insertId;
          } else {
            const existingUser = await db.select({ id: users.id }).from(users).where(eq(users.openId, email)).limit(1);
            userId = existingUser[0]?.id;
          }

          if (userId) {
            // Create or update entitlement
            await db.insert(entitlements).values({
              id: ulid(),
              userId,
              status: "active",
              plan: "nurguard_yearly",
              currentPeriodEnd: endsAt,
              source: "lemon",
            }).onDuplicateKeyUpdate({
              set: {
                status: "active",
                currentPeriodEnd: endsAt,
              },
            });
          }
        }
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });
}
