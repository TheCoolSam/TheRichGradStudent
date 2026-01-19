/**
 * Example: How to use the getClient function with draft mode
 * 
 * In your page.tsx or any server component:
 */

// Example 1: Simple fetch with draft mode support
import { getClient } from '@/lib/sanity'

async function getBlogPosts() {
  const client = await getClient()
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author->{name},
      publishedAt
    }
  `)
  return posts
}

// Example 2: Single post with draft mode
async function getPost(slug: string) {
  const client = await getClient()
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      body,
      author->{name, image},
      publishedAt,
      categories,
      tags[]->
    }
  `, { slug })
  return post
}

// Example 3: Credit cards with draft mode
async function getCreditCards() {
  const client = await getClient()
  const cards = await client.fetch(`
    *[_type == "creditCard"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      issuer,
      annualFee,
      signupBonus,
      categories,
      tags[]->
    }
  `)
  return cards
}

/**
 * To enable preview mode from Sanity Studio:
 * 
 * 1. Go to https://therichgradstudent.sanity.studio/
 * 2. Click on the "Presentation" tab (new tab added)
 * 3. You'll see your Next.js site in an iframe
 * 4. Edit content in the studio - changes appear in real-time!
 * 5. Toggle between Desktop/Mobile/Tablet views
 * 
 * To manually enable preview:
 * Visit: http://localhost:3000/api/draft?secret=your-secret-preview-token-here&slug=/blog/your-post-slug
 * 
 * To disable preview:
 * Visit: http://localhost:3000/api/disable-draft
 */

export { getBlogPosts, getPost, getCreditCards }
