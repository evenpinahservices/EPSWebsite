import { NextRequest, NextResponse } from 'next/server'
import { getCalendarClient } from '@/lib/google-auth'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

/**
 * Get available time slots for a given date
 * Excludes times that are already booked
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    const calendar = await getCalendarClient()

    // Parse the date and check day of week (0 = Sunday, 6 = Saturday)
    const selectedDateObj = new Date(date + 'T12:00:00') // Use noon to avoid timezone issues
    const dayOfWeek = selectedDateObj.getDay()

    // Block Friday (5) and Saturday (6)
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return NextResponse.json({ 
        availableSlots: [],
        date,
        error: 'Bookings are not available on Friday or Saturday'
      })
    }

    // Define working hours: 8am-2pm and 7pm-10pm (Sunday-Thursday only)
    const morningSlots = { start: 8, end: 14 } // 8am to 2pm
    const eveningSlots = { start: 19, end: 22 } // 7pm to 10pm

    // Get all events for the selected date
    // Use UTC to avoid timezone issues
    const startOfDay = new Date(date + 'T00:00:00Z')
    const endOfDay = new Date(date + 'T23:59:59Z')

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 250, // Limit results for performance
      fields: 'items(id,start,end)', // Only fetch needed fields
    })

    // Check if a time slot overlaps with any event
    const isSlotAvailable = (slotHour: number): boolean => {
      const slotStart = new Date(date)
      slotStart.setHours(slotHour, 0, 0, 0)
      const slotEnd = new Date(slotStart)
      slotEnd.setHours(slotHour + 1, 0, 0, 0) // 1 hour meeting

      if (!response.data.items) return true

      // Check if slot overlaps with any existing event
      return !response.data.items.some((event) => {
        if (!event.start?.dateTime || !event.end?.dateTime) return false
        
        const eventStart = new Date(event.start.dateTime)
        const eventEnd = new Date(event.end.dateTime)
        
        // Check for overlap: slot starts before event ends AND slot ends after event starts
        return slotStart < eventEnd && slotEnd > eventStart
      })
    }

    // Generate time slots: 8am-2pm and 7pm-10pm
    const allSlots: string[] = []
    
    // Morning slots: 8am to 2pm
    for (let hour = morningSlots.start; hour < morningSlots.end; hour++) {
      if (isSlotAvailable(hour)) {
        // Format for display
        const displayTime = hour >= 12 
          ? `${hour === 12 ? 12 : hour - 12}:00 PM`
          : `${hour === 0 ? 12 : hour}:00 AM`
        allSlots.push(displayTime)
      }
    }
    
    // Evening slots: 7pm to 10pm
    for (let hour = eveningSlots.start; hour < eveningSlots.end; hour++) {
      if (isSlotAvailable(hour)) {
        // Format for display
        const displayTime = hour >= 12 
          ? `${hour === 12 ? 12 : hour - 12}:00 PM`
          : `${hour === 0 ? 12 : hour}:00 AM`
        allSlots.push(displayTime)
      }
    }

    return NextResponse.json({ 
      availableSlots: allSlots,
      date 
    })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch available slots', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

