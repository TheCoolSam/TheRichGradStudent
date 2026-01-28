import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { id } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Missing subscriber ID' },
                { status: 400 }
            )
        }

        const client = getClient() // Use authenticated client for write access

        // Update subscriber status to 'unsubscribed'
        // We use patch to avoid overwriting other fields
        await client
            .patch(id)
            .set({ status: 'unsubscribed', unsubscribedAt: new Date().toISOString() })
            .commit()

        return NextResponse.json(
            { message: 'Successfully unsubscribed' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Unsubscribe error:', error)
        return NextResponse.json(
            { error: 'Failed to unsubscribe' },
            { status: 500 }
        )
    }
}
