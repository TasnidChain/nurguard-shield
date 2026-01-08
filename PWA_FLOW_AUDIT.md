# NurGuard Shield PWA - Flow Audit & Issues List

## Current Flow (WRONG)
```
User visits → Home page → Click "Sign In" → OAuth login → Dashboard (free user)
                       → Click "Subscribe" → Checkout → Lemon Squeezy → Back to app (still free)
```

## Required Flow (CORRECT)
```
User visits → Home page → Click "Start Protection" → Checkout (NO LOGIN YET)
                       → Lemon Squeezy payment → Webhook fires → User auto-created & activated
                       → Redirect to Dashboard (logged in + subscribed)
```

---

## 🔴 CRITICAL ISSUES

### 1. **Authentication Happens BEFORE Payment** ❌
- **Problem**: Users must sign in with OAuth before accessing Subscribe page
- **Current**: Home → Sign In → Dashboard → Subscribe
- **Should be**: Home → Subscribe → Payment → Auto-login
- **Impact**: Users see login wall before they know what they're paying for

### 2. **No Payment Gating** ❌
- **Problem**: Free users can access Dashboard, Blocking, Affiliate, Settings pages
- **Current**: All routes are publicly accessible or only require login
- **Should be**: Only Home and Subscribe are public. Everything else requires active subscription
- **Impact**: Users can use premium features without paying

### 3. **Webhook Not Creating Users** ❌
- **Problem**: When Lemon Squeezy webhook fires, there's no user to activate
- **Current**: User must exist in DB before webhook can activate them
- **Should be**: Webhook creates user + activates subscription in one step
- **Impact**: Payment succeeds but user can't access app

### 4. **No Subscription Status Check on Protected Routes** ❌
- **Problem**: Dashboard, Blocking, Affiliate, Settings don't check if user has active subscription
- **Current**: `useAuth()` only checks if user is logged in
- **Should be**: Protected routes check `subscription.isActive`
- **Impact**: Free users can access paid features

### 5. **Subscribe Page Requires Login** ❌
- **Problem**: Subscribe page uses `protectedProcedure` which requires authentication
- **Current**: User must be logged in to call `getCheckoutUrl`
- **Should be**: Checkout is public, no login needed
- **Impact**: Users can't proceed to payment without creating account first

### 6. **No Email Verification After Payment** ❌
- **Problem**: Webhook receives email from Lemon Squeezy but doesn't verify it
- **Current**: Email stored as-is from payment
- **Should be**: Email validation + confirmation email sent
- **Impact**: Invalid emails could be stored

### 7. **Dashboard Shows No Subscription Status** ❌
- **Problem**: Dashboard doesn't display "Active" or "Expires on X date"
- **Current**: Just shows usage stats
- **Should be**: Show subscription status, renewal date, cancel option
- **Impact**: Users don't know when subscription renews

### 8. **No Redirect After Payment** ❌
- **Problem**: Lemon Squeezy checkout doesn't know where to redirect after payment
- **Current**: No redirect URL set in checkout
- **Should be**: Redirect to `/dashboard` or `/onboarding` after successful payment
- **Impact**: Users don't know what to do after paying

### 9. **Affiliate Code Not Validated on Checkout** ❌
- **Problem**: Affiliate code passed to checkout but not validated before payment
- **Current**: Affiliate code optional, no validation
- **Should be**: Validate affiliate code exists before allowing checkout
- **Impact**: Invalid affiliate codes could be used

### 10. **No Onboarding Flow** ❌
- **Problem**: After payment, user lands on Dashboard with no setup
- **Current**: Dashboard shows empty analytics
- **Should be**: Onboarding page to set up first blocking rule, explain features
- **Impact**: Users confused about what to do next

---

## 🟡 MEDIUM PRIORITY ISSUES

### 11. **Gift Code Redemption Requires Login** ⚠️
- **Problem**: Gift codes can only be redeemed after login
- **Should be**: Gift codes work for non-logged-in users too

### 12. **No Trial Period** ⚠️
- **Problem**: All users must pay immediately
- **Should be**: Consider 7-day free trial to reduce friction

### 13. **Settings Page Accessible Without Subscription** ⚠️
- **Problem**: Free users can access Settings
- **Should be**: Settings should show "Upgrade to Shield" instead

### 14. **No Cancellation Flow** ⚠️
- **Problem**: No way for users to cancel subscription
- **Should be**: Settings page has "Cancel Subscription" button that links to Lemon Squeezy

### 15. **Affiliate Leaderboard Shows All Users** ⚠️
- **Problem**: Leaderboard displays user names publicly
- **Should be**: Anonymous or opt-in leaderboard

---

## 🟢 QUICK FIXES (High Impact)

1. **Make Subscribe page public** - Remove `protectedProcedure` requirement
2. **Add subscription check to protected routes** - Redirect to Subscribe if not active
3. **Update webhook to create users** - Lemon Squeezy webhook creates + activates user
4. **Add redirect URL to checkout** - After payment, redirect to `/dashboard`
5. **Add subscription status to Dashboard** - Show "Active until X" or "Upgrade"

---

## Implementation Priority

**MUST FIX (Blocking Launch):**
- [ ] Make Subscribe page public (no login required)
- [ ] Add subscription gating to Dashboard, Blocking, Affiliate, Settings
- [ ] Fix webhook to create users
- [ ] Add redirect after payment

**SHOULD FIX (Before Beta):**
- [ ] Add subscription status display
- [ ] Add onboarding flow
- [ ] Add cancellation option

**NICE TO HAVE (Post-Launch):**
- [ ] Trial period
- [ ] Anonymous leaderboard
- [ ] Email verification

