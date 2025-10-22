// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 🔐 Role-based access control
const accessRules: Record<string, string[]> = {
  '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
  '/users': ['ADMIN', 'OPERATOR'],
  '/settings': ['ADMIN'],
};

// 🚫 Halaman yang tidak boleh diakses kalau sudah login
const blockedAuthRoutes = ['/auth/login', '/auth/register'];

function getRequiredRoles(pathname: string): string[] | null {
  for (const prefix in accessRules) {
    if (pathname.startsWith(prefix)) return accessRules[prefix];
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Ambil token dari cookie (otomatis handle semua environment)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // 🔍 Status login & role
  const isLoggedIn = Boolean(token);
  const userRole = token?.role ?? null; // aman dari undefined

  // 🔒 Halaman yang perlu login
  const protectedRoutes = Object.keys(accessRules);

  // 1️⃣ Belum login tapi akses route yang butuh login
  if (!isLoggedIn && protectedRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 2️⃣ Sudah login tapi buka /auth/login atau /auth/register
  if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 3️⃣ Cek role (hanya jika sudah login dan ada aturan role)
  const allowedRoles = getRequiredRoles(pathname);
  if (isLoggedIn && allowedRoles && !allowedRoles.includes(userRole || '')) {
    console.warn(`🚫 Role '${userRole}' tidak boleh akses ${pathname}`);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // ✅ Kalau semua aman, lanjut
  return NextResponse.next();
}

// Aktif di path berikut
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};
