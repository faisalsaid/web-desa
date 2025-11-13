// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🧩 Ambil token dari cookie / header
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const isLoggedIn = !!token;
  const userRole = token?.role || 'USER'; // default role kalau tidak ada
  // console.log('🔍 [Middleware] path:', pathname);
  // console.log('✅ [Middleware] isLoggedIn:', isLoggedIn, '| role:', userRole);

  // =========================
  // 🔒 ROUTE PROTECTION RULES
  // =========================

  // 1️⃣ Halaman yang hanya bisa diakses saat sudah login
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
    '/users': ['ADMIN', 'OPERATOR'],
    '/settings': ['ADMIN'],
    '/village': ['ADMIN', 'OPERATOR'],
    '/residents': ['ADMIN', 'OPERATOR'],
    '/family': ['ADMIN', 'OPERATOR'],
  };

  // 2️⃣ Halaman auth yang tidak boleh diakses kalau sudah login
  const blockedAuthRoutes = ['/auth/login', '/auth/register'];

  // =========================
  // 🚫 CEK BLOKIR / IZIN AKSES
  // =========================

  // ❌ Jika belum login dan mencoba akses halaman dilindungi
  const needsAuth = Object.keys(protectedRoutes).some((r) =>
    pathname.startsWith(r),
  );
  if (!isLoggedIn && needsAuth) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // ❌ Jika sudah login tapi mencoba akses /auth/login atau /auth/register
  if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // ✅ Jika sudah login dan halaman perlu role tertentu
  for (const [prefix, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(prefix)) {
      if (!roles.includes(userRole)) {
        console.warn(
          `🚫 Akses ditolak: role "${userRole}" tidak boleh ke "${pathname}"`,
        );
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  }

  // ✅ Jika semua aman, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/village/:path*',
    '/residents/:path*',
    '/family/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const token = await getToken({
//     req,
//     secret: process.env.AUTH_SECRET,
//     secureCookie: process.env.NODE_ENV === 'production',
//   });

//   const isLoggedIn = !!token;

//   console.log('🔍 [Middleware] path:', pathname);
//   console.log('✅ [Middleware] isLoggedIn:', isLoggedIn);

//   const protectedRoutes = ['/dashboard', '/users', '/settings'];
//   const blockedAuthRoutes = ['/auth/login', '/auth/register'];

//   if (!isLoggedIn && protectedRoutes.some((r) => pathname.startsWith(r))) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }

//   if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL('/dashboard', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/users/:path*',
//     '/settings/:path*',
//     '/auth/:path*',
//   ],
// };
