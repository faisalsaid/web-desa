import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;

  // 🚨 WAJIB: Cek user masih ada di database
  if (token?.email) {
    const res = await fetch('/api/auth/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: token.email }),
      cache: 'no-store',
    }).then((r) => r.json());

    if (!res.exists) {
      const out = NextResponse.redirect(new URL('/auth/login', req.url));
      out.cookies.delete('next-auth.session-token');
      out.cookies.delete('__Secure-next-auth.session-token');
      return out;
    }
  }

  // =========================
  // ROUTE PROTECTION
  // =========================
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
    '/users': ['ADMIN', 'OPERATOR'],
    '/settings': ['ADMIN'],
    '/village': ['ADMIN', 'OPERATOR'],
    '/residents': ['ADMIN', 'OPERATOR'],
    '/families': ['ADMIN', 'OPERATOR'],
    '/organitations': ['ADMIN', 'OPERATOR'],
    '/accounting': ['ADMIN', 'OPERATOR'],
  };

  const blockedAuthRoutes = ['/auth/login', '/auth/register'];

  const needsAuth = Object.keys(protectedRoutes).some((r) =>
    pathname.startsWith(r),
  );

  if (!isLoggedIn && needsAuth) {
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
    '/village/:path*',
    '/residents/:path*',
    '/families/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
    '/organitations/:path*',
    '/accounting/:path*',
  ],
};
