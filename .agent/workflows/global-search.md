---
description: Implement global search with Cmd/Ctrl+K keyboard shortcut
---

# Feature: Global Search

## Objective
Add a global search feature accessible via Cmd/Ctrl+K that searches articles, blog posts, and credit cards.

## Context
- **Stack**: Next.js 14 (App Router), Sanity CMS, TypeScript, TailwindCSS
- **Sanity Client**: `src/lib/sanity.ts` exports a `client` for GROQ queries
- **Types**: `src/types/sanity.ts` contains `Article`, `Post`, `CreditCard` interfaces

## Implementation Requirements

### 1. API Route `/api/search/route.ts` [NEW]
```typescript
// Create: src/app/api/search/route.ts
// - Accept GET request with ?q=searchTerm
// - Query Sanity for matching articles, posts, and credit cards
// - Use GROQ: *[_type in ["article", "post", "creditCard"] && (title match $query || name match $query)]
// - Return JSON with results grouped by type
// - Limit to 10 results per type
```

### 2. Search Modal Component [NEW]
```typescript
// Create: src/components/SearchModal.tsx
// - Modal overlay with search input
// - Keyboard shortcut: Cmd/Ctrl+K to open
// - ESC to close
// - Debounced search (300ms)
// - Display results grouped by type (Articles, Blog, Cards)
// - Click result to navigate, close modal
// - Use "use client" directive
```

### 3. Update Navbar [MODIFY]
```typescript
// Modify: src/components/Navbar.tsx
// - Add search icon button (mobile)
// - Add "⌘K" badge hint (desktop)
// - Import and render SearchModal
// - Pass isOpen state to modal
```

## Success Criteria
- [ ] `/api/search?q=travel` returns matching content
- [ ] Cmd/Ctrl+K opens search modal from anywhere
- [ ] Search results are clickable and navigate correctly
- [ ] Modal closes on ESC or clicking outside
- [ ] Mobile: search icon in navbar opens modal
- [ ] `npm run build` passes

## Key Files Reference
- `src/lib/sanity.ts` - Sanity client
- `src/types/sanity.ts` - Type definitions
- `src/components/Navbar.tsx` - Where to add trigger
