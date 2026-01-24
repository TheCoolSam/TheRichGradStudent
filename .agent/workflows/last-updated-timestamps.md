---
description: Display last updated timestamps on content pages
---

# Feature: Last Updated Timestamps

## Objective
Show "Last Updated" timestamps on article and credit card review pages to indicate content freshness.

## Context
- **Stack**: Next.js 14 (App Router), Sanity CMS, TypeScript, TailwindCSS
- **Sanity Fields**: `publishedAt` (all types), `_updatedAt` (system field)
- **Credit Cards**: Already show `_updatedAt` on `[slug]/page.tsx` line 351-361

## Implementation Requirements

### 1. Update Article Page [MODIFY]
```typescript
// Modify: src/app/articles/[slug]/page.tsx
// - Fetch _updatedAt in GROQ query (add to projection)
// - Display "Last updated: [date]" below published date
// - Only show if _updatedAt differs from publishedAt by >24 hours
```

### 2. Update Blog Page [MODIFY]
```typescript
// Similar to articles - add to src/app/[slug]/page.tsx for posts
// (Credit cards already implemented)
```

### 3. Timestamp Component (Optional) [NEW]
```typescript
// Create: src/components/Timestamp.tsx
// - Reusable component for consistent formatting
// - Props: publishedAt, updatedAt
// - Shows "Published [date]" and optionally "Updated [date]"
// - Uses date-fns or native Intl.DateTimeFormat
```

## Date Formatting
```typescript
// Format: "January 23, 2026"
new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
```

## Success Criteria
- [ ] Articles show "Last updated" when content was modified
- [ ] Blog posts show "Last updated" when modified
- [ ] Credit card reviews already show this (verify working)
- [ ] Dates formatted consistently across site
- [ ] `npm run build` passes

## Key Files Reference
- `src/app/articles/[slug]/page.tsx` - Article detail page
- `src/app/[slug]/page.tsx` - Dynamic content page (posts, cards)
