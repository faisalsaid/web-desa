// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// daftar role redaksi
const roleRedaksi = ['ADMIN', 'OPERATOR', 'EDITOR'];

// daftar route yang dilindungi dan role-nya
const protectedRoutes = [
  { prefix: '/dashboard', roles: roleRedaksi },
  { prefix: '/posts', roles: roleRedaksi },
  { prefix: '/asset', roles: roleRedaksi },
  { prefix: '/profile', roles: roleRedaksi },
  { prefix: '/projects', roles: roleRedaksi },
];

// route yang tidak boleh diakses kalau sudah login
const blockedWhenLoggedIn = ['/auth'];

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // ambil cookie session token dari NextAuth
  const token =
    req.cookies.get('authjs.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value;

  // --- basic login check ---
  const isLoggedIn = !!token;

  // cek apakah route termasuk yang dilindungi
  const matchedRoute = protectedRoutes.find((r) =>
    pathname.startsWith(r.prefix),
  );
  const isBlockedRoute = blockedWhenLoggedIn.some((prefix) =>
    pathname.startsWith(prefix),
  );

  // 🔒 belum login, tapi masuk route dilindungi
  if (!isLoggedIn && matchedRoute) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  // 🚫 sudah login tapi ke halaman /auth
  if (isLoggedIn && isBlockedRoute) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  // ✅ sudah login dan masuk route dilindungi
  // ❗ catatan: di edge middleware kita tidak bisa baca role dari token (karena isinya dienkripsi)
  // jadi role-based check sebaiknya dilakukan di server (layout/page)
  return NextResponse.next();
}

// batasi middleware hanya jalan di route ini
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/posts/:path*',
    '/asset/:path*',
    '/profile/:path*',
    '/projects/:path*',
    '/auth/:path*',
  ],
};
