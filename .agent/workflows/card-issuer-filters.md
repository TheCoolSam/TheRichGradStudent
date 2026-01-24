---
description: Add issuer filter buttons to credit cards page
---

# Feature: Card Issuer Filters

## Objective
Add filter buttons to `/credit-cards` page allowing users to filter by card issuer (Chase, Amex, Citi, etc.).

## Context
- **Stack**: Next.js 14 (App Router), Sanity CMS, TypeScript, TailwindCSS
- **Credit Card Schema**: Cards have `issuer` field (string)
- **Current Page**: `src/app/credit-cards/page.tsx`

## Implementation Requirements

### 1. Update Credit Cards Page [MODIFY]
```typescript
// Modify: src/app/credit-cards/page.tsx
// - Fetch distinct issuers from Sanity
// - Add query param support: ?issuer=chase
// - Pass issuer filter to client component
```

### 2. Filter Component [NEW]
```typescript
// Create: src/components/IssuerFilter.tsx
// - "use client" directive
// - Horizontal scrolling button row
// - Buttons: All, Chase, Amex, Citi, Capital One, Discover, etc.
// - Active button highlighted with rgs-green
// - Updates URL query param on click (useSearchParams)
// - Preserves other query params
```

### 3. Filter Cards Display
```typescript
// Update card grid to filter based on selected issuer
// If issuer query param exists, filter cards client-side OR
// Refetch with GROQ filter: *[_type == "creditCard" && issuer == $issuer]
```

## Success Criteria
- [ ] Filter buttons appear above card grid
- [ ] Clicking "Chase" shows only Chase cards
- [ ] URL updates to `/credit-cards?issuer=chase`
- [ ] Direct URL access works (shareable links)
- [ ] "All" shows all cards
- [ ] Mobile: horizontal scroll for buttons
- [ ] `npm run build` passes

## Key Files Reference
- `src/app/credit-cards/page.tsx` - Main page to modify
- `src/types/sanity.ts` - CreditCard interface
