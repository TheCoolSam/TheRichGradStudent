# The Rich Grad Student 🎓💳

**Millionaire Style Travel, GRAD STUDENT BUDGET**

A production-ready Next.js 14 web application for graduate students to master credit card rewards and travel hacking. Built with TypeScript, Tailwind CSS, Framer Motion, and Sanity.io CMS.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **CMS:** Sanity.io (Headless)
- **Hosting:** Hostinger Cloud Startup (Managed Node.js)
- **Deployment:** GitHub → Hostinger Auto-Deploy

## 📁 Project Structure

```
TheRichGradStudent/
├── src/
│   ├── app/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic content pages (posts & cards)
│   │   ├── blog/
│   │   │   └── page.tsx          # Blog listing page
│   │   ├── layout.tsx            # Root layout with footer
│   │   ├── page.tsx              # Homepage with animations
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── CardValueTable.tsx    # Credit card value comparison table
│   │   ├── Disclaimer.tsx        # Auto-appended disclaimer
│   │   └── DonationButton.tsx    # Donation CTA button
│   ├── lib/
│   │   ├── sanity.ts             # Sanity client configuration
│   │   └── image.ts              # Image URL builder
│   ├── types/
│   │   └── sanity.ts             # TypeScript interfaces
│   └── utils/
│       └── cardMath.ts           # Math helpers for value calculations
├── sanity/
│   └── schemas/
│       ├── author.ts             # Author schema
│       ├── post.ts               # Blog post schema
│       ├── creditCard.ts         # Credit card review schema
│       └── index.ts              # Schema exports
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .env.example
```

## 🎨 Design Philosophy

- **Visual Identity:** Professional and Trustworthy + Energetic and Cool
- **Target Audience:** Graduate Students (Gen Z/Millennials, 21+)
- **Animation Style:** Bold, magnetic hovers, staggered reveals, parallax scrolling
- **Color Palette:** Gold/Amber gradients for luxury feel with modern design

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity.io

1. Create a new Sanity project at [sanity.io](https://www.sanity.io/)
2. Copy your project credentials
3. Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-18
```

### 3. Initialize Sanity Studio

```bash
# In your Sanity project directory
npm create sanity@latest

# Copy the schemas from sanity/schemas/ to your Sanity project
# Import them in your sanity.config.ts
```

### 4. Add Team Members to Sanity

Create two authors in your Sanity Studio:

**Karan:**

- Name: Karan
- Role: Business and Personal Credit Card Expert

**Giorgio:**

- Name: Giorgio
- Role: Personal Credit Card Expert, Hotel/Airfare Redemption Expert

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Build for Production

```bash
npm run build
npm start
```

## 📊 Sanity Content Models

### Author Schema

- `name` (String) - Author name
- `role` (String) - Expertise/role
- `image` (Image) - Profile photo
- `bio` (Text) - Biography

### Post Schema (Blog Posts)

- `title` (String) - Post title
- `slug` (Slug) - URL-friendly slug
- `mainImage` (Image) - Featured image
- `body` (PortableText) - Rich text content
- `author` (Reference) - Link to author
- `publishedAt` (DateTime) - Publication date
- `category` (String) - Level category (new/everyday/travel/pro)

### CreditCard Schema (Reviews)

- **Basic Info:**
  - `name` (String) - Card name
  - `slug` (Slug) - URL slug
  - `image` (Image) - Card artwork
  - `affiliateLink` (URL) - Monetization link
  - `introContent` (PortableText) - "Why we opened it!"
  - `spendRequirement` (String)
  - `aprOffer` (String)
  - `hasSpendingCap` (Boolean)

- **Value Table Data:**
  - Signup bonus (value + rating)
  - Annual fee & credits
  - Category multipliers (Travel, Grocery, Gas, Dining, Pharmacy, Other)
  - Each category has: multiplier (%) + rating (Great/Good/Poor/RGS Wallet)
  - Benefits (Lounge, Partner, Misc) with ratings

## 🎯 Key Features

### 1. Smart Content Detection

The frontend automatically detects content type (post vs creditCard) and renders the appropriate template.

### 2. RGS Value Table

Automatically calculates:

- Points value at 2 cents per point (2cpp)
- Points value at 7 cents per point (7cpp)
- Color-coded ratings (Green for Great/RGS Wallet, Red for Poor)
- Conditional footnotes for spending caps

### 3. Interactive Level System

Four categories guide users:

- **I'm new here** - Credit building basics
- **EveryDay Earning** - No-fee cashback cards
- **Travel Cards** - Premium travel rewards
- **Credit Card Pro** - Business & luxury cards

### 4. Auto-Appended Disclaimer

Every review and blog post automatically includes the legal disclaimer at the bottom.

### 5. Cool Animations

- Typewriter effect on hero text
- Staggered character reveals
- Deep magnetic hover effects (cards lift & glow)
- Animated blob backgrounds
- Viewport-triggered entrance animations

## 💰 Monetization

- Affiliate links on credit card reviews
- Donation button (Stripe Payment Link)
- Update the Stripe link in [DonationButton.tsx](src/components/DonationButton.tsx)

## 🚀 Deployment to Hostinger

### GitHub Setup

1. Initialize git repository:

```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create GitHub repository and push:

```bash
git remote add origin your-github-repo-url
git branch -M main
git push -u origin main
```

### Hostinger Setup

1. Connect your GitHub repository to Hostinger
2. Configure auto-deploy on push to main
3. Set environment variables in Hostinger dashboard
4. Deploy!

## 📝 Content Management

### Adding a New Blog Post

1. Go to Sanity Studio
2. Create new "Blog Post"
3. Fill in title, body, author, category
4. Publish
5. Frontend automatically detects and displays it

### Adding a Credit Card Review

1. Go to Sanity Studio
2. Create new "Credit Card Review"
3. Fill in card details and value table data
4. Add affiliate link
5. Publish
6. Frontend automatically renders with value table

**No code changes required!** ✨

## 🎨 Customization

### Updating Colors

Edit [tailwind.config.js](tailwind.config.js):

```javascript
colors: {
  'rgs-gold': '#FFD700',
  'rgs-navy': '#0F172A',
}
```

### Modifying Animations

All animations use Framer Motion in [page.tsx](src/app/page.tsx). Adjust timing, easing, and effects as needed.

### Changing Footer Links

Edit [layout.tsx](src/app/layout.tsx) footer section.

## 🧮 Math Utilities

The `cardMath.ts` utility provides:

- `calculateAt2cpp(multiplier)` - 2 cents per point value
- `calculateAt7cpp(multiplier)` - 7 cents per point value
- `formatAsPercentage(value)` - Format as percentage string
- `getRatingColor(rating)` - Get Tailwind color class for ratings

## 📱 Responsive Design

Fully responsive with Tailwind breakpoints:

- Mobile: Single column layouts
- Tablet (md): 2 column grids
- Desktop (lg): 3-4 column grids

## ⚡ Performance

- Next.js 14 App Router for optimal performance
- Image optimization with next/image
- Static generation where possible
- Framer Motion with viewport optimization

## 🔒 Legal Compliance

The Disclaimer component ensures:

- Clear disclosure of affiliate relationships
- Age restrictions (21+)
- Financial advice disclaimers
- Risk warnings

## 🤝 Contributing

This is a client project. For questions or modifications, contact the project maintainer.

## 📄 License

All rights reserved © 2026 The Rich Grad Student

---

Built with ❤️ for graduate students by graduate students
