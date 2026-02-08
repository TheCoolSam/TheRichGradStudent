import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'
import { sendEmail } from '@/lib/resend'
import { urlFor } from '@/lib/image'

// This secret should be verified to ensure the request is from Sanity
// For simplicity in this demo, we're skipping signature verification but you should add it!
// const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // 1. Basic Validation: Check if it's a post and "create" operation
        // Sanity webhooks include a 'transition' field: 'appear' (create) or 'update'
        const { _type, _id, title, slug, mainImage, excerpt, publishedAt, transition } = body

        console.log(`Webhook received: type=${_type}, transition=${transition}, title="${title}"`)

        if (_type !== 'post') {
            return NextResponse.json({ message: 'Not a post' }, { status: 200 })
        }

        // ONLY notify on new posts ('appear'), NOT updates
        if (transition === 'update') {
            console.log(`Skipping notification: Post "${title}" was updated, not created`)
            return NextResponse.json({ message: 'Skipped: Post was updated, not created' }, { status: 200 })
        }

        // Logic: Prevent spamming subscribers when editing old posts
        // We assume that a "New Post" notification should only happen if the post 
        // claims to be published "recently" (e.g. within the last 2 hours).
        // If 'publishedAt' is missing, or is old, we skip.

        if (!publishedAt) {
            return NextResponse.json({ message: 'Skipped: No publishedAt date' }, { status: 200 })
        }

        const publishedTime = new Date(publishedAt).getTime()
        const now = Date.now()
        // 2 hours window (2 * 60 * 60 * 1000)
        const THRESHOLD = 2 * 60 * 60 * 1000

        // If the post is older than 2 hours, assume it's an edit or cleanup
        if (now - publishedTime > THRESHOLD) {
            console.log(`Skipping notification for old post: "${title}" (Published: ${publishedAt})`)
            return NextResponse.json({ message: 'Skipped: Post is older than 2 hours' }, { status: 200 })
        }

        // Also skip future posts (scheduled) until they are actually live? 
        // Sanity usually manages this by not putting them in the GROQ query, 
        // but the webhook might trigger on the *schedule* change. 
        // For simplicity, we just rely on the 'recent' check.

        // 2. Fetch all active subscribers
        const subscribers = await client.fetch<Array<{ _id: string, email: string }>>(
            `*[_type == "subscriber" && status == "active"]{_id, email}`
        )

        if (subscribers.length === 0) {
            return NextResponse.json({ message: 'No subscribers to notify' }, { status: 200 })
        }

        // 3. Prepare Email Content
        const postUrl = `https://therichgradstudent.com/${slug.current}`
        const imageUrl = mainImage ? urlFor(mainImage).width(600).url() : ''

        const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;" />` : ''}
        <h1 style="color: #065f46;">${title}</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">${excerpt || 'New content is live on The Rich Grad Student!'}</p>
        <div style="margin-top: 30px;">
          <a href="${postUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Read Full Post</a>
        </div>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #888; margin: 0;">
            You are receiving this because you subscribed to updates from The Rich Grad Student. 
            <a href="#" style="color: #666;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `

        // 4. Send Emails Individually
        // We send one by one to:
        // A) Ensure privacy (no 'reply-all' disasters or leaking emails)
        // B) Include a UNIQUE unsubscribe link for each person (using their _id)

        let sentCount = 0
        const errors = []

        for (const subscriber of subscribers) {
            try {
                const unsubscribeUrl = `https://therichgradstudent.com/unsubscribe?id=${subscriber._id}`
                const personalizedHtml = emailHtml.replace(
                    '<a href="#" style="color: #666;">Unsubscribe</a>',
                    `<a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe</a>`
                )

                await sendEmail({
                    to: [subscriber.email],
                    subject: `New Post: ${title}`,
                    html: personalizedHtml
                })
                sentCount++
            } catch (err) {
                console.error(`Failed to notify ${subscriber.email}:`, err)
                errors.push(subscriber.email)
            }
        }

        return NextResponse.json({
            message: `Notified ${sentCount} subscribers. Errors: ${errors.length}`
        }, { status: 200 })

    } catch (error) {
        console.error('Webhook Error:', error)
        return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
    }
}
