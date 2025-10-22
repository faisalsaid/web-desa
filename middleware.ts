// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cek token dari cookie (semua kemungkinan environment)
  // const token =
  //   req.cookies.get('next-auth.session-token')?.value ||
  //   req.cookies.get('authjs.session-token')?.value ||
  //   req.cookies.get('__Secure-next-auth.session-token')?.value ||
  //   req.cookies.get('_vercel_jwt')?.value;

  let tokenJWT: any = null;
  try {
    tokenJWT = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      // secureCookie: true,
    });
  } catch (err) {
    console.warn('⚠️ getToken gagal decode:', (err as Error).message);
  }

  const isLoggedIn = !!tokenJWT;
  // console.log('tokenJWT => ', tokenJWT);
  // console.log('isLoggedIn =>', isLoggedIn);

  // 🔒 ROUTE yang hanya bisa diakses jika login
  const protectedRoutes = ['/dashboard', '/users', '/settings'];

  // 🚫 ROUTE yang tidak boleh diakses jika sudah login
  const blockedAuthRoutes = ['/auth/login', '/auth/register'];

  // 1️⃣ Jika belum login dan mencoba akses halaman yang dilindungi
  if (
    !isLoggedIn &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 2️⃣ Jika sudah login dan mencoba akses auth/login atau auth/register
  if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // ✅ Kalau tidak termasuk kondisi di atas, lanjutkan saja
  return NextResponse.next();
}

// Middleware aktif di path ini
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};
