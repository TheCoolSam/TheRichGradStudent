# The Rich Grad Student - Complete Folder Structure

```
TheRichGradStudent/
│
├── 📁 src/
│   ├── 📁 app/                          # Next.js 14 App Router
│   │   ├── 📁 [slug]/
│   │   │   └── 📄 page.tsx              # Dynamic route for posts & credit cards
│   │   ├── 📁 blog/
│   │   │   └── 📄 page.tsx              # Blog listing with category filter
│   │   ├── 📄 layout.tsx                # Root layout + footer
│   │   ├── 📄 page.tsx                  # Homepage (Hero + Level Cards + Team)
│   │   └── 📄 globals.css               # Global Tailwind styles
│   │
│   ├── 📁 components/
│   │   ├── 📄 CardValueTable.tsx        # RGS Value Table with 2cpp/7cpp math
│   │   ├── 📄 Disclaimer.tsx            # Auto-appended legal disclaimer
│   │   └── 📄 DonationButton.tsx        # Animated "Buy us a coffee" button
│   │
│   ├── 📁 lib/
│   │   ├── 📄 sanity.ts                 # Sanity client configuration
│   │   └── 📄 image.ts                  # Image URL builder helper
│   │
│   ├── 📁 types/
│   │   └── 📄 sanity.ts                 # TypeScript interfaces for all schemas
│   │
│   └── 📁 utils/
│       └── 📄 cardMath.ts               # Math helper functions (2cpp, 7cpp, colors)
│
├── 📁 sanity/                            # Sanity CMS Schemas
│   └── 📁 schemas/
│       ├── 📄 author.ts                 # Author schema (Karan, Giorgio)
│       ├── 📄 post.ts                   # Blog post schema
│       ├── 📄 creditCard.ts             # Credit card review schema (THE CORE!)
│       └── 📄 index.ts                  # Schema exports
│
├── 📄 package.json                       # Dependencies & scripts
├── 📄 tsconfig.json                      # TypeScript configuration (strict mode)
├── 📄 tailwind.config.js                # Tailwind CSS configuration + custom colors
├── 📄 postcss.config.js                 # PostCSS configuration
├── 📄 next.config.js                    # Next.js configuration (image domains)
├── 📄 .gitignore                        # Git ignore rules
├── 📄 .env.example                      # Environment variables template
└── 📄 README.md                         # Complete project documentation
```

## 📂 Directory Purposes

### `/src/app/` - Pages & Routing

- **page.tsx** - Homepage with hero section, level selector, and team
- **layout.tsx** - Global layout wrapper with footer
- **[slug]/page.tsx** - Dynamic content pages (automatically detects post vs creditCard)
- **blog/page.tsx** - Content listing with optional category filtering

### `/src/components/` - Reusable Components

- **CardValueTable.tsx** - The star of the show! Calculates and displays credit card value
- **Disclaimer.tsx** - DRY legal disclaimer component (auto-appended to all content)
- **DonationButton.tsx** - Animated Stripe donation button with hover effects

### `/src/lib/` - Core Utilities

- **sanity.ts** - Sanity.io client initialization
- **image.ts** - Image URL generation for Sanity images

### `/src/types/` - TypeScript Definitions

- **sanity.ts** - All interfaces (Author, Post, CreditCard, Rating)

### `/src/utils/` - Helper Functions

- **cardMath.ts** - Value calculations and rating color logic

### `/sanity/schemas/` - CMS Content Models

- **author.ts** - Team member profiles
- **post.ts** - Blog posts with category tagging
- **creditCard.ts** - Credit card reviews with full value table data

## 🎯 Key File Explanations

### `creditCard.ts` Schema

The most important schema! Contains:

- Card metadata (name, image, affiliate link)
- Intro content ("Why we opened it!")
- Spend requirement & APR offer
- **12 value categories** each with multiplier + rating:
  - Signup bonus
  - Annual fee/credits
  - Travel, Grocery, Gas, Dining, Pharmacy, Other
  - Lounge, Partner, Misc benefits
- Spending cap toggle for footnotes

### `CardValueTable.tsx` Component

The magic happens here! Takes a CreditCard object and:

1. Displays all 12 categories in a beautiful table
2. Calculates 2cpp and 7cpp values automatically
3. Color-codes based on ratings (Green/Red)
4. Adds \*\* footnote if spending caps apply

### `[slug]/page.tsx` Dynamic Route

Smart content detection:

1. Tries to fetch as blog post
2. If not found, tries to fetch as credit card
3. Renders appropriate template automatically
4. Always appends Disclaimer component

### `page.tsx` Homepage

Heavy Framer Motion animations:

- Typewriter effect on hero text
- Animated blob backgrounds
- Staggered card entrance animations
- Magnetic hover effects (cards lift & glow)
- Viewport-triggered reveals

## 🚀 Build Output Structure

After running `npm run build`, Next.js generates:

```
.next/
├── static/              # Static assets
├── server/              # Server-side code
└── cache/               # Build cache
```

## 📦 Deployment Files

When deploying to Hostinger:

- Push to GitHub repository
- Hostinger auto-detects Next.js
- Runs `npm install` + `npm run build`
- Serves from `.next/` directory

## 🔧 Configuration Files

- **tsconfig.json** - Strict TypeScript with path aliases (@/\*)
- **tailwind.config.js** - Custom colors (rgs-gold, rgs-navy)
- **next.config.js** - Image domain allowlist (cdn.sanity.io)
- **.env.example** - Required environment variables template

## 📝 Content Flow

```
Sanity Studio (CMS)
        ↓
   Create Content
   (Post or Card)
        ↓
    Publish
        ↓
Frontend fetches via
Sanity Client API
        ↓
Automatic detection
& template rendering
        ↓
User sees content
(with auto Disclaimer!)
```

## 🎨 Styling Architecture

```
globals.css (Base Tailwind)
        ↓
tailwind.config.js (Custom theme)
        ↓
Component-level Tailwind classes
        ↓
Framer Motion inline animations
        ↓
Final rendered styles
```

---

**Total Files Created:** 23 files across 9 directories
**Lines of Code:** ~2,500+ lines
**Tech Stack:** Next.js 14 + TypeScript + Tailwind + Framer Motion + Sanity.io
