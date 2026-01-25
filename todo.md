# NurGuard Shield - Project TODO

## Activation & Retention Upgrade (Complete)
- [x] Database schema updates for onboarding state
- [x] 3-screen onboarding flow
- [x] Compliance score and streak logic
- [x] Dashboard protection status card
- [x] Backend tRPC procedures for onboarding
- [x] Referral unlock system (3-day streak)
- [x] Foundation impact card
- [x] Mobile PWA testing

## Core Infrastructure
- [x] Database schema with all required tables
- [x] User authentication with protected/public routes
- [x] Mobile-first emerald green UI theme

## Subscription System
- [x] Lemon Squeezy integration ($7.77/month)
- [x] Webhook handling for payment events
- [x] Subscription gating for premium features

## Content Blocking
- [x] Website blocking rules CRUD
- [x] App blocking rules CRUD
- [x] Keyword filtering system
- [x] Daily time limits configuration

## Analytics & Tracking
- [x] Usage analytics dashboard
- [x] Compliance scoring system
- [x] Streak tracking

## Affiliate Program
- [x] 30% commission tracking
- [x] Referral code generation
- [x] Affiliate balance management
- [x] Leaderboard

## Foundation Donation
- [x] 20% allocation to Masajid Builder Foundation
- [x] Transaction logging

## Gift Subscriptions
- [x] Gift code generation
- [x] Gift redemption system

## PWA Configuration
- [x] Service worker for offline support
- [x] App manifest with icons
- [x] Install prompt handling

## Pages
- [x] Landing page (public)
- [x] Dashboard (protected)
- [x] Blocking configuration (protected)
- [x] Affiliate portal (protected)
- [x] Settings (protected)
- [x] Subscribe/checkout page

## Free Gift Code System (Complete)
- [x] Create gift code redemption endpoint for free access
- [x] Add admin endpoint to generate free codes
- [x] Test gift code flow

## Gift Code UX Testing (Complete)
- [x] Create gift code entry page
- [x] Add gift code input to Subscribe page
- [x] Test redemption flow end-to-end
- [x] Verify smooth UX and error handling

## Landing Page Upgrade (Complete)
- [x] Improve hero section with better copy
- [x] Add features showcase with icons and descriptions
- [x] Add pricing clarity and trust signals
- [x] Improve CTAs and conversion optimization


## Multi-Page Funnel (298 Credits)
- [x] Affiliate page - "Earn by protecting others" (30% commissions)
- [x] Overflow Economy page - Pricing phases, masajid funding, affiliate expansion
- [x] Shield to Civilization page - Vision, 5-phase roadmap, long-term mission
- [x] Update routing and navigation

## Phase 1 MVP Dashboard & Setup
- [x] Device Setup page with iOS/Android/Desktop instructions
- [x] Profile Selection page (Halal Mode, Kids Mode, Focus Mode)
- [x] Dashboard with device status (Active/Not Active) and blocked categories
- [x] Masajid Builder mission layer in dashboard
- [x] Update Home page with Phase 1 microcopy and CTAs
- [x] Add legal disclaimers and FAQ page
- [x] Integrate payment unlock flow to setup pages
- [ ] Affiliate dashboard with streak-based unlocks

## NextDNS Integration (Phase 1 MVP)
- [x] NextDNS API wrapper (create/update/delete profiles)
- [x] Per-user profile creation on subscription
- [x] Device configuration endpoints (iOS/Android/Windows/Mac/Linux)
- [x] Lemon Squeezy webhook for auto-profile creation
- [ ] Dashboard with real-time blocking analytics
- [ ] Subscription lifecycle automation (profile cleanup on cancel)
- [ ] White-label branding layer (hide NextDNS, show NurGuard)
- [ ] Deployment scripts and beta testing docs


## Critical Affiliate & Gift Code Fixes (200 Credits)
- [x] Fix affiliate unlock messaging (remove 3-day confusion)
- [x] Add referral tracking to affiliate dashboard
- [x] Create affiliate FAQ page (/faq)
- [x] Create gift code admin panel (/admin/gift-codes)
- [x] Add payout request form


## Email Notifications & NextDNS Integration
- [x] Create email notification system (setup instructions, payout confirmations)
- [x] Add NextDNS account connection UI
- [ ] Integrate email into payment flow
- [ ] Integrate email into payout flow


## $33/Year Launch Prep
- [x] Update pricing to $33/year across all pages (Home, Subscribe, checkout, FAQ)
- [x] Remove monthly billing option from Subscribe page
- [x] Remove gift code system entirely (admin panel, redemption, database)
- [x] Simplify affiliate dashboard to single screen (earnings counter, referral link, payout status)
- [x] Update affiliate copy (30% recurring, no cap, simple earnings)
- [x] Remove multi-tier affiliate logic, keep flat 30% only
- [ ] Create demo video (16:9 and 9:16 versions) - user will provide
- [ ] Test all pages with new pricing and copy
- [ ] Final checkpoint and launch prep


## MAJOR REWRITE - COMPLETE (Jan 25, 2026)

### Pages Rebuilt (All 9 Required)
- [x] Home (/) - Landing with hero, features, pricing, affiliate, trust
- [x] How It Works (/how-it-works) - DNS explanation, 4-step process
- [x] Pricing (/pricing) - $33/year annual-only with features
- [x] Setup (/setup) - Platform-specific DNS instructions (iOS/Android/Windows/Mac)
- [x] Earn (/earn) - Affiliate 30% recurring commission math
- [x] Support (/support) - Comprehensive FAQ + contact
- [x] Privacy (/privacy) - Data practices updated
- [x] Terms (/terms) - Legal with $33/year subscription
- [x] Contact (/contact) - Contact form + quick answers
- [x] App (/app) - Dashboard for logged-in users

### Cleanup & Fixes
- [x] Deleted 14 old pages (AffiliatePublic, Blocking, CheckoutSuccess, ComponentShowcase, DashboardV2, DeviceSetup, Download, NextDNSConnect, Onboarding, OverflowEconomy, ProfileSelect, SetupDNS, VisionPage, NotFound)
- [x] Updated App.tsx routing to clean 9-page structure
- [x] Fixed TypeScript errors (removed Onboarding logic)
- [x] Applied dark theme with emerald accents consistently
- [x] Added Navigation and Footer to all pages
- [x] Verified $33/year pricing everywhere
- [x] No old pricing ($7.77/month) remains
- [x] Dev server running, no build errors

### Still TODO Before Launch
- [ ] Integrate Lemon Squeezy checkout API (payment processing)
- [ ] Test payment flow end-to-end
- [ ] Configure NextDNS account (dns.nurguard.app CNAME)
- [ ] Set up email service for confirmations/receipts
- [ ] Bind custom domain (NurGuard.com)
- [ ] Final QA testing on all pages
- [ ] Create demo video (user will provide)
- [ ] Save checkpoint and prepare for launch

## New Features (Jan 25, 2026 - Post-Rewrite)

- [x] Add affiliate marketing CTA to pricing page (30% recurring commission, $11k per 1000 signups)
- [x] Add app-level time limits feature (like ScreenZen) to Android app
- [x] Add notification blocking during time limits
- [ ] Test time limit enforcement on Android

## Lemon Squeezy Integration (Jan 25, 2026)

- [x] Wire variant ID 1224484 and product ID 776876 into checkout button
- [x] Test checkout flow end-to-end
- [ ] Verify webhook receives subscription events (requires real purchase)
