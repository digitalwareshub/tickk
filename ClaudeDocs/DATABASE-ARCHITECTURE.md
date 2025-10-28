# Database Architecture for Tickk Pro

**Version:** 1.0
**Created:** 2025-10-23
**Status:** Planning Phase

---

## 🎯 Quick Answer: Do We Need a Database?

**YES, but keep it minimal and serverless.**

For Tickk Pro, you need to store:
- User accounts (email, created date)
- Stripe customer IDs
- Subscription status (active/canceled/past_due)
- Usage quotas (current item count)

**Recommended:** Vercel Postgres (or Vercel KV for simpler needs)
**Alternative:** Supabase (if you want more features)
**NOT Needed:** Complex database, separate hosting, migrations

---

## 📊 What Data Needs to Be Stored?

### **Current Architecture (Free Tier Only)**
```
User's Browser
  ├─ IndexedDB (tasks, notes, braindump)
  ├─ localStorage (settings, preferences)
  └─ NO server, NO database, 100% local
```

**This works great! Keep it.**

### **New Requirements (Pro Tier)**
```
User Subscription Data (NEW - needs database)
  ├─ Email address (for Stripe, receipts)
  ├─ Stripe customer ID (payment tracking)
  ├─ Subscription status (active/canceled)
  ├─ Plan type (free/pro/enterprise)
  ├─ Current period end (billing date)
  └─ Usage quota (item count for limits)

User's Productivity Data (STAYS LOCAL - no change)
  ├─ Tasks, notes, braindump (IndexedDB)
  ├─ Never goes to server
  └─ Privacy promise maintained
```

---

## 🏗️ Recommended Database Solution

### **Option 1: Vercel Postgres (RECOMMENDED)**

**Why:**
- ✅ Already using Vercel (no new service)
- ✅ Serverless (scales automatically)
- ✅ Free tier: 60 hours compute/month
- ✅ Built-in connection pooling
- ✅ Edge-compatible (fast globally)
- ✅ Easy setup (one command)

**Setup:**
```bash
# 1. Install Vercel Postgres
npm install @vercel/postgres

# 2. Create database in Vercel Dashboard
# Settings → Storage → Create Database

# 3. Environment variables auto-added
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
```

**Database Schema:**
```sql
-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  plan VARCHAR(50) DEFAULT 'free', -- 'free' | 'pro' | 'enterprise'
  status VARCHAR(50) DEFAULT 'active', -- 'active' | 'canceled' | 'past_due'
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- usage_quotas table
CREATE TABLE usage_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_items INTEGER DEFAULT 0,
  max_items INTEGER DEFAULT 500, -- 500 for free, 0 (unlimited) for pro
  last_checked TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_usage_quotas_user_id ON usage_quotas(user_id);
```

**Cost:**
- Free tier: $0/month (60 compute hours)
- Paid tier (if needed): $20/month (unlimited compute)

---

### **Option 2: Vercel KV (Redis) - Simpler Alternative**

**If you want ULTRA simple:**
```bash
npm install @vercel/kv
```

**Store data as key-value:**
```typescript
// User data structure
{
  "user:john@example.com": {
    id: "uuid",
    email: "john@example.com",
    stripeCustomerId: "cus_xxx",
    plan: "pro",
    subscriptionStatus: "active"
  }
}
```

**Pros:**
- ✅ Even simpler than Postgres
- ✅ Free tier: 30K commands/day
- ✅ No schema migrations
- ✅ Fast key-value lookups

**Cons:**
- ❌ No complex queries (no JOIN, no filtering)
- ❌ Not great for analytics
- ❌ Manual indexing needed

**When to use KV:**
- MVP/testing phase
- Simple lookups only
- Want fastest setup

**When to use Postgres:**
- Production ready
- Need reporting/analytics
- Complex queries (team subscriptions)

---

### **Option 3: Supabase (Full Backend Solution)**

**Why Consider Supabase:**
- ✅ Postgres database
- ✅ Built-in authentication (magic links!)
- ✅ Real-time subscriptions
- ✅ Storage for file uploads
- ✅ Edge functions (serverless)
- ✅ Generous free tier

**Setup:**
```bash
npm install @supabase/supabase-js
```

**Pros:**
- ✅ Authentication built-in (saves work)
- ✅ Dashboard for managing data
- ✅ Row-level security policies
- ✅ Real-time updates (future sync feature)
- ✅ Free tier: 500MB database

**Cons:**
- ❌ Another service to manage
- ❌ Separate from Vercel ecosystem
- ❌ Slight vendor lock-in
- ❌ More complex than needed initially

**When to use Supabase:**
- Want real-time features
- Need team workspaces (Enterprise tier)
- Want built-in auth (magic links)
- Plan to add file storage (cloud backup)

---

## 🎯 My Recommendation: Start Simple, Scale Later

### **Phase 1 (MVP - Next 4 Weeks): Vercel Postgres**

**Why:**
- Already on Vercel
- Simple serverless setup
- Sufficient for 10K users
- Easy to migrate later if needed

