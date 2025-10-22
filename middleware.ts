import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const isLoggedIn = !!token;

  console.log('🔍 [Middleware] path:', pathname);
  console.log('✅ [Middleware] isLoggedIn:', isLoggedIn);

  const protectedRoutes = ['/dashboard', '/users', '/settings'];
  const blockedAuthRoutes = ['/auth/login', '/auth/register'];

  if (!isLoggedIn && protectedRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};
