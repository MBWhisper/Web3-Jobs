# 🚀 Web3 Jobs - Setup & Deployment Guide

## Phase 1: Deploy to Vercel (Free)

### Steps:
1. **Create GitHub Repository**
   ```bash
   # Go to GitHub.com and create a new repository
   # Push your code:
   git init
   git add .
   git commit -m "Initial Web3 Jobs"
   git branch -M main
   git remote add origin https://github.com/MBWhisper/Web3-Jobs.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New Project" → Import your repository
   - Click "Deploy"

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `STRIPE_SECRET_KEY` = your Stripe secret key (starts with sk_...)
     - `STRIPE_WEBHOOK_SECRET` = your Stripe webhook secret

---

## Phase 2: Set Up Stripe Payments

### 1. Create Stripe Account
- Go to [stripe.com](https://stripe.com)
- Sign up and verify your account

### 2. Get API Keys
- Dashboard → Developers → API Keys
- Copy **Secret Key** (starts with `sk_...`)

### 3. Set Up Webhook
- Dashboard → Developers → Webhooks
- Add endpoint: `https://your-project.vercel.app/api/stripe-webhook`
- Select events: `checkout.session.completed`, `payment_intent.succeeded`
- Copy **Webhook Secret**

### 4. Test Payments
- Use Stripe Test Mode cards:
  - Card: 4242 4242 4242 4242
  - Exp: Any future date
  - CVC: Any 3 digits

---

## Phase 3: Bank & Payment Setup for Morocco

### Option A: Stripe (International Payments)
- Already integrated in the code
- Accepts international cards

### Option B: PayPal Morocco
1. Create PayPal Business Account
2. Add your Moroccan bank account
3. Generate API credentials

### Option C: Local Bank Transfer
The site already shows:
- Attijariwafa Bank
- BMCE
- Société Générale

You'll receive transfer notifications via email.

---

## Phase 4: Add Real Jobs

### Current: 10 Demo Jobs
Located in `src/lib/data.ts`

### To Add Real Jobs:
1. Edit `src/lib/data.ts`
2. Add more job objects following the format:
```typescript
{
  id: '11',
  title: 'Job Title',
  company: 'Company Name',
  companyLogo: 'A',
  location: 'Remote or City',
  salary: '$Xk - $Yk',
  salaryMin: X000,
  salaryMax: Y000,
  tags: ['react', 'solidity', 'remote'],
  postedAt: '1d',
  isRemote: true,
  description: 'Job description...',
  offerings: ['Benefit 1', 'Benefit 2']
}
```

---

## Phase 5: Marketing & Growth

### Free Channels:
1. **Twitter/X** - Post about new jobs daily
2. **LinkedIn** - Share in Web3 groups
3. **Discord** - Join Web3 developer servers
4. **Reddit** - r/ethereum, r/web3, r/cryptocurrency

### Paid Ads (Optional):
- Google Ads: Target "web3 jobs", "blockchain jobs"
- Twitter Ads: Target crypto accounts

---

## 📊 Revenue Projection

| Month | Jobs Posted | Revenue |
|-------|-------------|---------|
| 1     | 10          | $990    |
| 3     | 50          | $4,950  |
| 6     | 200         | $19,800 |
| 12    | 500+        | $50,000+|

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Payments**: Stripe
- **Hosting**: Vercel (free)
- **Analytics**: Vercel Analytics

---

## ✅ Checklist

- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Set Stripe API keys
- [ ] Configure Stripe Webhook
- [ ] Test payment flow
- [ ] Add 50+ real jobs
- [ ] Set up Twitter account
- [ ] Join Discord communities
- [ ] Launch! 🚀

---

## 💬 Support

- Stripe Docs: https://stripe.com/docs
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: Create issue in your repo

**Good luck with your Web3 Jobs platform!** 🎉
