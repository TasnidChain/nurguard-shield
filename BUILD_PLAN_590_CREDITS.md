# NurGuard Shield - 590 Credits Build Plan
## Activation & Retention Upgrade (NOT Visual Polish)

---

## 📋 PHASE BREAKDOWN

### Phase 1: Database Schema Updates (50 credits)
**What:** Add onboarding state tracking to users table

New columns needed:
- `hasCompletedOnboarding` (boolean, default: false)
- `protectionIntent` (JSON: social_media, adult_content, gaming, news, custom)
- `streakDays` (integer, default: 0)
- `streakStartedAt` (timestamp)
- `complianceScore` (integer, default: 100)
- `lastViolationAt` (timestamp, nullable)
- `totalBlockedAttempts` (integer, default: 0)

**Why:** Foundation for all onboarding logic and compliance tracking

---

### Phase 2: Onboarding Flow Pages (150 credits)
**What:** Build 3 screens that FORCE on first login

**Screen 1: Intent Selection**
- Title: "What do you want protection from?"
- Multi-select options:
  - Social media distraction
  - Explicit / adult content
  - Gaming & time-wasters
  - News & doomscrolling
  - Custom (manual setup)
- CTA: "Activate Protection"
- Store selection in DB

**Screen 2: Auto-Apply Presets**
- Show checklist animation:
  - ✅ Rules created
  - ✅ Schedules applied
  - ✅ Protection active
- Based on intent, auto-create blocking rules:
  - Social media: YouTube, Instagram, TikTok, Reddit (9am-5pm weekdays)
  - Adult: All adult sites (24/7)
  - Gaming: Steam, Epic, common game sites (9am-5pm)
  - News: CNN, BBC, Twitter (optional 24/7)

**Screen 3: Streak Initialization**
- Set complianceScore = 100
- Set streakDays = 1
- Message: "Your protection is active. Your streak has begun."
- CTA: "Go to Dashboard"
- Set hasCompletedOnboarding = true

**Why:** Emotional lock-in. User feels protected immediately. Creates accountability.

---

### Phase 3: Dashboard Clarity Upgrade (120 credits)
**What:** Restructure dashboard for above-the-fold impact

**Protection Status Card (TOP)**
- Shield icon (green if active, red if broken)
- "Protection: ACTIVE" or "AT RISK" or "BROKEN"
- Compliance Score: XX/100 (visual progress bar)
- Streak: X days (big, bold number)

**Daily Summary Card**
- Time blocked today
- Number of attempts blocked
- Any violations (with timestamps)
- If clean: "Perfect compliance today. Keep going."
- If violated: "Streak broken. Restart today stronger."

**Why:** Users see consequences immediately. Makes NurGuard feel REAL, not soft.

---

### Phase 4: Compliance Score & Streak Logic (100 credits)
**What:** Implement strict scoring system

**Compliance Score Rules:**
- Starts at 100
- Minor violation (attempt to access blocked site) → -5
- Repeated violation (3+ attempts) → -10
- Manual disable of rule → -25
- Recovers +1 per clean day
- Never goes below 0

**Streak Reset Logic:**
- If any violation → streak resets to 0
- Show modal: "Your streak was broken. Restart today stronger."
- Include restart button
- Tone: Serious, not guilt-tripping

**Violation Tracking:**
- Log every blocked attempt
- Store timestamp, rule violated, user action
- Display in daily summary

**Why:** Makes accountability feel earned and consequential. Prevents users from feeling like they can "cheat."

---

### Phase 5: Referral System Unlock (80 credits)
**What:** Delay referral access until value is felt

**Unlock Conditions:**
- streakDays >= 3 OR
- totalBlockedAttempts >= 24

**Referral Unlock Modal**
- Title: "You're Protected. Now Help Someone Else."
- Body: "NurGuard rewards you for helping others protect their focus."
- Show: 30% monthly recurring, $2.33 per referral
- CTA: "Get My Referral Link"

**Referral Page Updates**
- Show personal referral code
- Show referral link: `https://nurguard.com/?ref=YOURCODE`
- Show monthly recurring earnings
- Copy: "Every person you protect earns you 30% monthly."
- Example: "10 referrals = $23.30/month"

