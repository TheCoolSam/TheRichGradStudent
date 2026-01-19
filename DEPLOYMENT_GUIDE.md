# Deployment Guide - Hostinger Cloud Startup

This guide walks you through deploying **The Rich Grad Student** to Hostinger with GitHub auto-deployment.

## 📋 Prerequisites

- [x] Hostinger Cloud Startup account (Managed Node.js)
- [x] GitHub account
- [x] Sanity.io project set up
- [x] Domain name (optional but recommended)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):

```bash
cd TheRichGradStudent
git init
```

2. **Create `.gitignore`** (already created):

```
node_modules/
.next/
.env
.env*.local
```

3. **Stage and commit all files**:

```bash
git add .
git commit -m "Initial commit: The Rich Grad Student"
```

4. **Create GitHub repository**:
   - Go to [github.com](https://github.com) → New Repository
   - Name: `the-rich-grad-student`
   - Make it Private (recommended for client work)
   - Don't initialize with README (we already have one)

5. **Push to GitHub**:

```bash
git remote add origin https://github.com/YOUR_USERNAME/the-rich-grad-student.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Sanity.io

1. **Create Sanity project**:

```bash
npm create sanity@latest
```

2. **Copy schemas**:
   - Copy all files from `sanity/schemas/` to your Sanity project
   - Import them in your `sanity.config.ts`

3. **Deploy Sanity Studio**:

```bash
sanity deploy
```

4. **Get your credentials**:
   - Project ID: Found in Sanity dashboard
   - Dataset: Usually `production`
   - Keep these handy for Hostinger environment variables

5. **Add sample content**:
   - Create the two authors (Karan, Giorgio)
   - Add at least one test blog post
   - Add at least one test credit card review

### Step 3: Configure Hostinger

#### 3.1 Access Hostinger Control Panel

1. Log in to [Hostinger](https://www.hostinger.com)
2. Go to **Hosting** → Select your Cloud Startup plan
3. Navigate to **Git Deployment** or **Node.js** section

#### 3.2 Connect GitHub Repository

1. Click **Connect Repository** or **New Application**
2. Authorize GitHub access
3. Select your repository: `the-rich-grad-student`
4. Branch: `main`
5. Build command: `npm run build`
6. Start command: `npm start`
7. Node version: **18.x** or **20.x** (Next.js 14 compatible)

#### 3.3 Set Environment Variables

In Hostinger's environment variables section, add:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-18
NODE_ENV=production
```

**Important:** Replace `your_actual_project_id` with your real Sanity project ID!

#### 3.4 Configure Domain (Optional)

1. Go to **Domains** in Hostinger
2. Point your domain to the Node.js application
3. Enable SSL certificate (free with Hostinger)

### Step 4: Deploy!

1. Click **Deploy** or **Start Deployment**
2. Hostinger will:
   - Clone your repository
   - Run `npm install`
   - Run `npm run build`
   - Start the application with `npm start`

3. Watch the build logs for any errors

4. Once complete, visit your deployed URL!

### Step 5: Set Up Auto-Deployment

1. In Hostinger Git settings, enable **Auto Deploy on Push**
2. Now every push to `main` branch automatically deploys

**Workflow:**

```
Make changes locally
        ↓
git add .
git commit -m "Update XYZ"
git push origin main
        ↓
Hostinger detects push
        ↓
Automatic rebuild & deploy
        ↓
Site updated! 🎉
```

## 🔧 Post-Deployment Configuration

### Update Donation Button

Edit [src/components/DonationButton.tsx](src/components/DonationButton.tsx):

```tsx
href = "https://donate.stripe.com/your-actual-stripe-link";
```

Replace with your real Stripe Payment Link.

### CORS Configuration for Sanity

If you encounter CORS issues:

1. Go to Sanity.io dashboard
2. Navigate to **API** → **CORS Origins**
3. Add your Hostinger domain:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`
4. Save

### Add Sanity Webhooks (Optional)

For real-time updates when content changes:

1. In Sanity dashboard → **API** → **Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/revalidate`
3. Enable for `create`, `update`, `delete` events

(Note: You'll need to create a revalidation API route for this to work)

## 🐛 Troubleshooting

### Build Fails: "Module not found"

**Solution:** Check that all dependencies are in `package.json`, not `devDependencies`:

```bash
npm install next react react-dom framer-motion @sanity/client @sanity/image-url @portabletext/react next-sanity --save
```

### Images Not Loading

**Solution:** Verify Sanity domain in [next.config.js](next.config.js):

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
}
```

### Environment Variables Not Working

**Solution:**

- Double-check spelling in Hostinger dashboard
- Variables must start with `NEXT_PUBLIC_` to be accessible in browser
- Rebuild application after adding/changing variables

### Port Already in Use

**Solution:** Hostinger automatically assigns ports. You don't need to specify one in `package.json`.

### Build Takes Too Long / Times Out

**Solution:**

- Optimize images before uploading to Sanity
- Remove unused dependencies
- Consider upgrading Hostinger plan if needed

## 📊 Monitoring & Maintenance

### Check Application Logs

In Hostinger:

- Go to **Logs** section
- View real-time application logs
- Check for errors or warnings

### Monitor Performance

Use these tools:

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Hostinger's built-in analytics

### Update Dependencies

Monthly maintenance:

```bash
npm outdated                    # Check for updates
npm update                      # Update minor versions
npm install package@latest      # Update specific major versions
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```

## 🔄 Rollback Procedure

If a deployment breaks the site:

1. **Quick Fix:**
   - In Hostinger, select previous successful deployment
   - Click **Rollback**

2. **Git Revert:**

```bash
git revert HEAD
git push origin main
```

## 🚦 Pre-Deployment Checklist

Before each major deployment:

- [ ] Test locally with `npm run build` && `npm start`
- [ ] Check all images load correctly
- [ ] Test Sanity content fetching
- [ ] Verify all links work
- [ ] Test mobile responsiveness
- [ ] Update README if needed
- [ ] Commit with clear message
- [ ] Push to GitHub
- [ ] Monitor Hostinger build logs
- [ ] Test deployed site thoroughly

## 📱 SSL & Security

### Force HTTPS

Add to [next.config.js](next.config.js):

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        }
      ]
    }
  ]
}
```

### Security Headers

Consider adding security headers for production in `next.config.js`.

## 🎯 Performance Optimization

### Enable Next.js Image Optimization

Already configured! Next.js automatically optimizes images.

### Enable Gzip/Brotli Compression

Hostinger handles this automatically.

### Caching Strategy

Next.js handles caching. For additional CDN caching, consider Cloudflare (free tier available).

## 💡 Pro Tips

1. **Use Git Tags for Releases:**

```bash
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

2. **Create Staging Branch:**

```bash
git checkout -b staging
# Set up separate Hostinger deployment for staging
```

3. **Backup Sanity Content:**

```bash
sanity dataset export production backup.tar.gz
```

4. **Monitor Uptime:**
   - Use [UptimeRobot](https://uptimerobot.com/) (free)
   - Get alerts if site goes down

## 📞 Support Resources

- **Hostinger Support:** 24/7 live chat
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity Docs:** [sanity.io/docs](https://www.sanity.io/docs)
- **Framer Motion:** [framer.com/motion](https://www.framer.com/motion/)

---

## ✅ Deployment Complete!

Once deployed, your site is live at:

- **Hostinger URL:** `https://your-subdomain.hostinger.site`
- **Custom Domain:** `https://yourdomain.com` (if configured)

Share the URL and start helping grad students master the credit card game! 🎓💳✨
