import { Express } from "express";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import crypto from "crypto";

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

      if (event === "order.created" && order?.status === "paid") {
        const email = order.customer_email;
        const db = await getDb();

        if (db && email) {
          // Create subscription that expires in 30 days
          const endsAt = new Date();
          endsAt.setMonth(endsAt.getMonth() + 1);

          // Insert or update user
          await db.insert(users).values({
            openId: email,
            email,
            name: order.customer_name || "User",
            subscriptionStatus: "active",
            subscriptionId: data.data?.id?.toString(),
            subscriptionEndsAt: endsAt,
          }).onDuplicateKeyUpdate({
            set: {
              subscriptionStatus: "active",
              subscriptionId: data.data?.id?.toString(),
              subscriptionEndsAt: endsAt,
            },
          });
        }
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });
}
