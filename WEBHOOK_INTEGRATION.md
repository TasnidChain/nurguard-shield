# Lemon Squeezy Webhook Integration Guide

## Overview

NurGuard automatically creates NextDNS profiles for users when they complete a purchase through Lemon Squeezy. This document explains the webhook setup and integration flow.

---

## Setup Instructions

### 1. Get Your Webhook Secret

1. Log in to Lemon Squeezy dashboard
2. Navigate to **Settings → Webhooks**
3. Create a new webhook endpoint:
   - **URL**: `https://your-nurguard-domain.com/api/webhooks/lemon-squeezy`
   - **Events**: Select `order.completed` and `order.refunded`
4. Copy the **Webhook Secret** (appears after creation)

### 2. Configure Environment Variable

Add the webhook secret to your `.env` file:

```bash
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret_here
```

This is automatically injected into the environment by Manus.

### 3. Verify Webhook Endpoint

The webhook endpoint is available at:

```
POST /api/webhooks/lemon-squeezy
```

---

## Webhook Flow

### Order Completion Flow

```
1. User completes payment on Lemon Squeezy checkout
   ↓
2. Lemon Squeezy sends order.completed webhook
   ↓
3. NurGuard verifies webhook signature
   ↓
4. NurGuard creates NextDNS profile for user
   ↓
5. NurGuard stores profileId in database
   ↓
6. User receives setup instructions
   ↓
7. User configures DNS on their device
   ↓
8. Protection is active
```

### Refund Flow

```
1. User requests refund or subscription is cancelled
   ↓
2. Lemon Squeezy sends order.refunded webhook
   ↓
3. NurGuard verifies webhook signature
   ↓
4. NurGuard deletes NextDNS profile
   ↓
5. NurGuard clears profileId from database
   ↓
6. User's DNS protection is removed
```

---

## Webhook Payload Examples

### order.completed

```json
{
  "meta": {
    "event_name": "order.completed",
    "custom_data": null
  },
  "data": {
    "type": "orders",
    "id": "123456",
    "attributes": {
      "order_number": "ORD-001",
      "customer_id": "cust_abc123",
      "user_email": "user@example.com",
      "user_name": "John Doe",
      "status": "completed",
      "total": "7.77",
      "currency": "USD",
      "created_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

### order.refunded

```json
{
  "meta": {
    "event_name": "order.refunded"
  },
  "data": {
    "type": "orders",
    "id": "123456",
    "attributes": {
      "customer_id": "cust_abc123",
      "status": "refunded"
    }
  }
}
```

---

## Webhook Signature Verification

All webhooks are signed with HMAC-SHA256. Verification process:

1. Extract `X-Signature` header from webhook request
2. Create HMAC-SHA256 hash of raw request body using webhook secret
3. Compare computed hash with `X-Signature` header
4. Only process webhook if signatures match

Example:

```typescript
const signature = req.headers["x-signature"];
const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
const hash = crypto
  .createHmac("sha256", secret)
  .update(JSON.stringify(req.body))
  .digest("hex");

if (hash !== signature) {
  return res.status(401).json({ error: "Invalid signature" });
}
```

---

## Error Handling

### Missing Customer ID

If webhook doesn't include `customer_id`, webhook is rejected:

```
Response: 400 Bad Request
{
  "error": "Missing customer_id"
}
```

### User Not Found

If user doesn't exist in database:

- If email is provided: Create new user from checkout data
- If email is missing: Reject webhook

```
Response: 400 Bad Request
{
  "error": "Missing user email"
}
```

### NextDNS Profile Creation Fails

If NextDNS API fails:

- Webhook still returns 200 (to prevent retries)
- Error is logged
- User can manually trigger profile creation from dashboard

```
Response: 200 OK
{
  "success": false,
  "error": "Failed to create NextDNS profile",
  "userId": 123
}
```

---

## Testing Webhooks Locally

### 1. Use Webhook Testing Tool

Use [webhook.site](https://webhook.site) to capture and inspect webhooks:

1. Generate a unique URL
2. Add to Lemon Squeezy webhook settings
3. Complete a test purchase
4. Inspect payload in webhook.site dashboard

### 2. Manual Testing

Use curl to simulate webhook:

```bash
curl -X POST http://localhost:3000/api/webhooks/lemon-squeezy \
  -H "Content-Type: application/json" \
  -H "X-Signature: your_computed_signature" \
  -d '{
    "meta": {
      "event_name": "order.completed"
    },
    "data": {
      "type": "orders",
      "id": "123",
      "attributes": {
        "customer_id": "cust_123",
        "user_email": "test@example.com",
        "user_name": "Test User",
        "total": "7.77"
      }
    }
  }'
```

### 3. Run Tests

```bash
pnpm test server/webhooks/lemonSqueezy.test.ts
```

---

## Monitoring & Debugging

### Check Webhook Logs

Webhook events are logged with timestamps:

```
✅ NextDNS profile created for user 42: abc123def456
```

### View User's NextDNS Profile

Query database:

```sql
SELECT id, email, nextdnsProfileId, subscriptionStatus 
FROM users 
WHERE id = 42;
```

### Test NextDNS Profile

Once profile is created, verify it works:

```bash
# Test DNS resolution through NextDNS profile
nslookup example.com 383b61.dns.nextdns.io
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Webhook not received | URL misconfigured | Verify webhook URL in Lemon Squeezy settings |
| "Invalid signature" error | Wrong secret | Ensure `LEMON_SQUEEZY_WEBHOOK_SECRET` matches Lemon Squeezy |
| NextDNS profile not created | API key invalid | Verify `NEXTDNS_API_KEY` is correct |
| User not found | Email missing from checkout | Require email in Lemon Squeezy checkout form |
| DNS not working | Profile created but not configured | Send user to `/setup-dns` page with instructions |

---

## Next Steps

1. **Configure Lemon Squeezy webhook** - Add webhook URL and secret to Lemon Squeezy dashboard
2. **Test with real payment** - Complete a test purchase to verify flow
3. **Monitor logs** - Watch for any errors during webhook processing
4. **User communication** - Send setup instructions after payment
5. **Analytics** - Track webhook success rate and profile creation metrics

---

## API Reference

### Webhook Endpoint

```
POST /api/webhooks/lemon-squeezy
```

**Headers:**
- `Content-Type: application/json`
- `X-Signature: <hmac-sha256-signature>`

**Response Codes:**
- `200 OK` - Webhook processed successfully
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Invalid signature
- `500 Internal Server Error` - Server error

---

## Support

For issues or questions:

1. Check logs: `pnpm logs`
2. Run tests: `pnpm test server/webhooks/`
3. Contact support: support@nurguard.app
