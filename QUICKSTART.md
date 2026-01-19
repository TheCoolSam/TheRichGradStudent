# QUICK START GUIDE

## Get The Rich Grad Student Running in 5 Minutes

---

## ⚡ Prerequisites

- Node.js 18+ installed
- npm or yarn installed
- Sanity.io account (free tier)
- Text editor (VS Code recommended)

---

## 🚀 5-MINUTE SETUP

### Step 1: Install Dependencies (2 minutes)

```bash
cd TheRichGradStudent
npm install
```

This installs:

- Next.js 14
- React 18
- Framer Motion
- Sanity Client
- Tailwind CSS
- TypeScript

### Step 2: Set Up Sanity (2 minutes)

1. **Create Sanity account:**
   - Go to [sanity.io](https://www.sanity.io/)
   - Sign up (free)

2. **Create new project:**

   ```bash
   npm create sanity@latest
   ```

   Follow prompts:
   - Project name: `the-rich-grad-student`
   - Dataset: `production`
   - Template: `Clean project`

3. **Copy your credentials:**
   - Project ID: `abc123xyz` (from dashboard)
   - Dataset: `production`
   - API Version: `2024-01-18`

4. **Create `.env.local` file:**

   ```bash
   cp .env.example .env.local
   ```

5. **Add your credentials to `.env.local`:**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-18
   ```

### Step 3: Add Schemas to Sanity (1 minute)

In your Sanity project, import the schemas:

**Option A: Quick Method**
Copy all files from `sanity/schemas/` to your Sanity project's schema folder.

**Option B: Manual Import**
In your Sanity project's `sanity.config.ts`:

```typescript
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import author from "./schemas/author";
import post from "./schemas/post";
import creditCard from "./schemas/creditCard";

export default defineConfig({
  projectId: "your-project-id",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: [author, post, creditCard],
  },
});
```

### Step 4: Run Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**You should see:**

- Homepage with animations
- Hero section
- Level cards
- Team section
- Footer

---

## 🎨 CUSTOMIZE IMMEDIATELY

### Change Colors

Edit [tailwind.config.js](tailwind.config.js):

```javascript
theme: {
  extend: {
    colors: {
      'rgs-gold': '#YOUR_COLOR_HERE',
      'rgs-navy': '#YOUR_COLOR_HERE',
    },
  },
}
```

### Update Donation Link

Edit [src/components/DonationButton.tsx](src/components/DonationButton.tsx):

```tsx
href = "https://donate.stripe.com/YOUR_STRIPE_LINK";
```

### Modify Text Content

All homepage text is in [src/app/page.tsx](src/app/page.tsx) - search and replace as needed.

---

## 📝 ADD YOUR FIRST CONTENT

### Add Team Members (Sanity Studio)

1. Deploy Sanity Studio:

   ```bash
   cd your-sanity-project
   sanity deploy
   ```

2. Open: `https://your-project.sanity.studio`

3. Create "Author" documents:

   **Karan:**
   - Name: `Karan`
   - Role: `Business and Personal Credit Card Expert`
   - Upload profile image
   - Add bio

   **Giorgio:**
   - Name: `Giorgio`
   - Role: `Personal Credit Card Expert, Hotel/Airfare Redemption Expert`
   - Upload profile image
   - Add bio

### Add Your First Blog Post

1. In Sanity Studio, click "Blog Post"
2. Fill in:
   - Title: `Welcome to The Rich Grad Student`
   - Slug: Click "Generate" (auto-creates from title)
   - Main Image: Upload an image
   - Author: Select Karan or Giorgio
   - Category: Select "I'm new here"
   - Body: Write your content
   - Published At: Set to today
3. Click "Publish"

### Add Your First Credit Card Review

1. In Sanity Studio, click "Credit Card Review"
2. Fill in:
   - Card Name: `Chase Ink Cash`
   - Slug: Click "Generate"
   - Card Image: Upload card artwork
   - Affiliate Link: `https://your-affiliate-link.com`
   - Introduction Content: "Why we opened it!"
   - Spend Requirement: `Spend $6,000 in 3 months`
   - APR Offer: `0% APR first 12 months`

3. **Fill in Value Table:**
   - Signup Bonus Value: `$750`
   - Signup Bonus Rating: `Great`
   - Annual Fee: `0`
   - Annual Credits: `0`
   - Travel Multiplier: `2`
   - Travel Rating: `Good`
   - Grocery Multiplier: `2`
   - Grocery Rating: `Good`
   - Gas Multiplier: `5`
   - Gas Rating: `Great`
   - (Continue for all categories...)
   - Has Spending Cap: `true` (if applicable)

4. Select Author
5. Set Published At date
6. Click "Publish"

---

