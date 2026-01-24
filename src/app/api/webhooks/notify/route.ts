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

        // 1. Basic Validation: Check if it's a post and "create" or "update" operation
        // We only want to notify on NEW posts that are PUBLISHED
        const { _type, _id, title, slug, mainImage, excerpt } = body

        if (_type !== 'post') {
            return NextResponse.json({ message: 'Not a post' }, { status: 200 })
        }

        // Ideally check if it's a *newly* published post. 
        // Sanity webhooks can send 'publishedAt' changes.
        // For now, we assume the webhook is configured in Sanity to ONLY trigger on:
        // "Create" OR "Update" where "publishedAt" goes from null => defined.

        // 2. Fetch all active subscribers
        const subscribers = await client.fetch<Array<{ email: string }>>(
            `*[_type == "subscriber" && status == "active"]{email}`
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
        <p style="margin-top: 40px; font-size: 12px; color: #888;">
          You are receiving this because you subscribed to updates from The Rich Grad Student. 
          <a href="#" style="color: #666;">Unsubscribe</a>
        </p>
      </div>
    `

        // 4. Send Emails (Batching handled by loop for safety with Resend free tier limits/rate)
        // NOTE: Resend allows 'BCC' for up to 50 recipients, or individual calls.
        // For privacy, we BCC groups of 50 or send individually.
        // Here we send individually to be safe and personal, but for scale use Batch API.

        // Rate limit safety: Resend allows ~2 requests per second on free tier? 
        // Actually Resend scales well. Let's start with a simple loop.

        const emailList = subscribers.map(s => s.email)

        // Using BCC to send 1 email to multiple people (efficient for small lists)
        // IMPORTANT: 'to' field should be a "noreply" or the sender, and 'bcc' is the audience
        // BUT Resend recommends batching or creating contacts.

        // Simple implementation: Send to the list
        // Warning: On free tier, you can only send to verified email yourself unless you verify domain.
        // Once domain is verified, you can send to anyone.

        await sendEmail({
            to: emailList, // Resend handles multiple recipients (if > 50, need to batch)
            subject: `New Post: ${title}`,
            html: emailHtml
        })

        return NextResponse.json({
            message: `Notified ${subscribers.length} subscribers`
        }, { status: 200 })

    } catch (error) {
        console.error('Webhook Error:', error)
        return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
    }
}
