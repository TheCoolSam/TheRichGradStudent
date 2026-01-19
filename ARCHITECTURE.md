# THE RICH GRAD STUDENT - SYSTEM ARCHITECTURE

## Complete Technical Overview & Data Flow

---

## 🏗️ SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION LAYER                           │
│                                                                          │
│  Browser (Desktop/Mobile/Tablet)                                        │
│  ↓ HTTPS Request                                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      HOSTING & CDN LAYER                                 │
│                                                                          │
│  Hostinger Cloud Startup (Managed Node.js)                              │
│  • Auto-deploy from GitHub (main branch)                                │
│  • SSL/TLS Certificate                                                   │
│  • Load Balancing                                                        │
│  • Environment Variables                                                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS 14 APPLICATION LAYER                        │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     APP ROUTER (src/app/)                        │   │
│  │                                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │   │
│  │  │   page.tsx   │  │   [slug]/    │  │     blog/page.tsx    │  │   │
│  │  │   Homepage   │  │   page.tsx   │  │   Content Listing    │  │   │
│  │  │              │  │   Dynamic    │  │   + Category Filter  │  │   │
│  │  │   • Hero     │  │   Content    │  │                      │  │   │
│  │  │   • Levels   │  │   Page       │  │   • Posts Grid       │  │   │
│  │  │   • Team     │  │              │  │   • Cards Grid       │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘  │   │
│  │                                                                  │   │
│  │  ┌────────────────────────────────────────────────────────────┐ │   │
│  │  │              layout.tsx (Root Layout)                       │ │   │
│  │  │  • Global Styles  • Footer  • Font Loading                 │ │   │
│  │  └────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    ↓                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                COMPONENTS (src/components/)                      │   │
│  │                                                                  │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │   │
│  │  │ CardValueTable   │  │   Disclaimer     │  │ DonationBtn  │  │   │
│  │  │                  │  │                  │  │              │  │   │
│  │  │ • 12 Categories  │  │ • Legal Text     │  │ • Stripe     │  │   │
│  │  │ • 2cpp/7cpp Math │  │ • Auto-Appended  │  │ • Framer     │  │   │
│  │  │ • Color Ratings  │  │ • DRY Component  │  │   Motion     │  │   │
│  │  └──────────────────┘  └──────────────────┘  └──────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    ↓                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │               UTILITIES & HELPERS (src/lib, src/utils)           │   │
│  │                                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │   │
│  │  │  sanity.ts   │  │  image.ts    │  │   cardMath.ts      │    │   │
│  │  │              │  │              │  │                    │    │   │
│  │  │ • Client     │  │ • URL        │  │ • calculateAt2cpp  │    │   │
│  │  │   Config     │  │   Builder    │  │ • calculateAt7cpp  │    │   │
│  │  │ • Queries    │  │ • Optimize   │  │ • getRatingColor   │    │   │
│  │  └──────────────┘  └──────────────┘  └────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    ↓                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                  TYPESCRIPT TYPES (src/types/)                   │   │
│  │                                                                  │   │
│  │  Author | Post | CreditCard | Rating                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓ Fetch Data
┌─────────────────────────────────────────────────────────────────────────┐
│                         SANITY.IO CMS LAYER                              │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    SANITY CONTENT LAKE                           │   │
│  │                                                                  │   │
│  │  ┌────────────┐    ┌────────────┐    ┌──────────────────────┐  │   │
│  │  │   author   │    │    post    │    │     creditCard       │  │   │
│  │  │            │    │            │    │                      │  │   │
│  │  │ • Karan    │◄───│ • title    │    │ • name               │  │   │
│  │  │ • Giorgio  │    │ • slug     │    │ • image              │  │   │
│  │  │            │    │ • body     │    │ • affiliateLink      │  │   │
│  │  │            │    │ • category │    │ • Value Table (12)   │  │   │
│  │  │            │    │ • author   │    │   - signupBonus      │  │   │
│  │  │            │    │            │    │   - annualFee        │  │   │
│  │  │            │    │            │    │   - travel, grocery  │  │   │
│  │  │            │    │            │    │   - gas, dining, etc │  │   │
│  │  │            │    │            │    │ • hasSpendingCap     │  │   │
│  │  └────────────┘    └────────────┘    └──────────────────────┘  │   │
│  │                                                                  │   │
│  │  API Endpoint: https://[project-id].api.sanity.io/v1/data/     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    ↑                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     SANITY STUDIO (CMS UI)                       │   │
│  │                                                                  │   │
│  │  Client uses this to:                                            │   │
│  │  • Add new blog posts                                            │   │
│  │  • Create credit card reviews                                    │   │
│  │  • Upload images                                                 │   │
│  │  • Manage authors                                                │   │
│  │  • Edit content                                                  │   │
│  │                                                                  │   │
│  │  URL: https://[your-project].sanity.studio                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↑
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLIENT MANAGEMENT LAYER                           │
│                                                                          │
│  Content Creator (Non-Technical User)                                   │
│  • Opens Sanity Studio in browser                                       │
│  • Fills in forms (no code required)                                    │
│  • Clicks "Publish"                                                     │
│  • Content instantly available on frontend                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 DATA FLOW DIAGRAMS