**Why:** Referrals convert better after users feel value. Prevents spam feeling.

---

### Phase 6: Foundation Impact Card (40 credits)
**What:** Add trust-building card to dashboard

**Card Content:**
- "Your subscription supports Masajid Builder Foundation"
- Show: $1.55/month from this user
- Show: Total community impact counter (real-time)
- Simple, not preachy

**Why:** Increases retention + referrals. Users feel part of something bigger.

---

### Phase 7: API & Backend Logic (60 credits)
**What:** Create tRPC procedures for onboarding

**New Procedures:**
- `onboarding.completeIntent(intent[])` - Save intent, create blocking rules
- `onboarding.markComplete()` - Set hasCompletedOnboarding = true
- `compliance.recordViolation(ruleId)` - Log violation, update score & streak
- `compliance.getStatus()` - Return current score, streak, violations
- `referral.checkUnlocked()` - Check if user qualifies for referral access

**Why:** Separates UI logic from business logic. Makes testing easier.

---

### Phase 8: Mobile PWA Testing & Polish (20 credits)
**What:** Ensure everything works on mobile

- Test onboarding on iOS/Android
- Verify animations don't lag
- Check touch targets are large enough
- Ensure no horizontal scroll
- Test offline functionality

**Why:** Most users will access via mobile PWA. Must be flawless.

---

## 📊 CREDIT ALLOCATION

| Phase | Credits | Priority |
|-------|---------|----------|
| Phase 1: Database | 50 | 🔴 CRITICAL |
| Phase 2: Onboarding | 150 | 🔴 CRITICAL |
| Phase 3: Dashboard | 120 | 🔴 CRITICAL |
| Phase 4: Compliance Logic | 100 | 🔴 CRITICAL |
| Phase 5: Referral Unlock | 80 | 🟡 HIGH |
| Phase 6: Foundation Card | 40 | 🟡 HIGH |
| Phase 7: Backend Logic | 60 | 🔴 CRITICAL |
| Phase 8: Mobile Testing | 20 | 🟢 MEDIUM |
| **TOTAL** | **620** | |

**Note:** 590 credits available. Will need to cut Phase 8 (mobile testing) or reduce scope slightly.

---

## 🎯 SUCCESS METRICS

After this build, measure:

1. **Onboarding Completion Rate** - % of users who complete all 3 screens
2. **Streak Adoption** - % of users with streak >= 1
3. **Compliance Score Engagement** - % of users checking score daily
4. **Referral Unlock Rate** - % of users who reach 3-day streak
5. **Referral Conversion** - % of unlocked users who share link
6. **Churn Rate** - % of users who cancel after 7 days

**Target:** 80%+ onboarding completion, 40%+ referral unlock, <10% 7-day churn

---

## ⚠️ WHAT WE'RE NOT DOING

- ❌ Visual redesign (keep current emerald green theme)
- ❌ Animations (just functional transitions)
- ❌ New pages (only modify existing)
- ❌ Email notifications (Phase 2 feature)
- ❌ Affiliate payouts automation (manual for now)

---

## 🚀 EXECUTION ORDER

1. **Start with Phase 1** (database) - unblocks everything else
2. **Then Phase 2** (onboarding) - users need this immediately
3. **Then Phase 4** (compliance logic) - onboarding needs this
4. **Then Phase 3** (dashboard) - display the data
5. **Then Phase 7** (backend) - wire it all together
6. **Then Phase 5** (referral unlock) - unlock after value
7. **Then Phase 6** (foundation card) - trust building
8. **Finally Phase 8** (testing) - if credits remain

---

## 💡 KEY PRINCIPLES

- **Clarity over polish** - Users need to understand what's happening
- **Accountability over softness** - Streaks break, scores drop, it hurts
- **Value before referrals** - Don't push referrals until user feels protected
- **Mobile-first** - PWA is primary experience
- **Logic over UI** - Function matters more than looks

---

## READY TO BUILD?

Approve this plan and I'll execute phases in order, tracking credits spent at each step.

