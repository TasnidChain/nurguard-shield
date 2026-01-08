# NurGuard Shield - Environment Variables Setup Guide

## All Required Environment Variables

### 1. **OAuth / Authentication**
| Variable | Where to Get | What It Does |
|----------|-------------|------------|
| `VITE_APP_ID` | Manus Dashboard → Settings → OAuth | Your app's OAuth application ID |
| `VITE_OAUTH_PORTAL_URL` | Manus Dashboard → Settings → OAuth | Login portal URL (usually `https://portal.manus.im`) |
| `OAUTH_SERVER_URL` | Manus Dashboard → Settings → OAuth | OAuth server base URL |
| `JWT_SECRET` | Generate random string (32+ chars) | Session cookie signing secret |

**How to get Manus OAuth credentials:**
1. Go to Manus Dashboard
2. Settings → OAuth
3. Copy `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`
4. Generate `JWT_SECRET`: `openssl rand -base64 32`

---

### 2. **Database**
| Variable | Where to Get | What It Does |
|----------|-------------|------------|
| `DATABASE_URL` | Manus Dashboard → Database | MySQL connection string |

**How to get Database URL:**
1. Go to Manus Dashboard
2. Database panel
3. Copy the full connection string
4. Format: `mysql://user:password@host:port/database`

---

### 3. **Lemon Squeezy (Payments)**
| Variable | Where to Get | What It Does |
|----------|-------------|------------|
| `LEMON_SQUEEZY_CHECKOUT_URL` | lemonsqueezy.com → Your Store → Product | Direct checkout link |
| `LEMON_SQUEEZY_API_KEY` | lemonsqueezy.com → Settings → API Tokens | API authentication |
| `LEMON_SQUEEZY_WEBHOOK_SECRET` | lemonsqueezy.com → Settings → Webhooks | Webhook signing secret |

**How to get Lemon Squeezy credentials:**
1. Go to [lemonsqueezy.com](https://lemonsqueezy.com)
2. Create account or log in
3. Create a product: $7.77/month
4. Get checkout URL from product settings
5. Settings → API Tokens → Create token → Copy
6. Settings → Webhooks → Create webhook:
   - URL: `https://your-domain.com/api/webhooks/lemon-squeezy`
   - Events: `order.created`, `order.refunded`
   - Copy the signing secret

---

### 4. **Manus Built-in APIs (LLM, Storage, Notifications)**
| Variable | Where to Get | What It Does |
|----------|-------------|------------|
| `BUILT_IN_FORGE_API_URL` | Manus Dashboard → Settings → API | Manus API endpoint |
| `BUILT_IN_FORGE_API_KEY` | Manus Dashboard → Settings → API | Server-side API key |
| `VITE_FRONTEND_FORGE_API_URL` | Manus Dashboard → Settings → API | Frontend API endpoint |
| `VITE_FRONTEND_FORGE_API_KEY` | Manus Dashboard → Settings → API | Frontend API key |

**How to get Manus API credentials:**
1. Go to Manus Dashboard
2. Settings → API Keys
3. Copy all four values

---

### 5. **Analytics (Optional)**
| Variable | Where to Get | What It Does |
|----------|-------------|------------|
| `VITE_ANALYTICS_ENDPOINT` | Umami or your analytics provider | Analytics endpoint URL |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami dashboard | Website tracking ID |

---

### 6. **Owner Info**
| Variable | Where to Get | What It Does |
|----------|-------------|------------|
| `OWNER_OPEN_ID` | Manus Dashboard → Account | Your Manus user ID (makes you admin) |
| `OWNER_NAME` | Your name | Your display name |

---

## Setup Checklist

- [ ] **OAuth Setup**
  - [ ] Get `VITE_APP_ID`
  - [ ] Get `OAUTH_SERVER_URL`
  - [ ] Get `VITE_OAUTH_PORTAL_URL`
  - [ ] Generate `JWT_SECRET`

- [ ] **Database Setup**
  - [ ] Get `DATABASE_URL`

- [ ] **Lemon Squeezy Setup**
  - [ ] Create account at lemonsqueezy.com
  - [ ] Create $7.77/month product
  - [ ] Get `LEMON_SQUEEZY_CHECKOUT_URL`
  - [ ] Generate API token → Get `LEMON_SQUEEZY_API_KEY`
  - [ ] Create webhook → Get `LEMON_SQUEEZY_WEBHOOK_SECRET`

- [ ] **Manus API Setup**
  - [ ] Get `BUILT_IN_FORGE_API_URL`
  - [ ] Get `BUILT_IN_FORGE_API_KEY`
  - [ ] Get `VITE_FRONTEND_FORGE_API_URL`
  - [ ] Get `VITE_FRONTEND_FORGE_API_KEY`

- [ ] **Owner Info**
  - [ ] Get `OWNER_OPEN_ID`
  - [ ] Set `OWNER_NAME`

---

## How to Add These to Manus

1. Go to Management UI → Settings → Secrets
2. Click "Add Secret"
3. Paste each variable name and value
4. Save
5. Server will restart automatically

---

## Testing Each Component

After adding all secrets:

1. **OAuth**: Try clicking "Sign In" - should redirect to login
2. **Database**: Dashboard should load user data
3. **Lemon Squeezy**: Click "Subscribe" - should redirect to checkout
4. **Manus APIs**: LLM features should work

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Redirect URI denied" | Check `VITE_OAUTH_PORTAL_URL` matches your domain |
| "Database connection failed" | Verify `DATABASE_URL` is correct and SSL is enabled |
| "Checkout 404" | Verify `LEMON_SQUEEZY_CHECKOUT_URL` is a valid Lemon Squeezy link |
| "Webhook not firing" | Check webhook URL is publicly accessible and `LEMON_SQUEEZY_WEBHOOK_SECRET` matches |

