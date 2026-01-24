---
description: Create points transfer partner visualization
---

# Feature: Points Transfer Partner Map

## Objective
Create a visual map showing which credit card points programs transfer to which airline/hotel partners.

## Context
- **Stack**: Next.js 14 (App Router), Sanity CMS, TypeScript, TailwindCSS
- **Points Programs**: Chase UR, Amex MR, Citi ThankYou, Capital One Miles, etc.
- **Schema**: `pointsProgram` type exists in Sanity with `name`, `logo`, `baseValue`

## Implementation Requirements

### 1. Transfer Partners Data [NEW]
```typescript
// Create: src/data/transferPartners.ts
// Static data for Phase 1 (can move to Sanity later)
export const transferPartners = {
  'chase-ultimate-rewards': {
    airlines: ['United', 'Southwest', 'British Airways', 'Air France/KLM', ...],
    hotels: ['Hyatt', 'Marriott', 'IHG']
  },
  'amex-membership-rewards': {
    airlines: ['Delta', 'ANA', 'Singapore', 'Emirates', ...],
    hotels: ['Hilton', 'Marriott']
  },
  // ... etc
}
```

### 2. Transfer Map Page [NEW]
```typescript
// Create: src/app/transfer-partners/page.tsx
// - Grid of points program cards
// - Click to expand/show partners
// - Or: interactive visualization with connecting lines
```

### 3. Transfer Map Component [NEW]
```typescript
// Create: src/components/TransferPartnerMap.tsx
// - "use client" directive
// - Visual representation options:
//   A) Accordion: click program to reveal partners
//   B) Network graph: programs in center, partners radiate out
//   C) Table view: programs as columns, partners as rows with checkmarks
// - Filter by partner type (airlines vs hotels)
// - Highlight transfer ratios (1:1, 1:1.5, etc.)
```

### 4. Link from Card Pages
```typescript
// On credit card pages, link to transfer map for that program
// "See all transfer partners →"
```

## Success Criteria
- [ ] `/transfer-partners` page displays all programs
- [ ] Each program shows its transfer partners
- [ ] Partners categorized as airlines/hotels
- [ ] Transfer ratios displayed where relevant
- [ ] Mobile responsive layout
- [ ] `npm run build` passes

## Key Files Reference
- `src/types/sanity.ts` - PointsProgram interface
- `src/app/[slug]/page.tsx` - Where to add "see partners" links
