// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const accessRules: Record<string, string[]> = {
  '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
  '/users': ['ADMIN', 'OPERATOR'],
  '/settings': ['ADMIN'],
};

const blockedWhenLoggedIn = ['/auth', '/auth/login', '/auth/register'];

function getRequiredRoles(pathname: string): string[] | null {
  for (const prefix in accessRules) {
    if (pathname.startsWith(prefix)) return accessRules[prefix];
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Ambil cookie session langsung ---
  const cookieSession =
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('authjs.session-token')?.value ||
    req.cookies.get('_vercel_jwt')?.value;

  const hasSessionCookie = Boolean(cookieSession);

  // --- Coba dapatkan JWT dari NextAuth ---
  let token: any = null;
  try {
    token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: true,
    });
  } catch (err) {
    console.warn('⚠️ getToken gagal decode:', (err as Error).message);
  }

  const isLoggedIn = Boolean(token || hasSessionCookie);
  const userRole = token?.role || 'USER';

  // 🚫 Mencegah infinite redirect
  const isAuthPage = blockedWhenLoggedIn.some((p) => pathname.startsWith(p));
  const isDashboard = pathname.startsWith('/dashboard');

  // --- Kalau user belum login & ke halaman private ---
  if (!isLoggedIn && isDashboard) {
    const url = new URL('/auth/login', req.url);
    if (url.pathname !== pathname) return NextResponse.redirect(url);
  }

  // --- Kalau user sudah login tapi buka /auth ---
  if (isLoggedIn && isAuthPage) {
    const url = new URL('/dashboard', req.url);
    if (url.pathname !== pathname) return NextResponse.redirect(url);
  }

  // --- Proteksi role ---
  if (isLoggedIn && isDashboard) {
    const allowedRoles = getRequiredRoles(pathname);
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
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
  runtime: 'nodejs',
};