**What You Store:**
```typescript
interface User {
  id: string              // UUID
  email: string           // For Stripe + receipts
  created_at: Date
}

interface Subscription {
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due'
  current_period_end: Date
}

interface UsageQuota {
  user_id: string
  total_items: number     // Current count
  max_items: number       // 500 for free, 0 for pro
}
```

**User's productivity data (tasks/notes) STAYS in IndexedDB - never touches database!**

### **Phase 2 (When You Need It): Add Supabase for Advanced Features**

**Migrate to Supabase when:**
- Adding team workspaces (need real-time)
- Adding cross-device sync
- Need file storage (cloud backup)
- Enterprise customers demand it

---

## 🔒 Privacy Architecture

### **Critical: Maintain Privacy Promise**

```
What GOES to Database:
✅ Email (for billing only)
✅ Stripe customer ID (payment tracking)
✅ Subscription status (active/canceled)
✅ Item COUNT (for quota enforcement: "350 items")

What STAYS Local (NEVER goes to database):
❌ Task content ("Call John tomorrow")
❌ Note content ("Great product idea")
❌ Voice recordings
❌ Classification data
❌ Personal productivity information
```

**Database Query Example:**
```sql
-- ✅ Good: Check if user can create more items
SELECT total_items, max_items FROM usage_quotas WHERE user_id = ?

-- ❌ Bad: Never store task content
SELECT task_text FROM tasks WHERE user_id = ? -- DON'T DO THIS
```

**Marketing Message:**
```
"We only store your email and subscription status.
Your tasks, notes, and voice data never leave your device.
We literally can't read your productivity data - it's not in our database."
```

---

## 🔄 Data Flow Architecture

### **User Creates Item (Free Tier)**
```
User speaks → IndexedDB (local)
                    ↓
               No server call
                    ↓
              Privacy maintained
```

### **User Creates Item (Pro Tier with Quota Tracking)**
```
User speaks → IndexedDB (local)
                    ↓
            Background API call: "Increment count"
                    ↓
     Database: UPDATE usage_quotas SET total_items = total_items + 1
                    ↓
              (Content never sent)
```

### **User Upgrades to Pro**
```
1. User clicks "Upgrade to Pro"
2. Redirect to Stripe Checkout
3. User pays on Stripe (secure)
4. Stripe webhook → Your API
5. API creates/updates database:
   - Create user record (email)
   - Store Stripe customer ID
   - Set plan = 'pro'
   - Set max_items = 0 (unlimited)
6. Redirect user back to app
7. App checks: "Am I Pro?" via API
8. Unlock Pro features
```

---

## 💻 Implementation Code Structure

### **Database Connection** (`lib/db/postgres.ts`)
```typescript
import { sql } from '@vercel/postgres'

export async function getUser(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
  return result.rows[0]
}

export async function createUser(email: string) {
  const result = await sql`
    INSERT INTO users (email)
    VALUES (${email})
    RETURNING *
  `
  return result.rows[0]
}

export async function getSubscription(userId: string) {
  const result = await sql`
    SELECT * FROM subscriptions WHERE user_id = ${userId}
  `
  return result.rows[0]
}

export async function updateSubscriptionStatus(
  userId: string,
  status: string,
  plan: string
) {
  await sql`
    UPDATE subscriptions
    SET status = ${status}, plan = ${plan}, updated_at = NOW()
    WHERE user_id = ${userId}
  `
}
```

### **API Routes** (`pages/api/...`)
```typescript
// pages/api/user/quota.ts
export default async function handler(req, res) {
  const { userId } = req.query

  const quota = await sql`
    SELECT total_items, max_items
    FROM usage_quotas
    WHERE user_id = ${userId}
  `

  const { total_items, max_items } = quota.rows[0]
  const isExceeded = max_items > 0 && total_items >= max_items

  res.json({
    current: total_items,
    limit: max_items,
    exceeded: isExceeded,
    plan: max_items === 0 ? 'pro' : 'free'
  })
}

// pages/api/user/increment-usage.ts
export default async function handler(req, res) {
  const { userId } = req.body

  await sql`
    UPDATE usage_quotas
    SET total_items = total_items + 1, last_checked = NOW()
    WHERE user_id = ${userId}
  `

  res.json({ success: true })
}
```

### **Stripe Webhook** (`pages/api/webhooks/stripe.ts`)
```typescript
import Stripe from 'stripe'
import { buffer } from 'micro'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req, res) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']!

  const event = stripe.webhooks.constructEvent(
    buf,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object

      // Create/update user in database
      const user = await createOrUpdateUser(session.customer_email)

      // Create subscription record
      await sql`
        INSERT INTO subscriptions (
          user_id,
          stripe_customer_id,
          stripe_subscription_id,
          plan,
          status,
          current_period_end
        ) VALUES (
          ${user.id},
          ${session.customer},
          ${session.subscription},
          'pro',
          'active',
          ${new Date(session.current_period_end * 1000)}
        )
        ON CONFLICT (user_id)
        DO UPDATE SET
          stripe_subscription_id = ${session.subscription},
          plan = 'pro',
          status = 'active'
      `

      // Update quota to unlimited
      await sql`
        UPDATE usage_quotas
        SET max_items = 0
        WHERE user_id = ${user.id}
      `

      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object

      // Downgrade to free
      await sql`
        UPDATE subscriptions
        SET status = 'canceled', plan = 'free'
        WHERE stripe_subscription_id = ${subscription.id}
      `

      // Restore quota limit
      await sql`
        UPDATE usage_quotas
        SET max_items = 500
        WHERE user_id = (
          SELECT user_id FROM subscriptions
          WHERE stripe_subscription_id = ${subscription.id}
        )
      `

      break
    }
  }

  res.json({ received: true })
}
```

