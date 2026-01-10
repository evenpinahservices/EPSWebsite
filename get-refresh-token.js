require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');
const readline = require('readline');

// Replace these with your actual Client ID and Client Secret from Google Cloud Console
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET_HERE';
// Use localhost for development/testing (must be added to Google OAuth client authorized redirect URIs)
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const scopes = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/calendar'
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent', // Force consent screen to get refresh token
});

console.log('\n========================================');
console.log('Google OAuth Setup');
console.log('========================================\n');
console.log('1. Authorize this app by visiting this URL:');
console.log('\n' + authUrl + '\n');
console.log('2. After authorizing, you will be redirected.');
console.log('3. Copy the "code" parameter from the redirect URL in your browser.');
console.log('   Look at the address bar - it will look like:');
console.log('   http://localhost:3000/api/auth/callback?code=4/0A...');
console.log('   OR if the page doesn\'t load, just copy the code from the URL address bar.\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from the redirect URL here: ', (code) => {
  rl.close();
  
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error('\n❌ Error retrieving access token:', err.message);
      console.log('\nMake sure:');
      console.log('- You copied the entire code from the URL');
      console.log('- Your Client ID and Secret are correct');
      console.log('- The redirect URI matches: ' + REDIRECT_URI);
      process.exit(1);
    }
    
    console.log('\n✅ Success! Here are your tokens:\n');
    console.log('========================================');
    console.log('REFRESH TOKEN (Save this in .env.local):');
    console.log('========================================');
    console.log(token.refresh_token || '⚠️  No refresh token found. Make sure you included prompt: "consent" in the auth URL.');
    console.log('\n========================================');
    console.log('ACCESS TOKEN (Temporary, expires soon):');
    console.log('========================================');
    console.log(token.access_token);
    console.log('\n========================================\n');
    
    if (token.refresh_token) {
      console.log('✅ Copy the REFRESH TOKEN above and add it to your .env.local file:');
      console.log('   GOOGLE_REFRESH_TOKEN=' + token.refresh_token);
      console.log('\n✅ You can now use the booking features!\n');
    } else {
      console.log('⚠️  No refresh token was provided.');
      console.log('   This might happen if you\'ve already authorized the app before.');
      console.log('   Try revoking access at: https://myaccount.google.com/permissions');
      console.log('   Then run this script again.\n');
    }
    
    process.exit(0);
  });
});

