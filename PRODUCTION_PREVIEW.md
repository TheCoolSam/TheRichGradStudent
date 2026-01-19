# Sanity Preview Tool - Production Setup

## For Production Deployment:

### 1. Deploy Your Next.js Site

Deploy to Vercel, Netlify, or your hosting provider.

### 2. Set Environment Variables

In your hosting platform, add:

```
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
SANITY_PREVIEW_SECRET=your-random-secret-token
SANITY_API_TOKEN=your-sanity-viewer-token
```

### 3. The Presentation Tool Will Work Automatically

Once both are deployed:

- Go to https://therichgradstudent.sanity.studio/
- Click the **Presentation** tab
- It will load your production site for visual editing
- No CORS issues because both are on HTTPS

### Why Local Preview Doesn't Work:

The hosted Sanity Studio (https://therichgradstudent.sanity.studio/) cannot connect to http://localhost:3000 due to:

- Mixed content (HTTPS → HTTP)
- CORS restrictions
- Browser security policies

### For Local Development:

Use http://localhost:3333 (local Sanity Studio) to preview with http://localhost:3000

### Current Setup:

✅ Preview tool configured with environment variable
✅ CORS headers allow all origins for development
✅ Draft mode API routes ready
✅ Will work perfectly when both are deployed to production
