// src/app/api/auth/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';

export async function GET(req: NextRequest) {
  const token = cookies().get('session_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, jwtSecret);

    const userId = payload.userId as string;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(userId).select('name pictureUrl email').lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
    
  } catch (error) {
    console.error('User fetch error:', error);
    // This could happen if the token is expired or malformed
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
