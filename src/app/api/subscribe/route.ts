import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getClient } from '@/lib/sanity'
import { sendEmail } from '@/lib/resend'

const subscribeSchema = z.object({
    email: z.string().email(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const writeClient = getClient()

        // Validate email format
        const result = subscribeSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            )
        }

        const { email } = result.data

        // 1. Check if already exists
        const existing = await writeClient.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email }
        )

        if (existing) {
            // Already subscribed, just return success to avoid leaking info
            return NextResponse.json(
                { message: 'Successfully subscribed' },
                { status: 200 }
            )
        }

        // 2. Create new subscriber in Sanity
        const newSubscriber = await writeClient.create({
            _type: 'subscriber',
            email,
            status: 'active',
            subscribedAt: new Date().toISOString(),
            source: 'website'
        })

        // 3. Send Welcome Email
        try {
            const unsubscribeUrl = `https://therichgradstudent.com/unsubscribe?id=${newSubscriber._id}`

            await sendEmail({
                to: [email],
                subject: 'Welcome to The Rich Grad Student',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #065f46;">Welcome to the Club!</h1>
                        <p style="font-size: 16px; color: #333; line-height: 1.6;">
                            Thanks for subscribing to <strong>The Rich Grad Student</strong>. You're now on the list to receive our best credit card deals and travel hacks.
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
        } catch (emailError) {
            // Log but don't fail the request since subscription succeeded
            console.error('Failed to send welcome email:', emailError)
        }

        return NextResponse.json(
            { message: 'Successfully subscribed' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Subscription error:', error)
        return NextResponse.json(
            { error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
        )
    }
}
