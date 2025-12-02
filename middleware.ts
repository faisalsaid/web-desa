import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Definisikan Route
  // const authRoutes = ['/auth/login', '/auth/register'];
  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = pathname.startsWith('/auth');

  // Route yang dilindungi berdasarkan Role
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
    '/users': ['ADMIN', 'OPERATOR'],
    '/settings': ['ADMIN'],
    '/village': ['ADMIN', 'OPERATOR'],
    '/residents': ['ADMIN', 'OPERATOR'],
    '/families': ['ADMIN', 'OPERATOR'],
    '/organitations': ['ADMIN', 'OPERATOR'],
    '/apbdesa': ['ADMIN', 'OPERATOR'],
    '/assets': ['ADMIN', 'OPERATOR', 'EDITOR'],
  };

  // 2. Ambil Token
  // Secret wajib ada, fallback ke string kosong untuk mencegah crash saat build tapi error runtime jika env missing
  const secret = process.env.NEXTAUTH_SECRET;

  let token = null;
  try {
    token = await getToken({
      req,
      secret,
    });
  } catch (err) {
    console.error('Middleware Token Error:', err);
  }

  const isAuthenticated = !!token;

  // 3. Logic untuk Halaman Auth (Login/Register)
  if (isAuthRoute) {
    // Jika user SUDAH login tapi akses halaman login, lempar ke dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Jika belum login, biarkan akses halaman login
    return NextResponse.next();
  }

  // 4. Logic Validasi Token (Jika user tidak login atau token invalid)
  // Cek token.deleted (asumsi flag ini diset di session callback)
  if (!isAuthenticated || token?.deleted) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('expired', '1'); // Beri tahu user kenapa logout

    // Redirect ke login
    const res = NextResponse.redirect(loginUrl);

    // HAPUS COOKIES (Dynamic Name Handling)
    // NextAuth v4 menggunakan prefix __Secure- hanya di HTTPS
    const isSecure = process.env.NODE_ENV === 'production';
    const cookiePrefix = isSecure ? '__Secure-' : '';

    // Nama cookie default NextAuth v4
    res.cookies.delete(`${cookiePrefix}next-auth.session-token`);
    res.cookies.delete(`${cookiePrefix}next-auth.callback-url`);
    res.cookies.delete(`${cookiePrefix}next-auth.csrf-token`);

    // Jaga-jaga jika pakai Auth.js v5 (beta) atau nama custom
    res.cookies.delete('authjs.session-token');
    res.cookies.delete('__Secure-authjs.session-token');

    return res;
  }

  // 5. Role-Based Access Control (RBAC)
  const userRole = token?.role as string;

  for (const [prefix, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(prefix)) {
      if (!allowedRoles.includes(userRole)) {
        // User login tapi role tidak cukup
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
