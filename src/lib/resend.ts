import { Resend } from 'resend'

// TEMPORARY: Hardcoded API key since Hostinger doesn't pass env vars at runtime
// TODO: Remove after catch-up emails are sent and switch to Vercel or fix Hostinger env vars
const RESEND_KEY = process.env.RESEND_API_KEY || 're_N8qrnN5u_GqgBX7KzZmoXpgLiZYVN1BJj'
const resend = new Resend(RESEND_KEY)

interface SendEmailParams {
    to: string[]
    subject: string
    html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    // Always have the key now due to hardcoded fallback

    try {
        // Domain verified! Using therichgradstudent.com
        const fromEmail = 'The Rich Grad Student <updates@therichgradstudent.com>'

        const data = await resend.emails.send({
            from: fromEmail,
            to,
            subject,
            html,
        })

        return { success: true, data }
    } catch (error) {
        console.error('Failed to send email:', error)
        return { success: false, error }
    }
}
