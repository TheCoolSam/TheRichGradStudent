---
description: Add breadcrumb navigation to article and card pages
---

# Feature: Breadcrumbs

## Objective
Add breadcrumb navigation to article and credit card pages for better UX and SEO.

## Context
- **Stack**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **URL Structure**:
  - Articles: `/articles/[slug]`
  - Credit Cards: `/[slug]` (type detected from content)
  - Blog Posts: `/[slug]`

## Implementation Requirements

### 1. Breadcrumb Component [NEW]
```typescript
// Create: src/components/Breadcrumbs.tsx
// Props interface:
interface BreadcrumbItem {
  label: string
  href?: string  // undefined = current page (no link)
}
interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

// Render as: Home > Credit Cards > Chase Sapphire Reserve
// Use semantic <nav aria-label="Breadcrumb"> and <ol>
// Separator: ">" or "/" with proper spacing
// Style: text-sm text-gray-600, links in rgs-green
```

### 2. Add to Article Pages [MODIFY]
```typescript
// Modify: src/app/articles/[slug]/page.tsx
// Breadcrumb: Home > Articles > [Article Title]
// Place above <header> section
```

### 3. Add to Credit Card Pages [MODIFY]
```typescript
// Modify: src/app/[slug]/page.tsx
// For credit cards: Home > Credit Cards > [Card Name]
// For blog posts: Home > Blog > [Post Title]
// Determine type from content._type
```

### 4. SEO Structured Data (Optional)
```typescript
// Add JSON-LD BreadcrumbList schema for SEO
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
</script>
```

## Success Criteria
- [ ] Breadcrumbs appear on article pages
- [ ] Breadcrumbs appear on credit card pages
- [ ] Breadcrumbs appear on blog post pages
- [ ] Home link navigates to "/"
- [ ] Category link navigates to listing page
- [ ] Current page shown without link
- [ ] `npm run build` passes

## Key Files Reference
- `src/app/articles/[slug]/page.tsx` - Article detail
- `src/app/[slug]/page.tsx` - Dynamic content page
