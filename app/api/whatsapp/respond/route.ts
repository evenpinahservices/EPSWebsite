import { NextRequest, NextResponse } from 'next/server'

const MESSAGES: Record<'accept' | 'decline', string> = {
  accept: 'Order confirmed! Please wait.',
  decline: 'Order declined :( Please contact us directly.',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const decision = body?.decision as string | undefined

    if (decision !== 'accept' && decision !== 'decline') {
      return NextResponse.json(
        { success: false, message: 'Invalid decision' },
        { status: 400 }
      )
    }

    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
    // The client may pass recipientPhoneNumber, but for this demo the server always
    // sends to the hardcoded test number so the endpoint can't be used to message
    // arbitrary numbers.
    const recipientPhoneNumber = process.env.DEMO_RECIPIENT_NUMBER

    if (!accessToken || !phoneNumberId || !recipientPhoneNumber) {
      console.error(
        'Missing WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, or DEMO_RECIPIENT_NUMBER env vars'
      )
      return NextResponse.json(
        { success: false, message: 'WhatsApp integration is not configured' },
        { status: 500 }
      )
    }

    const metaResponse = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipientPhoneNumber,
          type: 'text',
          text: { body: MESSAGES[decision] },
        }),
      }
    )

    const metaData = await metaResponse.json()

    if (!metaResponse.ok) {
      console.error('WhatsApp API error:', metaData)
      return NextResponse.json(
        { success: false, message: metaData?.error?.message || 'Failed to send WhatsApp message' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: 'WhatsApp message sent' }, { status: 200 })
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    return NextResponse.json(
      { success: false, message: 'Unexpected error sending WhatsApp message' },
      { status: 500 }
    )
  }
}
