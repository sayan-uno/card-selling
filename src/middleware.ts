import { NextResponse, type NextRequest } from 'next/server'
import {
  decodeProtectedHeader,
  importJWK,
  jwtVerify,
  type JWK,
} from 'jose';

async function verify(token: string, secret: JWK): Promise<any> {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    try {
      const secret = await importJWK({
        kty: 'oct',
        k: process.env.JWT_SECRET_KEY!,
      });
      await verify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error('JWT Verification error:', err);
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
