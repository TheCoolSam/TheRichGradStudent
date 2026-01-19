# Sanity Preview Mode Setup

## ✅ Configuration Complete!

### What's Been Set Up:

1. **Draft Mode API Routes**
   - `/api/draft` - Enable preview mode
   - `/api/disable-draft` - Exit preview mode

2. **Sanity Presentation Tool**
   - Added to Sanity Studio at https://therichgradstudent.sanity.studio/
   - Configured with preview URLs for Blog Posts, Articles, and Credit Cards
   - Supports Desktop, Mobile, and Tablet viewports

3. **Draft Mode Fetching**
   - Updated `src/lib/sanity.ts` with `getClient()` function
   - Automatically switches to `perspective: 'previewDrafts'` when draft mode is active
   - Falls back to published content when draft mode is disabled

### 🔐 Required Setup:

**Update your `.env.local` file with:**

```env
SANITY_PREVIEW_SECRET=your-random-secret-token-here
SANITY_API_TOKEN=your-sanity-read-token-here
```

**To get your SANITY_API_TOKEN:**

1. Go to https://www.sanity.io/manage/personal/tokens
2. Create a new token with "Viewer" permissions
3. Copy the token and add it to `.env.local`

**Generate a random secret for SANITY_PREVIEW_SECRET:**

- Use any random string (e.g., run `openssl rand -base64 32` in terminal)

### 🎨 How to Use Preview Mode:

**Option 1: From Sanity Studio (Recommended)**

1. Go to https://therichgradstudent.sanity.studio/
2. Click the **"Presentation"** tab at the top
3. You'll see your Next.js site in a preview pane
4. Edit any content - changes appear in real-time!
5. Toggle viewport sizes: Desktop/Mobile/Tablet

**Option 2: Manual URL**
Visit: `http://localhost:3000/api/draft?secret=your-secret&slug=/blog/post-slug`

**To Exit Preview Mode:**
Click "Exit Preview" in the yellow banner, or visit:
`http://localhost:3000/api/disable-draft`

### 📝 Using in Your Code:

Replace old client usage:

```typescript
// OLD
import { client } from '@/lib/sanity'
const posts = await client.fetch(...)
```

With new draft-aware client:

```typescript
// NEW
import { getClient } from '@/lib/sanity'
const client = await getClient()
const posts = await client.fetch(...)
```

See `src/lib/sanity-examples.ts` for complete examples!

### 🚀 For Production:

When deploying, update `sanity.config.ts` with your production URL:

```typescript
previewUrl: {
  origin: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000',
  draftMode: {
    enable: '/api/draft',
  },
},
```
