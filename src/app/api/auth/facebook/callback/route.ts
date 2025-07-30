// src/app/api/auth/facebook/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9000';

  if (!code) {
    // User denied the login or an error occurred
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    console.error(`Facebook login error: ${error} - ${errorDescription}`);
    // Redirect to a page with an error message
    return NextResponse.redirect(`${siteUrl}/?error=facebook_login_failed`);
  }

  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectUri = `${siteUrl}/api/auth/facebook/callback`;

  if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Facebook App credentials are not configured.' }, { status: 500 });
  }

  // Exchange code for an access token
  const tokenUrl = new URL('https://graph.facebook.com/v20.0/oauth/access_token');
  tokenUrl.searchParams.set('client_id', clientId);
  tokenUrl.searchParams.set('redirect_uri', redirectUri);
  tokenUrl.searchParams.set('client_secret', clientSecret);
  tokenUrl.searchParams.set('code', code);
  
  try {
    const tokenResponse = await fetch(tokenUrl.toString());
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        console.error('Facebook token exchange error:', tokenData.error);
        return NextResponse.redirect(`${siteUrl}/?error=token_exchange_failed`);
    }

    const accessToken = tokenData.access_token;
    
    // TODO: In a real app, you would now:
    // 1. Save the access token securely, associated with the user.
    // 2. Fetch user's pages, find the one with the Instagram account.
    // 3. Store the page access token and Instagram Business Account ID.
    // 4. Create a session for the user (e.g., using a JWT cookie).
    
    console.log("Successfully received access token:", accessToken);

    // For now, just redirect to the homepage with a success message
    return NextResponse.redirect(`${siteUrl}/?success=facebook_login_complete`);

  } catch (error) {
    console.error('Callback handler error:', error);
    return NextResponse.redirect(`${siteUrl}/?error=internal_server_error`);
  }
}
