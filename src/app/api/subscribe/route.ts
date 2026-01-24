import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { client } from '@/lib/sanity'

const subscribeSchema = z.object({
    email: z.string().email(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

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
        const existing = await client.fetch(
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
        await client.create({
            _type: 'subscriber',
            email,
            status: 'active',
            subscribedAt: new Date().toISOString(),
            source: 'website'
        })

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
