---
description: Implement spending calculator to compare credit card value
---

# Feature: Spending Calculator

## Objective
Create a calculator where users input monthly spending by category to see which credit cards provide the best value.

## Context
- **Stack**: Next.js 14 (App Router), Sanity CMS, TypeScript, TailwindCSS
- **Credit Card Schema**: Cards have multipliers for travel, grocery, gas, dining, pharmacy, other
- **Annual Fees**: `annualFee` field, `annualCredits` field for offsetting credits

## Implementation Requirements

### 1. Calculator Page [NEW]
```typescript
// Create: src/app/calculator/page.tsx
// - Server component that fetches all credit cards
// - Pass cards to client calculator component
```

### 2. Calculator Client Component [NEW]
```typescript
// Create: src/components/SpendingCalculator.tsx
// - "use client" directive
// - Input fields for monthly spending:
//   - Travel, Grocery, Gas, Dining, Pharmacy, Other
// - Calculate points earned per card based on multipliers
// - Apply point valuations (fetch from pointsProgram or use defaults ~1.5cpp)
// - Subtract annual fee, add annual credits
// - Show top 3 cards ranked by net annual value
// - Display breakdown: points earned, value, fees, net value
```

### 3. Styling
- Modern glassmorphism card design
- Animated number transitions
- Mobile responsive grid layout
- Use RGS brand colors (rgs-green, rgs-black)

## Calculation Formula
```
For each card:
  monthlyPoints = (travel * travelMultiplier) + (grocery * groceryMultiplier) + ...
  annualPoints = monthlyPoints * 12
  pointValue = annualPoints * (pointsProgram.baseValue / 100)  // cpp to dollars
  netValue = pointValue + annualCredits - annualFee
```

## Success Criteria
- [ ] `/calculator` page loads with input form
- [ ] Changing inputs updates results in real-time
- [ ] Top 3 cards displayed with value breakdown
- [ ] Cards link to their detail pages
- [ ] Works on mobile
- [ ] `npm run build` passes

## Key Files Reference
- `src/types/sanity.ts` - CreditCard interface with multipliers
- `src/lib/sanity.ts` - Sanity client for fetching cards
