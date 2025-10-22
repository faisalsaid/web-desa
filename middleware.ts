// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 🔐 Aturan role (akses per route prefix)
const accessRules: Record<string, string[]> = {
  '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
  '/users': ['ADMIN', 'OPERATOR'],
  '/settings': ['ADMIN'],
};

// 🚫 Halaman yang tidak boleh diakses saat sudah login
const blockedAuthRoutes = ['/auth/login', '/auth/register'];

function getRequiredRoles(pathname: string): string[] | null {
  for (const prefix in accessRules) {
    if (pathname.startsWith(prefix)) return accessRules[prefix];
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Ambil token JWT dari NextAuth (langsung dari cookie)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const userRole = token?.role || 'USER';

  // 🔒 Cek halaman yang butuh login (semua dari accessRules)
  const protectedRoutes = Object.keys(accessRules);

  // 1️⃣ Belum login tapi akses route yang butuh login
  if (
    !isLoggedIn &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 2️⃣ Sudah login tapi akses halaman login/register
  if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 3️⃣ Cek role user untuk halaman tertentu
  const allowedRoles = getRequiredRoles(pathname);
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(`🚫 Role ${userRole} tidak boleh akses ${pathname}`);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // ✅ Jika semua aman → lanjutkan
  return NextResponse.next();
}

// Middleware aktif di path berikut
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};
