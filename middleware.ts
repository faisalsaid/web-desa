// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const accessRules: Record<string, string[]> = {
  '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
  '/users': ['ADMIN', 'OPERATOR'],
  '/settings': ['ADMIN'],
};

// halaman yang tidak boleh diakses kalau sudah login
const blockedWhenLoggedIn = ['/auth', '/auth/login', '/auth/register'];

function getRequiredRoles(pathname: string): string[] | null {
  for (const prefix in accessRules) {
    if (pathname.startsWith(prefix)) return accessRules[prefix];
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Deteksi login via cookie (fallback)
  const cookieSession =
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('authjs.session-token')?.value ||
    req.cookies.get('_vercel_jwt')?.value;

  const isLoggedIn = Boolean(cookieSession);

  // 2️⃣ Ambil token lengkap dari NextAuth (jika bisa)
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

  const userRole = token?.role || 'USER';

  // 3️⃣ Proteksi route login/register (jika user sudah login)
  if (isLoggedIn && blockedWhenLoggedIn.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 4️⃣ Proteksi route private (dashboard & lainnya)
  if (pathname.startsWith('/dashboard')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    const allowedRoles = getRequiredRoles(pathname);
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

// 🚀 Konfigurasi runtime & route match
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
  runtime: 'nodejs', // gunakan Node.js agar getToken() full support di Vercel
};
