import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Dapatkan token dari NextAuth (dibaca dari cookies)
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;
  console.log(isLoggedIn);

  // 🔒 Halaman yang butuh login
  const protectedRoutes = ['/dashboard', '/users', '/settings'];

  // 🚫 Halaman auth yang tidak boleh diakses jika sudah login
  const blockedAuthRoutes = ['/auth/login', '/auth/register'];

  // 1️⃣ Belum login → akses halaman dilindungi
  if (!isLoggedIn && protectedRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 2️⃣ Sudah login → akses /auth/login atau /auth/register
  if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // ✅ Jika tidak termasuk kondisi di atas, lanjutkan
  return NextResponse.next();
}

// Aktifkan middleware di path ini
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};
