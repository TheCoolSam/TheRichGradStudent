import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
    try {
        const posts = await client.fetch(`
      *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        "authorName": author->name
      }[0...20]
    `)

        const siteUrl = 'https://therichgradstudent.com'
        const feedItems = posts.map((post: any) => {
            const url = `${siteUrl}/${post.slug.current}`
            const date = new Date(post.publishedAt).toUTCString()

            // Generate image URL with fixed dimensions for consistent email display
            let mediaContent = ''
            if (post.mainImage) {
                const imageUrl = urlFor(post.mainImage).width(600).height(300).url()
                mediaContent = `<media:content url="${imageUrl}" medium="image" />`
            }

            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      ${mediaContent}
      <dc:creator><![CDATA[${post.authorName || 'The Rich Grad Student'}]]></dc:creator>
    </item>`
        }).join('')

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>The Rich Grad Student</title>
    <link>${siteUrl}</link>
    <description>Millionaire Style Travel, GRAD STUDENT BUDGET</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${feedItems}
  </channel>
</rss>`

        return new Response(rss, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
            },
        })
    } catch (error) {
        console.error('Error generating RSS feed:', error)
        return new Response('Error generating feed', { status: 500 })
    }
}