### Flow 1: Homepage Load

```
User visits homepage
        ↓
Next.js renders page.tsx (Server-Side)
        ↓
Framer Motion animations initialize (Client-Side)
        ↓
Typewriter effect on hero text
        ↓
Staggered entrance animations on sections
        ↓
Level cards render with hover effects
        ↓
Team section displays Karan & Giorgio
        ↓
Footer rendered from layout.tsx
        ↓
Page fully interactive
```

### Flow 2: Blog Post Creation & Display

```
Client opens Sanity Studio
        ↓
Creates new "Blog Post" document
        ↓
Fills in: title, slug, body, author, category, image
        ↓
Clicks "Publish"
        ↓
Content saved to Sanity Content Lake
        ↓
User visits /blog or /blog?category=travel
        ↓
blog/page.tsx fetches posts from Sanity
        ↓
Renders grid of post cards
        ↓
User clicks a post card
        ↓
Navigates to /[slug]
        ↓
[slug]/page.tsx queries Sanity for post
        ↓
Detects type = "post"
        ↓
Renders post template:
  • Title
  • Author info
  • Main image
  • Body content (PortableText)
  • Disclaimer (auto-appended)
```

### Flow 3: Credit Card Review Creation & Display

```
Client opens Sanity Studio
        ↓
Creates new "Credit Card Review" document
        ↓
Fills in:
  • Card name, image, affiliate link
  • Intro content
  • Spend requirement, APR offer
  • VALUE TABLE (12 categories):
    - Signup bonus value & rating
    - Annual fee & credits
    - Travel, Grocery, Gas, Dining, Pharmacy, Other
      (multiplier % + rating for each)
    - Lounge, Partner, Misc benefits
      (description + rating for each)
  • hasSpendingCap toggle
        ↓
Clicks "Publish"
        ↓
Content saved to Sanity Content Lake
        ↓
User visits /[slug]
        ↓
[slug]/page.tsx queries Sanity for creditCard
        ↓
Detects type = "creditCard"
        ↓
Renders credit card template:
  • Card name (title)
  • Author info
  • Card image
  • "Apply Now" button (affiliate link)
  • Quick Info box (spend requirement, APR)
  • Intro section ("Why we opened it!")
  • CardValueTable component:
    - Receives full creditCard object
    - Iterates through 12 categories
    - Calculates 2cpp and 7cpp values using cardMath.ts
    - Applies color coding based on ratings
    - Shows ** footnote if hasSpendingCap = true
  • Donation button
  • Disclaimer (auto-appended)
```

### Flow 4: Value Table Math Calculation

```
CardValueTable receives creditCard prop
        ↓
For each spending category (travel, grocery, gas, etc.):
        ↓
Reads multiplier from creditCard
  Example: card.travelMultiplier = 3
        ↓
Calls calculateAt2cpp(3)
  Returns: 6
        ↓
Calls calculateAt7cpp(3)
  Returns: 21
        ↓
Calls formatAsPercentage(6)
  Returns: "6%"
        ↓
Calls getRatingColor(card.travelRating)
  If rating = "great" → Returns: "text-green-600 font-semibold"
  If rating = "poor" → Returns: "text-red-500"
        ↓
Renders table row:
  Travel | 3% | 6% | 21% (all in green if rating = great)
        ↓
Repeat for all 12 categories
        ↓
If hasSpendingCap = true:
  Add ** to Gas and Other Purchases rows
  Display footnote below table
```

### Flow 5: Level Card Click → Filtered Blog

```
User hovers over level card (e.g., "Travel Cards")
        ↓
Framer Motion triggers:
  • y: -10 (card lifts)
  • scale: 1.03 (card enlarges)
  • boxShadow increases (deep shadow)
        ↓
User clicks card
        ↓
Next.js Link navigates to /blog?category=travel
        ↓
blog/page.tsx detects category param
        ↓
Fetches from Sanity:
  *[_type == "post" && category == "travel"]
        ↓
Renders only posts tagged with category = "travel"
        ↓
User sees filtered content
        ↓
"← View all content" link available to clear filter
```

