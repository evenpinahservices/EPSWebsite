import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { gmail_v1 } from 'googleapis/build/src/apis/gmail/v1'
import { calendar_v3 } from 'googleapis/build/src/apis/calendar/v3'

// Cache OAuth clients to avoid recreating them on every request
let cachedGmailOAuth2Client: OAuth2Client | null = null
let cachedCalendarOAuth2Client: OAuth2Client | null = null
let gmailClient: gmail_v1.Gmail | null = null
let calendarClient: calendar_v3.Calendar | null = null

/**
 * Get or create cached OAuth2 client for Gmail
 * Uses GOOGLE_GMAIL_REFRESH_TOKEN if set, otherwise falls back to GOOGLE_REFRESH_TOKEN
 */
function getGmailOAuth2Client() {
  if (!cachedGmailOAuth2Client) {
    cachedGmailOAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    // Use Gmail-specific refresh token if provided, otherwise use default
    const refreshToken = process.env.GOOGLE_GMAIL_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN
    
    cachedGmailOAuth2Client.setCredentials({
      refresh_token: refreshToken,
    })
    
    // Pre-fetch access token to avoid delay on first request
    cachedGmailOAuth2Client.getAccessToken().catch(() => {
      // Ignore errors during pre-fetch, will refresh when needed
    })
  }
  return cachedGmailOAuth2Client
}

/**
 * Get or create cached OAuth2 client for Calendar
 * Uses GOOGLE_CALENDAR_REFRESH_TOKEN if set, otherwise falls back to GOOGLE_REFRESH_TOKEN
 */
function getCalendarOAuth2Client() {
  if (!cachedCalendarOAuth2Client) {
    cachedCalendarOAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    // Use Calendar-specific refresh token if provided, otherwise use default
    const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN
    
    cachedCalendarOAuth2Client.setCredentials({
      refresh_token: refreshToken,
    })
    
    // Pre-fetch access token to avoid delay on first request
    cachedCalendarOAuth2Client.getAccessToken().catch(() => {
      // Ignore errors during pre-fetch, will refresh when needed
    })
  }
  return cachedCalendarOAuth2Client
}

/**
 * Get authenticated Gmail client (cached)
 * Uses the account specified by GOOGLE_GMAIL_REFRESH_TOKEN (or GOOGLE_REFRESH_TOKEN)
 */
export async function getGmailClient() {
  if (!gmailClient) {
    const auth = getGmailOAuth2Client()
    gmailClient = google.gmail({ version: 'v1', auth })
  }
  return gmailClient
}

/**
 * Get authenticated Calendar client (cached)
 * Uses the account specified by GOOGLE_CALENDAR_REFRESH_TOKEN (or GOOGLE_REFRESH_TOKEN)
 */
export async function getCalendarClient() {
  if (!calendarClient) {
    const auth = getCalendarOAuth2Client()
    calendarClient = google.calendar({ version: 'v3', auth })
  }
  return calendarClient
}

