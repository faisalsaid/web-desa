import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Tentukan Route Auth (Login/Register/Forgot Pass)
  // Menggunakan startsWith '/auth' agar mencakup sub-path
  const isAuthRoute = pathname.startsWith('/auth');

  // 2. Daftar Route Protected & Role
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

  // 3. Setup Nama Cookie yang Sesuai Auth.js v5
  // Auth.js v5 menggunakan 'authjs.session-token', bukan 'next-auth.session-token'
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieName = isProduction
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

  // 4. Ambil Token
  let token = null;
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: cookieName, // 🔥 PENTING: Paksa getToken cari nama cookie yang benar
      secureCookie: isProduction,
    });
  } catch (err) {
    console.error('Middleware Token Error:', err);
  }

  const isAuthenticated = !!token;

  // 5. Logic Redirection Auth Route
  // Jika akses /auth/* tapi sudah login, lempar ke dashboard
  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // 6. Logic Validasi Token (Jika user akses halaman lain tapi token mati)
  if (!isAuthenticated || token?.deleted) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('expired', '1');

    const res = NextResponse.redirect(loginUrl);

    // Hapus Cookie dengan Nama yang Tepat (v5)
    res.cookies.delete(cookieName);
    res.cookies.delete('__Host-authjs.csrf-token'); // Hapus CSRF juga biar bersih

    return res;
  }

  // 7. Role-Based Access Control
  const userRole = token?.role as string;

  for (const [prefix, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(prefix)) {
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