---

## 🎨 ANIMATION FLOW

### Homepage Animation Timeline

```
0.0s - Page loads (opacity: 0 on all elements)
0.1s - Hero section fades in
0.1s - 0.5s - Hero H1 characters appear one by one (typewriter)
0.5s - 1.0s - Second H1 line characters appear
1.0s - Mission paragraph fades in (y: 30 → 0)
1.2s - Slogan fades in
1.4s - Donation button fades in
[User scrolls]
2.0s - Level selector section enters viewport
2.0s - Section title fades in
2.2s - Level card 1 fades in + scales
2.4s - Level card 2 fades in + scales
2.6s - Level card 3 fades in + scales
2.8s - Level card 4 fades in + scales
[User scrolls]
3.0s - Team section enters viewport
3.0s - Section title fades in
3.2s - Karan's avatar fades in + scales
3.4s - Giorgio's avatar fades in + scales

[Continuous]
Background blobs animate infinitely:
  • Blob 1: 7s loop, no delay
  • Blob 2: 7s loop, 2s delay
  • Blob 3: 7s loop, 4s delay
  • Movement: translate + scale transforms

[On hover - any card]
0.0s - Cursor enters card bounds
0.3s - Card lifts (y: -10px)
0.3s - Shadow expands
0.3s - Scale increases (1.03x)
[Hover ends]
0.3s - All properties revert
```

---

## 🗄️ DATABASE SCHEMA RELATIONSHIPS

```
┌────────────┐
│   Author   │
│            │
│ • _id      │
│ • name     │◄─────────┐
│ • role     │          │
│ • image    │          │ Reference
│ • bio      │          │
└────────────┘          │
                        │
       ┌────────────────┼────────────────┐
       │                │                │
┌──────▼──────┐   ┌────▼─────────┐     │
│    Post     │   │  CreditCard  │     │
│             │   │              │     │
│ • _id       │   │ • _id        │     │
│ • title     │   │ • name       │     │
│ • slug      │   │ • slug       │     │
│ • mainImage │   │ • image      │     │
│ • body      │   │ • affiliateLink    │
│ • category  │   │ • introContent     │
│ • author ───┼───┼─• author ────┘     │
│ • publishedAt│  │ • spendRequirement │
└─────────────┘   │ • aprOffer         │
                  │ • hasSpendingCap   │
                  │                    │
                  │ VALUE TABLE:       │
                  │ • signupBonusValue │
                  │ • signupBonusRating│
                  │ • annualFee        │
                  │ • annualCredits    │
                  │ • travelMultiplier │
                  │ • travelRating     │
                  │ • groceryMultiplier│
                  │ • groceryRating    │
                  │ • gasMultiplier    │
                  │ • gasRating        │
                  │ • diningMultiplier │
                  │ • diningRating     │
                  │ • pharmacyMultiplier│
                  │ • pharmacyRating   │
                  │ • otherMultiplier  │
                  │ • otherRating      │
                  │ • loungeBenefits   │
                  │ • loungeRating     │
                  │ • partnerBenefits  │
                  │ • partnerRating    │
                  │ • miscBenefits     │
                  │ • miscRating       │
                  │ • publishedAt      │
                  └────────────────────┘
```

---

## 🚀 DEPLOYMENT PIPELINE

```
Developer (Local)
        ↓
    git add .
    git commit -m "Update"
    git push origin main
        ↓
┌───────────────────────────────────┐
│         GitHub Repository          │
│                                   │
│  • main branch updated            │
│  • Webhook triggers Hostinger     │
└───────────────────────────────────┘
        ↓ Webhook
┌───────────────────────────────────┐
│      Hostinger Cloud Startup       │
│                                   │
│  1. Detects new push              │
│  2. Clones repository             │
│  3. Runs: npm install             │
│  4. Runs: npm run build           │
│  5. Stops old process             │
│  6. Runs: npm start               │
│  7. Site live!                    │
└───────────────────────────────────┘
        ↓
┌───────────────────────────────────┐
│       Production Website           │
│                                   │
│  https://yourdomain.com           │
│  • Next.js app running            │
│  • Serves optimized .next/ build  │
│  • Connects to Sanity.io          │
│  • SSL/TLS enabled                │
└───────────────────────────────────┘
```

---

