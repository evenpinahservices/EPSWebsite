# Backend Integration Guide for Booking/Contact Feature

## Current Status
The booking and contact forms are currently front-end only with placeholder functionality. They collect user input but don't actually send emails or create calendar events yet.

## Implementation Options

### Option 1: Calendar Integration (Recommended)

#### Calendly Integration (Easiest)
1. Sign up for a free Calendly account
2. Create an event type (e.g., "30-minute consultation")
3. Get your Calendly link
4. Replace the calendar form with an embedded Calendly widget:

```tsx
// In components/Booking.tsx
import { InlineWidget } from "react-calendly";

// Replace CalendarBooking component with:
<InlineWidget 
  url="https://calendly.com/your-username/consultation"
  styles={{ height: '630px' }}
/>
```

**Install:** `npm install react-calendly`

#### Google Calendar API
1. Set up Google Cloud Project
2. Enable Calendar API
3. Create OAuth credentials
4. Use libraries like `googleapis` or `@react-oauth/google`
5. Create API route in Next.js to handle calendar creation

### Option 2: Email Integration

#### Resend (Recommended for Next.js)
1. Sign up at resend.com
2. Get API key
3. Create API route: `app/api/contact/route.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();
  
  await resend.emails.send({
    from: 'contact@evenpinah.com',
    to: 'natanel@evenpinah.com',
    subject: subject,
    html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
  });
  
  return Response.json({ success: true });
}
```

**Install:** `npm install resend`

#### SendGrid Alternative
Similar setup but using SendGrid's API instead.

### Option 3: Combined Solution

1. **For Calendar Bookings:**
   - Use Calendly (easiest) OR
   - Google Calendar API with webhook notifications

2. **For Email Contact:**
   - Resend API route
   - Auto-responder when meeting is scheduled

3. **Auto-Email on Booking:**
   - If using Calendly: Set up Zapier/Make.com automation
   - If using Google Calendar: Use Calendar API webhooks + Resend

## Recommended Stack

**Quick Setup (1-2 hours):**
- Calendly widget for bookings
- Resend for email contact form
- Zapier for auto-email on booking

**Full Custom (1-2 days):**
- Google Calendar API
- Resend for emails
- Next.js API routes
- Database (optional) for storing submissions

## Environment Variables Needed

Create `.env.local`:
```
RESEND_API_KEY=re_xxxxx
GOOGLE_CLIENT_ID=xxxxx (if using Google Calendar)
GOOGLE_CLIENT_SECRET=xxxxx
CALENDLY_API_KEY=xxxxx (if using Calendly API)
```

## Next Steps

1. Choose your preferred calendar solution (Calendly recommended for speed)
2. Set up email service (Resend recommended)
3. Create API routes in `app/api/` directory
4. Update form handlers in `components/Booking.tsx` to call your API routes
5. Test end-to-end flow

## Current Form Structure

The forms are ready to integrate - they collect:
- **Calendar:** name, email, date, time, message
- **Email:** name, email, subject, message

All fields are validated and ready to send to your backend.