---

## 📦 Setup Instructions

### **Step 1: Create Vercel Postgres Database**

1. Go to Vercel Dashboard
2. Your Project → Settings → Storage
3. Click "Create Database"
4. Select "Postgres"
5. Choose region (same as deployment)
6. Create database (free tier)

### **Step 2: Install Dependencies**

```bash
npm install @vercel/postgres
npm install stripe  # For payment processing
```

### **Step 3: Run Database Migrations**

Create `scripts/setup-database.sql`:
```sql
-- Copy the schema from above
CREATE TABLE users (...);
CREATE TABLE subscriptions (...);
CREATE TABLE usage_quotas (...);
```

Run locally:
```bash
# Connect to Vercel Postgres
vercel env pull .env.local

# Run migration
psql $POSTGRES_URL < scripts/setup-database.sql
```

Or create API route for auto-migration:
```typescript
// pages/api/setup-db.ts (delete after running once)
export default async function handler(req, res) {
  await sql`CREATE TABLE IF NOT EXISTS users (...)`
  await sql`CREATE TABLE IF NOT EXISTS subscriptions (...)`
  await sql`CREATE TABLE IF NOT EXISTS usage_quotas (...)`

  res.json({ success: true })
}
```

### **Step 4: Test Database Connection**

```typescript
// pages/api/test-db.ts
import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  const result = await sql`SELECT NOW()`
  res.json({ time: result.rows[0].now })
}
```

Visit: `http://localhost:3000/api/test-db`

---

## 💰 Cost Analysis

### **Vercel Postgres Pricing**

**Free Tier (Hobby):**
- ✅ 60 compute hours/month
- ✅ 256 MB storage
- ✅ 5 GB data transfer
- ✅ Good for: 0-1,000 users

**Paid Tier (Pro - $20/month):**
- ✅ Unlimited compute hours
- ✅ 512 MB storage (scales up)
- ✅ 100 GB data transfer
- ✅ Good for: 1,000-50,000 users

**Enterprise:**
- Custom pricing
- Good for: 50,000+ users

### **Estimated Usage**

**Per User (Annual):**
- Database queries: ~10,000/year
  - Quota checks: ~1,000
  - Subscription status: ~500
  - Updates: ~500

**1,000 Pro Users:**
- Total queries: 10M/year = 833K/month
- Storage: ~100 KB per user = 100 MB total
- Fits in free tier? **Barely**
- Recommended: Paid tier ($20/month)

**10,000 Pro Users:**
- Total queries: 100M/year = 8.3M/month
- Storage: ~1 GB
- Requires: Pro tier ($20/month minimum)

---

## 🔄 Migration Path (If You Outgrow Vercel)

### **When to Consider Migration:**

**Indicators:**
- >50,000 active Pro users
- Database costs >$100/month
- Need advanced features (real-time, etc.)
- Enterprise compliance requirements

### **Migration Options:**

**Option 1: Supabase**
- More features (auth, storage, real-time)
- Better free tier (500 MB vs 256 MB)
- Easier team workspaces

**Option 2: PlanetScale**
- Serverless MySQL
- Better scaling
- Branch-based workflows

**Option 3: Self-hosted Postgres**
- Full control
- Cheaper at scale
- More maintenance

**Migration is Easy:**
```bash
# Export from Vercel
pg_dump $VERCEL_POSTGRES_URL > backup.sql

# Import to new database
psql $NEW_DATABASE_URL < backup.sql

# Update env vars
POSTGRES_URL=$NEW_DATABASE_URL
```

---

## ✅ Final Recommendation

### **Start With: Vercel Postgres**

**Reasons:**
1. ✅ Simple setup (5 minutes)
2. ✅ Already on Vercel
3. ✅ Serverless (scales automatically)
4. ✅ Free tier sufficient for MVP
5. ✅ Easy to migrate later

**What You Need:**
- Users table (email, created_at)
- Subscriptions table (Stripe IDs, plan, status)
- Usage quotas table (item count, limits)

**What You DON'T Need:**
- Tasks/notes storage (stays local!)
- File storage (later with cloud backup)
- Real-time database (later with teams)
- Complex analytics (use Stripe data)

### **Next Steps:**

1. **This week:** Set up Vercel Postgres
2. **Next week:** Build API routes for quota checks
3. **Week 3:** Integrate Stripe webhooks
4. **Week 4:** Test end-to-end flow

**Total cost:** $0/month (free tier) until you hit 1,000+ Pro users

---

**Questions?**
- Want me to set up the database now?
- Need help with the schema?
- Want to explore Supabase instead?

Let me know and I'll proceed! 🚀