## 🔐 SECURITY & ENVIRONMENT VARIABLES

```
┌────────────────────────────────────────────────┐
│         .env.local (Local Development)         │
│                                                │
│  NEXT_PUBLIC_SANITY_PROJECT_ID=abc123         │
│  NEXT_PUBLIC_SANITY_DATASET=production        │
│  NEXT_PUBLIC_SANITY_API_VERSION=2024-01-18    │
└────────────────────────────────────────────────┘
                    ↓ Used by
┌────────────────────────────────────────────────┐
│            src/lib/sanity.ts                   │
│                                                │
│  createClient({                                │
│    projectId: process.env.NEXT_PUBLIC_...     │
│    dataset: process.env.NEXT_PUBLIC_...       │
│  })                                            │
└────────────────────────────────────────────────┘
                    ↓ Reads
┌────────────────────────────────────────────────┐
│     Hostinger Environment Variables            │
│     (Set in Control Panel)                     │
│                                                │
│  Same variables set in production              │
│  Never committed to Git                        │
└────────────────────────────────────────────────┘
```

---

## 📊 PERFORMANCE OPTIMIZATION FLOW

```
User requests page
        ↓
Next.js Server-Side Rendering (SSR)
        ↓
┌───────────────────────────────────────┐
│     1. Fetch data from Sanity         │
│        (Server-side, fast)            │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│     2. Generate HTML                  │
│        (Pre-rendered on server)       │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│     3. Optimize images                │
│        (next/image auto-optimization) │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│     4. Send to client                 │
│        (Minimal JavaScript)           │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│     5. Hydrate React                  │
│        (Client-side interactivity)    │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│     6. Framer Motion animations       │
│        (GPU-accelerated)              │
└───────────────────────────────────────┘
        ↓
Fully interactive page
```

---

## 🎯 SMART CONTENT DETECTION LOGIC

```
User visits: /chase-ink-cash
        ↓
[slug]/page.tsx receives params.slug = "chase-ink-cash"
        ↓
┌────────────────────────────────────────────────┐
│  Query Sanity: *[_type == "post" && slug...]   │
└────────────────────────────────────────────────┘
        ↓
    Result: null
        ↓
┌────────────────────────────────────────────────┐
│  Query Sanity: *[_type == "creditCard" ...]    │
└────────────────────────────────────────────────┘
        ↓
    Result: CreditCard object found!
        ↓
if (content._type === 'creditCard') {
  Render:
    • Card image
    • Apply Now button (affiliate link)
    • Quick Info box
    • Intro content
    • CardValueTable
    • Donation button
    • Disclaimer
}
        ↓
Page displays with full credit card review
```

---

## 💡 COMPONENT REUSABILITY MAP

```
                    ┌──────────────┐
                    │  layout.tsx  │
                    │  (Root)      │
                    └──────┬───────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼────┐   ┌─────▼─────┐   ┌────▼──────┐
    │ page.tsx  │   │ [slug]/   │   │ blog/     │
    │ Homepage  │   │ page.tsx  │   │ page.tsx  │
    └───────────┘   └─────┬─────┘   └───────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    ┌─────▼──────┐  ┌────▼────────┐  ┌──▼─────────┐
    │ CardValue  │  │ Disclaimer  │  │ Donation   │
    │ Table      │  │             │  │ Button     │
    └────────────┘  └─────────────┘  └────────────┘
          │
    ┌─────▼──────┐
    │ cardMath   │
    │ utilities  │
    └────────────┘

Reusability:
• Disclaimer: Used in EVERY content page ([slug]/page.tsx)
• CardValueTable: Used in ALL credit card reviews
• DonationButton: Can be placed anywhere
• cardMath: Imported by CardValueTable
```

---

## 🎨 COLOR RATING SYSTEM

```
Rating Value         Color Class              Visual
─────────────────────────────────────────────────────
"great"       →  text-green-600 font-semibold  (Dark Green, Bold)
"rgs-wallet"  →  text-green-600 font-semibold  (Dark Green, Bold)
"good"        →  text-gray-700                (Dark Gray, Normal)
"poor"        →  text-red-500                 (Red, Normal)
undefined     →  text-gray-700                (Dark Gray, Normal)

Used in CardValueTable to visually highlight:
• Great deals (green = go!)
• Poor deals (red = warning!)
• Average deals (gray = neutral)
```

---

This architecture enables **zero-code content management** while maintaining **production-grade performance** and **enterprise-level scalability**.

🚀 **The Rich Grad Student is ready to scale infinitely!**
