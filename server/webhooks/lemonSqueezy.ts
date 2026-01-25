/**
 * Lemon Squeezy Webhook Handler
 * Handles order completion events and auto-creates NextDNS profiles
 */

import { Request, Response } from "express";
import * as crypto from "crypto";
import * as db from "../db";
import { createNextDNSProfile } from "../nextdns";
import { ENV } from "../_core/env";

interface LemonSqueezyWebhookPayload {
  meta: {
    event_name: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: {
    type: string;
    id: string;
    attributes: {
      order_number?: string;
      customer_id?: string;
      user_email?: string;
      user_name?: string;
      status?: string;
      total?: string;
      currency?: string;
      created_at?: string;
    };
  };
}

/**
 * Verify Lemon Squeezy webhook signature
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return hash === signature;
}

/**
 * Handle Lemon Squeezy order.completed webhook
 */
export async function handleLemonSqueezyWebhook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Verify webhook signature
    const signature = req.headers["x-signature"] as string;
    const secret = ENV.lemonSqueezyWebhookSecret;

    if (!signature || !secret) {
      console.error("Missing webhook signature or secret");
      res.status(400).json({ error: "Missing signature" });
      return;
    }

    const rawBody = JSON.stringify(req.body);
    if (!verifyWebhookSignature(rawBody, signature, secret)) {
      console.error("Invalid webhook signature");
      res.status(401).json({ error: "Invalid signature" });
      return;
    }

    const payload = req.body as LemonSqueezyWebhookPayload;

    // Only handle order.completed events
    if (payload.meta.event_name !== "order.completed") {
      res.status(200).json({ success: true, skipped: true });
      return;
    }

    const order = payload.data;
    const customerId = order.attributes.customer_id;
    const userEmail = order.attributes.user_email;
    const userName = order.attributes.user_name;

    if (!customerId) {
      console.error("Missing customer_id in webhook payload");
      res.status(400).json({ error: "Missing customer_id" });
      return;
    }

    // Find user by Lemon Squeezy customer ID
    let user = await db.getUserByLemonSqueezyCustomerId(customerId);

    if (!user) {
      // If user doesn't exist, create one (for guest checkouts)
      if (userEmail) {
        user = await db.createUserFromCheckout({
          email: userEmail,
          name: userName || "NurGuard User",
          lemonSqueezyCustomerId: customerId,
        });
      } else {
        console.error("Cannot create user: missing email");
        res.status(400).json({ error: "Missing user email" });
        return;
      }
    }

    // Update entitlements table for mobile app verification
    const entitlementId = `ent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1); // 1 year from now

    try {
      const dbInstance = await db.getDb();
      if (dbInstance) {
        const { entitlements } = await import("../../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        // Check if entitlement exists
        const existing = await dbInstance
          .select()
          .from(entitlements)
          .where(eq(entitlements.userId, user.id))
          .limit(1);

        if (existing.length > 0) {
          // Update existing entitlement
          await dbInstance
            .update(entitlements)
            .set({
              status: "active",
              plan: "nurguard_yearly",
              currentPeriodEnd: subscriptionEndDate,
              source: "lemon",
              updatedAt: new Date(),
            })
            .where(eq(entitlements.userId, user.id));
        } else {
          // Create new entitlement
          await dbInstance.insert(entitlements).values({
            id: entitlementId,
            userId: user.id,
            status: "active",
            plan: "nurguard_yearly",
            currentPeriodEnd: subscriptionEndDate,
            source: "lemon",
          });
        }
      }
    } catch (entitlementError) {
      console.warn("Failed to update entitlements:", entitlementError);
      // Don't fail the webhook, just log the warning
    }

    // Check if user already has a NextDNS profile
    if (user.nextdnsProfileId) {
      console.log(`User ${user.id} already has NextDNS profile`);
      res.status(200).json({ success: true, alreadyConfigured: true });
      return;
    }

    // Create NextDNS profile for user
    try {
      const { profileId, dnsEndpoint } = await createNextDNSProfile(
        String(user.id),
        userName || userEmail || "NurGuard User"
      );

      // Update user with NextDNS profile ID and subscription status
      await db.updateUserNextDNSProfile(user.id, profileId);
      
      // Update user subscription status
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
      const dbInstance = await db.getDb();
      if (dbInstance) {
        const { users } = await import("../../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        await dbInstance
          .update(users)
          .set({
            subscriptionStatus: "active",
            subscriptionEndsAt: subscriptionEndDate,
          })
          .where(eq(users.id, user.id));
      }

      // Log transaction
      await db.createTransaction({
        userId: user.id,
        type: "subscription",
        amount: order.attributes.total || "0.00",
        description: `Subscription activated - Order #${order.attributes.order_number}`,
      });

      console.log(
        `✅ NextDNS profile created for user ${user.id}: ${profileId}`
      );
      res.status(200).json({
        success: true,
        userId: user.id,
        profileId,
        dnsEndpoint,
      });
    } catch (error) {
      console.error("Failed to create NextDNS profile:", error);
      // Still mark webhook as processed to avoid retries
      res.status(200).json({
        success: false,
        error: "Failed to create NextDNS profile",
        userId: user.id,
      });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Handle Lemon Squeezy order.refunded webhook
 * Clean up NextDNS profile when subscription is refunded
 */
export async function handleLemonSqueezyRefund(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Verify webhook signature
    const signature = req.headers["x-signature"] as string;
    const secret = ENV.lemonSqueezyWebhookSecret;

    if (!signature || !secret) {
      res.status(400).json({ error: "Missing signature" });
      return;
    }

    const rawBody = JSON.stringify(req.body);
    if (!verifyWebhookSignature(rawBody, signature, secret)) {
      res.status(401).json({ error: "Invalid signature" });
      return;
    }

    const payload = req.body as LemonSqueezyWebhookPayload;

    // Only handle order.refunded events
    if (payload.meta.event_name !== "order.refunded") {
      res.status(200).json({ success: true, skipped: true });
      return;
    }

    const order = payload.data;
    const customerId = order.attributes.customer_id;

    if (!customerId) {
      res.status(400).json({ error: "Missing customer_id" });
      return;
    }

    // Find user by Lemon Squeezy customer ID
    const user = await db.getUserByLemonSqueezyCustomerId(customerId);

    if (!user || !user.nextdnsProfileId) {
      res.status(200).json({ success: true, noProfile: true });
      return;
    }

    // Delete NextDNS profile
    try {
      const { deleteNextDNSProfile } = await import("../nextdns");
      await deleteNextDNSProfile(user.nextdnsProfileId);

      // Clear NextDNS profile ID from user
      await db.updateUserNextDNSProfile(user.id, null);

      console.log(`✅ NextDNS profile deleted for user ${user.id}`);
      res.status(200).json({ success: true, userId: user.id });
    } catch (error) {
      console.error("Failed to delete NextDNS profile:", error);
      res.status(200).json({
        success: false,
        error: "Failed to delete NextDNS profile",
      });
    }
  } catch (error) {
    console.error("Refund webhook processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