## 🔍 TEST YOUR SITE

### View Your Blog Post

1. Go to `http://localhost:3000/blog`
2. You should see your blog post card
3. Click it
4. View full post with auto-appended disclaimer

### View Your Credit Card Review

1. Go to `http://localhost:3000/blog`
2. You should see your credit card in the "Credit Card Reviews" section
3. Click it
4. See the full review with:
   - Card image
   - Apply Now button
   - Quick Info
   - Intro content
   - **RGS Value Table** (with 2cpp and 7cpp calculations!)
   - Donation button
   - Disclaimer

### Test Category Filtering

1. Go to homepage: `http://localhost:3000`
2. Click "I'm new here" level card
3. Should navigate to `/blog?category=new`
4. Only posts with category="new" should show

### Test Animations

1. Refresh homepage
2. Watch typewriter effect on hero text
3. Scroll down slowly
4. See sections fade in as they enter viewport
5. Hover over level cards → should lift & glow
6. Hover over team avatars → should rotate & scale

---

## 🐛 TROUBLESHOOTING

### "Module not found" Error

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading

**Check:**

1. Sanity project ID is correct in `.env.local`
2. Images are published in Sanity (not drafts)
3. CORS is configured in Sanity dashboard

**Fix CORS:**

- Go to Sanity dashboard → API → CORS Origins
- Add: `http://localhost:3000`

### Animations Not Working

**Check:**

1. Framer Motion is installed: `npm list framer-motion`
2. Page is using `'use client'` directive at top
3. Browser supports modern JavaScript

### No Content Showing

**Check:**

1. Content is published (not drafts) in Sanity
2. `publishedAt` date is set and not in future
3. Environment variables are correct
4. Check browser console for errors

### Build Fails

```bash
# Check for TypeScript errors
npm run build

# Fix type errors in code
# Common issue: missing types for Sanity objects
```

---

## 📁 PROJECT STRUCTURE OVERVIEW

```
src/
├── app/
│   ├── page.tsx          ← Start here (homepage)
│   ├── blog/page.tsx     ← Blog listing
│   ├── [slug]/page.tsx   ← Content pages
│   └── layout.tsx        ← Global layout
├── components/
│   ├── CardValueTable.tsx    ← The magic!
│   ├── Disclaimer.tsx
│   └── DonationButton.tsx
├── lib/
│   ├── sanity.ts         ← Sanity client
│   └── image.ts          ← Image helpers
├── types/
│   └── sanity.ts         ← TypeScript types
└── utils/
    └── cardMath.ts       ← Math functions
```

---

## ⌨️ USEFUL COMMANDS

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Check code quality

# Sanity (run in Sanity project directory)
sanity deploy            # Deploy Sanity Studio
sanity dataset export    # Backup content
sanity dataset import    # Restore content
```

---

## 🎯 NEXT STEPS

Now that your site is running:

1. **Add more content** in Sanity Studio
2. **Customize colors** in `tailwind.config.js`
3. **Update team photos** by uploading real images in Sanity
4. **Set up real affiliate links** for credit cards
5. **Configure Stripe** for donations
6. **Deploy to Hostinger** (see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md))

---

## 📚 HELPFUL RESOURCES

- **Full Documentation:** [README.md](README.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Folder Structure:** [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)

- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **Framer Motion:** https://www.framer.com/motion
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 💡 PRO TIPS

1. **Hot Reload:** Changes to code auto-reload in browser
2. **TypeScript:** Editor will show type errors as you code
3. **Sanity Preview:** Changes in Sanity appear immediately
4. **Console:** Check browser console (F12) for errors
5. **Network Tab:** Monitor API calls to Sanity

---

## ✅ SUCCESS CHECKLIST

- [x] Dependencies installed
- [x] Sanity project created
- [x] Environment variables set
- [x] Dev server running
- [x] Homepage loads with animations
- [x] Sanity Studio accessible
- [x] Team members created
- [x] First blog post published
- [x] First credit card review published
- [x] Content visible on frontend
- [x] Disclaimer auto-appears
- [x] Value table calculates correctly

**If all checked → You're ready to build!** 🚀

---

## 🆘 STILL STUCK?

Common first-time issues:

1. **Port 3000 already in use:**

   ```bash
   # Use different port
   npm run dev -- -p 3001
   ```

2. **Sanity connection timeout:**
   - Check internet connection
   - Verify project ID is correct

3. **Nothing renders:**
   - Check console for errors
   - Verify `.env.local` exists and has correct values
   - Restart dev server

4. **Animations janky:**
   - Close other browser tabs
   - Check CPU usage
   - Try different browser

---

**You're now running The Rich Grad Student locally!** 🎓💳✨

Start creating content and watch your site come to life!
