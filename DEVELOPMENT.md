# Development Workflow Guide

## 🛡️ Safe Development Without Breaking Production

This guide explains how to develop new features (like monetization) without affecting the live site.

---

## 🌳 Branch Strategy

### **Current Setup**
- `main` → Production (auto-deploys to tickk.app)
- `claude/project-review-*` → Feature branches (auto-deploys to preview URLs)

### **Creating a Feature Branch**

```bash
# Create new feature branch
git checkout -b feature/monetization

# Make changes, commit locally
git add .
git commit -m "feat: Add pricing page infrastructure"

# Push to feature branch (NOT main)
git push -u origin feature/monetization
```

**Vercel will automatically deploy to:**
```
https://tickk-git-feature-monetization-[your-vercel-id].vercel.app
```

✅ **Test on this preview URL**
✅ **Share with beta testers**
✅ **Iterate without risk**

---

## 🚩 Feature Flags

Use feature flags to build features in `main` but keep them hidden until ready.

### **Setup**

1. **Copy environment variables:**
```bash
cp .env.local.example .env.local
```

2. **Enable features in `.env.local`:**
```bash
# Development: Enable all features
NEXT_PUBLIC_ENABLE_MONETIZATION=true
NEXT_PUBLIC_SHOW_PRICING=true
NEXT_PUBLIC_ENABLE_QUOTAS=true
```

3. **Use flags in code:**
```typescript
import { FEATURES } from '@/lib/config/features'

export default function Header() {
  return (
    <nav>
      <Link href="/">Home</Link>
      {FEATURES.PRICING_PAGE.enabled && (
        <Link href="/pricing">Pricing</Link>
      )}
    </nav>
  )
}
```

### **Production Control**

In Vercel Dashboard → Project Settings → Environment Variables:

**For Preview Deployments (testing):**
```
NEXT_PUBLIC_ENABLE_MONETIZATION=true
NEXT_PUBLIC_SHOW_PRICING=true
```

**For Production (live site):**
```
NEXT_PUBLIC_ENABLE_MONETIZATION=false
NEXT_PUBLIC_SHOW_PRICING=false
```

Or just don't set them (defaults to `false`).

---

## 🧪 Testing Workflow

### **Local Development**

```bash
# 1. Enable features locally
echo "NEXT_PUBLIC_ENABLE_MONETIZATION=true" >> .env.local
echo "NEXT_PUBLIC_SHOW_PRICING=true" >> .env.local

# 2. Start dev server
npm run dev

# 3. Test at http://localhost:3000
```

### **Preview Deployment**

```bash
# 1. Push to feature branch
git push origin feature/monetization

# 2. Vercel deploys preview automatically
# 3. Test at preview URL
# 4. Iterate and push again
```

### **Production Deployment**

```bash
# Only when everything is tested and working:

# 1. Merge to main
git checkout main
git merge feature/monetization

# 2. Push to main
git push origin main

# 3. Vercel deploys to production
# 4. Features still hidden (flags disabled in production env vars)

# 5. When ready to launch, enable in Vercel:
# Dashboard → Environment Variables → Production
# Set NEXT_PUBLIC_SHOW_PRICING=true
# Trigger redeploy
```

---

## 📋 Pre-Deploy Checklist

Before merging to `main`:

- [ ] All tests passing (`npm test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Tested on preview deployment
- [ ] Tested with flags ON and OFF
- [ ] Mobile responsive
- [ ] Works offline (PWA)
- [ ] No console errors
- [ ] Analytics tracking works

---

## 🔄 Recommended Development Flow

### **Phase 1: Infrastructure (Week 1)**
```bash
git checkout -b feature/monetization-infrastructure

# Build:
# - Feature flags system ✓
# - User quota types
# - Usage tracking
# - Environment config

git push origin feature/monetization-infrastructure
# → Test on preview URL

git checkout main
git merge feature/monetization-infrastructure
git push origin main
# → Features hidden in production (flags off)
```

### **Phase 2: Pricing Page (Week 2)**
```bash
git checkout -b feature/pricing-page

# Build:
# - /pricing page
# - Pricing components
# - Feature comparison table

git push origin feature/pricing-page
# → Test on preview URL

git merge to main when ready
```

### **Phase 3: Stripe Integration (Week 3)**
```bash
git checkout -b feature/stripe-integration

# Build:
# - Stripe checkout
# - Webhook handlers
# - Subscription management

git push origin feature/stripe-integration
# → Test with Stripe test mode

git merge to main when ready
```

### **Phase 4: Launch (Week 4)**
```bash
# Everything merged to main, tested, and working

# In Vercel Dashboard:
# 1. Set NEXT_PUBLIC_SHOW_PRICING=true (Production)
# 2. Set NEXT_PUBLIC_ENABLE_MONETIZATION=true (Production)
# 3. Trigger redeploy

# → Pricing page now visible to everyone
# → Pro features available for purchase
```

---

## 🚨 Emergency Rollback

If something breaks in production:

### **Method 1: Disable Feature Flag**
```bash
# In Vercel Dashboard → Environment Variables
NEXT_PUBLIC_SHOW_PRICING=false
# Trigger redeploy → Feature hidden instantly
```

### **Method 2: Revert Commit**
```bash
git revert HEAD
git push origin main
# Vercel auto-deploys previous version
```

### **Method 3: Rollback in Vercel**
```bash
# Vercel Dashboard → Deployments
# Click previous successful deployment
# Click "Promote to Production"
```

---

## 🎯 Current Recommendation

**Use this workflow:**

1. **Work in feature branches** (`feature/monetization`)
2. **Test on Vercel preview URLs** (automatic)
3. **Use feature flags** for gradual rollout
4. **Keep production flags OFF** until fully ready
5. **Merge to main** only when tested and working
6. **Enable flags in production** when ready to launch

This gives you:
- ✅ Safe development
- ✅ Real production testing
- ✅ Easy rollback
- ✅ Gradual feature rollout
- ✅ No risk to live site

---

## 📞 Need Help?

If you run into issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set
4. Test with feature flags disabled
5. Ask in GitHub Issues

---

**Ready to start?** Run:
```bash
cp .env.local.example .env.local
# Edit .env.local with your settings
npm run dev
```
