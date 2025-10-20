// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const accessRules: Record<string, string[]> = {
  '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
  '/users': ['ADMIN', 'OPERATOR'],
  '/settings': ['ADMIN'],
};

// halaman yang tidak boleh diakses jika sudah login
const blockedWhenLoggedIn = ['/auth', '/auth/login', '/auth/register'];

function getRequiredRoles(pathname: string): string[] | null {
  for (const prefix in accessRules) {
    if (pathname.startsWith(prefix)) return accessRules[prefix];
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isLoggedIn = !!token;
  const userRole = token?.role || 'USER';

  // 🚫 Sudah login tapi masuk ke /auth/*
  if (
    isLoggedIn &&
    blockedWhenLoggedIn.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 🔒 Belum login, coba masuk ke halaman yang butuh login
  if (!isLoggedIn && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 🔐 Cek role user
  const allowedRoles = getRequiredRoles(pathname);
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(`🚫 Role ${userRole} tidak diizinkan ke ${pathname}`);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*', // 👈 tambahkan agar middleware juga jalan di /auth
  ],
};
