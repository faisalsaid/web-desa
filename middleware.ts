import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Tentukan Route Auth (Login/Register)
  const isAuthRoute = pathname.startsWith('/auth');

  // 2. Daftar Route yang WAJIB Login & Role-nya
  // Halaman Root '/' TIDAK ada di sini, jadi otomatis jadi Public
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
    '/users': ['ADMIN', 'OPERATOR'],
    '/settings': ['ADMIN'],
    '/village': ['ADMIN', 'OPERATOR'], // Edit profil desa
    '/residents': ['ADMIN', 'OPERATOR'],
    '/families': ['ADMIN', 'OPERATOR'],
    '/organitations': ['ADMIN', 'OPERATOR'],
    '/apbdesa': ['ADMIN', 'OPERATOR'],
    '/assets': ['ADMIN', 'OPERATOR', 'EDITOR'],
  };

  // Cek apakah user sedang mengakses halaman yang diproteksi
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) =>
    pathname.startsWith(route),
  );

  // 3. Setup Nama Cookie (Auth.js v5 fix)
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieName = isProduction
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

  // 4. Ambil Token
  let token = null;
  // Kita hanya BUTUH token jika user akses Auth Route atau Protected Route
  // Tapi kita ambil saja dulu untuk cek status login
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: cookieName,
      secureCookie: isProduction,
    });
  } catch (err) {
    console.error('Middleware Token Error:', err);
  }

  const isAuthenticated = !!token;

  // ============================================================
  // LOGIKA UTAMA
  // ============================================================

  // A. Handle Route Auth (Login/Register/Forgot-Pass)
  if (isAuthRoute) {
    // Jika user sudah login tapi mau buka halaman login -> lempar ke dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Jika belum login -> izinkan akses
    return NextResponse.next();
  }

  // B. Handle Route Protected (Dashboard, dll)
  if (isProtectedRoute) {
    // 1. Cek Login: Jika tidak ada token -> tendang ke login
    if (!isAuthenticated || token?.deleted) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('expired', '1');
      loginUrl.searchParams.set('callbackUrl', pathname); // Biar setelah login balik ke sini

      const res = NextResponse.redirect(loginUrl);

      // Bersihkan cookie
      res.cookies.delete(cookieName);
      res.cookies.delete('__Host-authjs.csrf-token');

      return res;
    }

    // 2. Cek Role: User login tapi role tidak sesuai
    const userRole = token?.role as string;
    // Cari role yang diizinkan untuk path ini
    // Kita loop lagi karena butuh value array roles-nya
    for (const [prefix, allowedRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(prefix)) {
        if (!allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        break; // Stop loop jika match
      }
    }
  }

  // C. Halaman Public (/, /berita, /profil, dll)
  // Jika kode sampai sini, berarti bukan Auth route dan bukan Protected route.
  // Otomatis diizinkan (NextResponse.next())
  return NextResponse.next();
}

export const config = {
  // Matcher tetap menangkap semua request agar kita bisa filter di dalam function
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
