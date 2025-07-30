// src/app/api/auth/facebook/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  if (!clientId || !siteUrl) {
    return NextResponse.json({ error: 'Facebook App credentials are not configured.' }, { status: 500 });
  }

  const redirectUri = `${siteUrl}/api/auth/facebook/callback`;
  
  // Scopes required for getting Instagram business account and managing messages
  const scope = 'pages_show_list,pages_messaging,instagram_basic,instagram_manage_messages';

  const loginUrl = new URL('https://www.facebook.com/v20.0/dialog/oauth');
  loginUrl.searchParams.set('client_id', clientId);
  loginUrl.searchParams.set('redirect_uri', redirectUri);
  loginUrl.searchParams.set('response_type', 'code');
  loginUrl.searchParams.set('scope', scope);
  loginUrl.searchParams.set('config_id', process.env.FACEBOOK_CONFIG_ID || ''); // Optional: For specific configurations

  return NextResponse.redirect(loginUrl.toString());
}
