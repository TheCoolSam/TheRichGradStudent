# Copilot Instructions — The Rich Grad Student

Short, actionable guidance for AI coding agents working in this repo.

1) Big picture
- Next.js 14 App Router app (server components by default). Server components fetch from Sanity and render; client components (animations, interactive UI) must include `use client` at top. See `src/app/layout.tsx`, `src/app/page.tsx`, and `src/components/*Client.tsx`.
- Sanity is the CMS (schemas in `/sanity/schemas`). Content types: `post` (blog), `article`, `creditCard`, `pointsProgram`, and `homepageFeature` (new). Frontend expects certain GROQ projections (see `src/app/page.tsx` and `src/app/[slug]/page.tsx`).
- Images use `src/lib/image.ts` / `urlFor()` helper; prefer passing `asset.url` or let `next/image` use the `urlFor(...).url()` pattern.

2) Key development workflows
- Local web dev: `npm install` then `npm run dev` at repo root (Next dev server).
- Production build: `npm run build` (failures surface strict ESLint/TypeScript errors).
- Sanity Studio: cd into `/sanity`, run `npm install` then `npm run dev` or `npx sanity deploy` to push schemas. Update `sanity/package.json` when bumping Studio.
- Deploy: push to `main` → Vercel/Hostinger auto-deploy. Vercel provides preview deployments per branch; promote the `main` deployment to production if needed.

3) Project-specific conventions and pitfalls
- Strict TypeScript + ESLint: avoid `any`. Replace `any` with concrete query result types (use `Array<Record<string, unknown>>` for Portable Text blocks or the project's `src/types/sanity.ts`). Remove unused variables/imports to pass CI.
- Portable Text: server-render portable text in server components. Do not pass raw Portable Text arrays or React components across the server-client boundary (serialization issues). Pattern: render PortableText on the server and pass the resulting JSX as children to a client wrapper (see `src/components/ArticleContent.tsx`).
- Client components: any file using Framer Motion or browser-only APIs must start with "use client".
- Routing expectations:
  - `src/app/articles/[slug]/page.tsx` → article pages
  - `src/app/[slug]/page.tsx` → blog `post` or credit card page (server resolves type)
  - `src/app/credit-cards/page.tsx` → listing + filters

4) Where to look first for common tasks
- Sanity schemas: `sanity/schemas/*.ts` (add or change fields here).
- Sanity client and helpers: `src/lib/sanity.ts`, `src/lib/image.ts`.
- Types: `src/types/sanity.ts` — keep these in sync with schema projections.
- Homepage integration: `src/app/page.tsx` (featured content, points carousel).
- Credit card listing and filters: `src/app/credit-cards/page.tsx`.
- Millionaire Guide graph: `src/components/CreditCardGraph.tsx` (edge logic / adjacency bug).
- Recommendation engine: `src/lib/recommendations.ts` (cleanup `any` and dynamic imports).

5) Lint/build gotchas (from recent failures)
- ESLint rules applied during build are strict: `@typescript-eslint/no-explicit-any`, `no-unused-vars`, `react/no-unescaped-entities`. Fixes must remove `any`, escape apostrophes in JSX (`&apos;`), and remove/replace unused variables.
- TypedObject / Portable Text typing errors: when a Portable Text renderer expects `TypedObject | TypedObject[]`, ensure bodies are typed with `_type` present or cast safely before passing.
- Sanity Studio deploy artifacts are generated in `sanity/dist/` — avoid committing huge build artifacts unless intentional.

6) Quick examples
- Fetch typed featured items (example pattern used in `src/app/page.tsx`):
```ts
const features = await client.fetch<Array<{ _id:string; content:{_type:string; title:string; "slug":string} }>>(`*[_type=="homepageFeature"]{_id, content->{_type, title, "slug": slug.current}}`)
```
- Guard Portable Text before passing to renderer:
```ts
const body = maybeBody as Array<Record<string, unknown> & { _type: string }>;
if (!body) return null;
<PortableText value={body} />
```

7) Where to add new features
- Global search: add UI in `src/components/Navbar.tsx` + server API route under `src/app/api/search/route.ts` that queries Sanity. Use debounce and limit results.
- Spending calculator: new page `src/app/calculator/page.tsx` or modal component under `src/components/Calculator.tsx`.
- Filters: extend `src/app/credit-cards/page.tsx` to accept `issuer` query param and include it in GROQ filters.

8) Commit & PR etiquette for bots
- Keep changes small, run `npm run build` locally before pushing. Fix all ESLint errors. Include updated `src/types/sanity.ts` if you change Sanity projections.

If anything above is unclear or missing, tell me which area to expand (search implementation, Portable Text types, or Sanity schema rules) and I'll iterate.

9) Site Operations (what to know about the site — non-code)
- Repository: primary remote is at https://github.com/TheCoolSam/TheRichGradStudent.git. Always push changes to GitHub; use feature branches and open PRs against `main` for review before merging.
- CI / Build: Vercel performs the production build using `npm run build`. Run this command locally to reproduce build-time TypeScript/ESLint errors before pushing.
- Deploy hosts:
  - Vercel: automatic deployments on branch push; each branch gets a preview deployment. Promote `main` preview to production when ready.
  - Hostinger: secondary/legacy hosting may be configured for static previews or backups — coordinate with repo owner if Hostinger is required for a specific environment.
- Environment variables and secrets: stored in the Vercel dashboard (do not commit `.env` or secrets to the repo). Common vars: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`, `NEXT_PUBLIC_SANITY_DATASET`, and any analytics keys.
- Sanity Studio: deployed separately with `npx sanity deploy` from the `/sanity` folder; Studio URL: https://therichgradstudent.sanity.studio/. Keep studio `sanity` package >= 5.x for Content Agent compatibility.
- Content lifecycle: editors publish content via Sanity Studio; production site reflects published documents after the next Vercel build / incremental revalidation. For urgent content updates, redeploy or trigger revalidation as configured.
- Build & dev commands:
  - Local dev: `npm install` && `npm run dev` (root)
  - Production build: `npm run build`
  - Sanity Studio dev: `cd sanity && npm install && npm run dev`
  - Deploy Studio: `cd sanity && npx sanity deploy`
- Branching and releases: use feature branches; open PRs to `main`; require at least one reviewer. Merge to `main` triggers Vercel production preview; promote to publish.
- Rollbacks & redeploys: use Vercel dashboard to rollback to previous deployment or re-deploy a commit. For content rollbacks, restore document revisions inside Sanity Studio.
- DNS & domain: production domain is managed in Vercel (or DNS provider). Update DNS records only after confirming Vercel project settings.
- Monitoring & analytics: connect Sentry/LogDNA/other error-monitoring and Google Analytics (or similar) keys via Vercel environment variables.
- Backups & data: Sanity has revision history; for full backups export datasets with `sanity dataset export` and keep exports offsite.
- Access & permissions: manage Vercel and GitHub access via org/team settings; Sanity Studio collaborators are managed inside the Sanity project settings.
- Important notes:
  - Never commit secrets or build artifacts (`sanity/dist/`) into the repo.
  - Always run `npm run build` locally before pushing to avoid breaking Vercel builds.
  - When upgrading Sanity Studio, bump `sanity` and `@sanity/vision` carefully and test `sanity run dev` locally.

