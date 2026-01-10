import { NextRequest, NextResponse } from 'next/server'

/**
 * OAuth callback handler for getting the authorization code
 * This is used during the initial OAuth setup to get the refresh token
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Error</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .error {
              background: #fee;
              border: 1px solid #fcc;
              padding: 20px;
              border-radius: 5px;
              color: #c33;
            }
          </style>
        </head>
        <body>
          <div class="error">
            <h2>Authorization Error</h2>
            <p>Error: ${error}</p>
            <p>Please try again or check your Google OAuth settings.</p>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  if (code) {
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .success {
              background: #efe;
              border: 1px solid #cfc;
              padding: 20px;
              border-radius: 5px;
              color: #3c3;
            }
            .code {
              background: #fff;
              padding: 15px;
              border: 2px solid #3c3;
              border-radius: 5px;
              font-family: monospace;
              font-size: 14px;
              word-break: break-all;
              margin: 10px 0;
            }
            .instructions {
              margin-top: 20px;
              padding: 15px;
              background: #fff;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="success">
            <h2>✅ Authorization Successful!</h2>
            <p>Copy the code below and paste it into your terminal:</p>
            <div class="code">${code}</div>
            <div class="instructions">
              <strong>Next steps:</strong>
              <ol>
                <li>Copy the code above</li>
                <li>Go back to your terminal where the script is running</li>
                <li>Paste the code when prompted</li>
                <li>You'll receive your refresh token</li>
              </ol>
            </div>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>OAuth Callback</title>
      </head>
      <body>
        <p>No code or error received. Please try again.</p>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' },
  })
}

