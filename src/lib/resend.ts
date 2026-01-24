import { Resend } from 'resend'

// Initialize Resend only if key exists, or use a dummy to prevent build crash
// The actual sendEmail function checks for the key before sending
const resend = new Resend(process.env.RESEND_API_KEY || 're_123_build_placeholder')

interface SendEmailParams {
    to: string[]
    subject: string
    html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is missing. Email not sent.')
        return { success: false, error: 'Missing API Key' }
    }

    try {
        // NOTE: Until you verify 'therichgradstudent.com' on Resend, 
        // you must use 'onboarding@resend.dev' and can ONLY send to yourself ('sbotshtein1@gmail.com')
        const fromEmail = 'onboarding@resend.dev'
        // Once verified, change to: 'The Rich Grad Student <updates@therichgradstudent.com>'

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
