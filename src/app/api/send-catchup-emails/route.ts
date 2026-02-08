import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/sanity'
import { sendEmail } from '@/lib/resend'

// This is a one-time endpoint to send welcome emails to existing subscribers
// who signed up before domain verification was complete
// 
// To use: POST /api/send-catchup-emails with header:
// Authorization: Bearer YOUR_SECRET_KEY
//
// Set CATCHUP_EMAIL_SECRET in your .env.local

interface Subscriber {
    _id: string
    email: string
    status: string
    subscribedAt: string
}

export async function POST(request: NextRequest) {
    // Security: Require a secret key to prevent abuse
    const authHeader = request.headers.get('authorization')

    // TEMPORARY: Hardcoded fallback since Hostinger isn't passing env vars to runtime
    // TODO: Remove after catch-up emails are sent
    const expectedSecret = process.env.CATCHUP_EMAIL_SECRET || 'rgs-catchup-welcome-2026'

    if (authHeader !== `Bearer ${expectedSecret}`) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    if (authHeader !== `Bearer ${expectedSecret}`) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    try {
        const client = getClient()

        // Fetch all active subscribers
        const subscribers = await client.fetch<Subscriber[]>(
            `*[_type == "subscriber" && status == "active"]{
                _id,
                email,
                status,
                subscribedAt
            }`
        )

        if (!subscribers || subscribers.length === 0) {
            return NextResponse.json({
                message: 'No active subscribers found',
                sent: 0
            })
        }

        const results = {
            total: subscribers.length,
            sent: 0,
            failed: 0,
            errors: [] as string[]
        }

        // Send emails one by one with a small delay to avoid rate limits
        for (const subscriber of subscribers) {
            try {
                const unsubscribeUrl = `https://therichgradstudent.com/unsubscribe?id=${subscriber._id}`

                const result = await sendEmail({
                    to: [subscriber.email],
                    subject: 'Welcome to The Rich Grad Student! 🎉',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1 style="color: #065f46;">Welcome to the Club!</h1>
                            <p style="font-size: 16px; color: #333; line-height: 1.6;">
                                Thanks for subscribing to <strong>The Rich Grad Student</strong>! You're now on the list to receive our best credit card deals and travel hacks.
                            </p>
                            <p style="font-size: 16px; color: #333; line-height: 1.6;">
                                We only email when there's something truly valuable. In the meantime, check out our latest articles to start maximizing your points.
                            </p>
                            <div style="margin-top: 30px;">
                                <a href="https://therichgradstudent.com" style="background-color: #022c22; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Visit Website</a>
                            </div>
                            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                                <p style="font-size: 12px; color: #888; margin: 0;">
                                    <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe</a>
                                </p>
                            </div>
                        </div>
                    `
                })

                // Check if sendEmail actually succeeded
                if (result.success) {
                    results.sent++
                    console.log(`✅ Sent to: ${subscriber.email}`)
                } else {
                    results.failed++
                    const errorMsg = result.error instanceof Error ? result.error.message : String(result.error)
                    results.errors.push(`${subscriber.email}: ${errorMsg}`)
                    console.error(`❌ Failed for: ${subscriber.email}`, result.error)
                }

                // Small delay to avoid rate limits (Resend free tier: 100/day, 2/second)
                await new Promise(resolve => setTimeout(resolve, 1000))

            } catch (error) {
                results.failed++
                results.errors.push(`${subscriber.email}: ${error instanceof Error ? error.message : 'Unknown error'}`)
                console.error(`❌ Failed for: ${subscriber.email}`, error)
            }
        }

        return NextResponse.json({
            message: 'Catch-up emails completed',
            ...results
        })

    } catch (error) {
        console.error('Catch-up email error:', error)
        return NextResponse.json(
            { error: 'Failed to send catch-up emails' },
            { status: 500 }
        )
    }
}
