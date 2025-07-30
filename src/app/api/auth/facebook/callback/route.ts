// src/app/api/auth/facebook/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import User from '@/models/user';
import connectToDatabase from '@/lib/mongodb';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9000';

  if (!code) {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    console.error(`Facebook login error: ${error} - ${errorDescription}`);
    return NextResponse.redirect(`${siteUrl}/?error=facebook_login_failed`);
  }

  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectUri = `${siteUrl}/api/auth/facebook/callback`;
  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  if (!clientId || !clientSecret || !jwtSecret) {
      console.error("Facebook App credentials or JWT secret are not configured.");
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    // 1. Exchange code for an access token
    const tokenUrl = new URL('https://graph.facebook.com/v20.0/oauth/access_token');
    tokenUrl.searchParams.set('client_id', clientId);
    tokenUrl.searchParams.set('redirect_uri', redirectUri);
    tokenUrl.searchParams.set('client_secret', clientSecret);
    tokenUrl.searchParams.set('code', code);
    
    const tokenResponse = await fetch(tokenUrl.toString());
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        console.error('Facebook token exchange error:', tokenData.error);
        return NextResponse.redirect(`${siteUrl}/?error=token_exchange_failed`);
    }
    const accessToken = tokenData.access_token;

    // 2. Fetch user profile from Facebook
    const profileUrl = new URL('https://graph.facebook.com/me');
    profileUrl.searchParams.set('fields', 'id,name,email,picture.type(large)');
    profileUrl.searchParams.set('access_token', accessToken);

    const profileResponse = await fetch(profileUrl.toString());
    const profileData = await profileResponse.json();

    if (profileData.error) {
        console.error('Facebook profile fetch error:', profileData.error);
        return NextResponse.redirect(`${siteUrl}/?error=profile_fetch_failed`);
    }

    // 3. Save or update user in the database
    await connectToDatabase();
    
    const user = await User.findOneAndUpdate(
        { facebookId: profileData.id },
        {
            name: profileData.name,
            email: profileData.email,
            pictureUrl: profileData.picture.data.url,
            // You might want to encrypt the access token before storing it
            accessToken: accessToken, 
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // 4. Create a JWT session token
    const token = await new SignJWT({ userId: user._id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('14d')
        .sign(jwtSecret);

    // 5. Set the session cookie and redirect
    const response = NextResponse.redirect(siteUrl);
    response.cookies.set('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 14, // 14 days
    });

    return response;

  } catch (error) {
    console.error('Callback handler error:', error);
    return NextResponse.redirect(`${siteUrl}/?error=internal_server_error`);
  }
}
