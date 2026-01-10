import { NextRequest, NextResponse } from 'next/server'
import { getCalendarClient, getGmailClient } from '@/lib/google-auth'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { name, email, date, time, message } = await request.json()

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Block Friday (5) and Saturday (6)
    const selectedDateObj = new Date(date + 'T12:00:00')
    const dayOfWeek = selectedDateObj.getDay()
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return NextResponse.json(
        { error: 'Bookings are not available on Friday or Saturday' },
        { status: 400 }
      )
    }

    // Parse time (e.g., "2:00 PM" -> 14:00)
    const timeMatch = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!timeMatch) {
      return NextResponse.json(
        { error: 'Invalid time format' },
        { status: 400 }
      )
    }

    let hour = parseInt(timeMatch[1])
    const minute = parseInt(timeMatch[2])
    const period = timeMatch[3].toUpperCase()

    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0

    // Create start and end times
    const startDateTime = new Date(`${date}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`)
    const endDateTime = new Date(startDateTime)
    endDateTime.setHours(endDateTime.getHours() + 1) // 1 hour meeting

    const calendar = await getCalendarClient()

    // Format date for description
    const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    // Build description with all form information
    const eventDescription = `Even Pinah Discovery Meeting

Client Information:
- Name: ${name}
- Email: ${email}
- Date: ${formattedDate}
- Time: ${time}
- Duration: 1 hour

${message ? `Client Message:\n${message}` : ''}`

    // Create calendar event
    const event = {
      summary: 'Even Pinah Discovery Meeting',
      description: eventDescription,
      colorId: '1', // Lavender color
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [
        { email: 'evenpinahservices@gmail.com' },
        { email: email },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 15 }, // 15 minutes before
        ],
      },
    }

    const createdEvent = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all', // Send invitations to attendees
    })

    // Send confirmation email
    const gmail = await getGmailClient()
    
    const emailContent = `
From: Even Pinah Services <evenpinahservices@gmail.com>
To: ${name} <${email}>
Subject: Meeting Confirmed - Consultation Scheduled

Hi ${name},

Your consultation meeting has been successfully scheduled!

Meeting Details:
- Date: ${new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${time}
- Duration: 1 hour

${createdEvent.data.htmlLink ? `Calendar Link: ${createdEvent.data.htmlLink}` : ''}

${message ? `Your message: ${message}` : ''}

Looking forward to speaking with you!

Best regards,
Even Pinah Services
    `.trim()

    const encodedMessage = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Meeting scheduled successfully',
      eventId: createdEvent.data.id,
      eventLink: createdEvent.data.htmlLink
    })
  } catch (error) {
    console.error('Error creating meeting:', error)
    return NextResponse.json(
      { error: 'Failed to create meeting', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

