import { NextRequest, NextResponse } from 'next/server'
import { getGmailClient } from '@/lib/google-auth'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const gmail = await getGmailClient()

    // Create email message
    const emailContent = `
From: ${name} <${email}>
To: Even Pinah Services <evenpinahservices@gmail.com>
Subject: ${subject}

${message}

---
Sent from the Even Pinah Services contact form
    `.trim()

    // Encode message in base64url format
    const encodedMessage = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    // Send email
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    })

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

