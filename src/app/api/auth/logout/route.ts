// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // To clear a cookie, you set its value to empty and maxAge to 0
  cookies().set('session_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ message: 'Logged out successfully' });
}
