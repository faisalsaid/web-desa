import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Halaman login/register tidak termasuk protected
  const authRoutes = ['/auth/login', '/auth/register'];
  if (authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Ambil token
  let token = null;
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });
  } catch (err) {
    console.error('Failed to get token:', err);
  }

  // ❌ Logout otomatis jika token tidak ada atau user dihapus
  if (!token?.role || token.deleted) {
    const res = NextResponse.redirect(
      new URL('/auth/login?expired=1', req.url),
    );

    // Hapus semua cookie authjs
    res.cookies.delete('__Secure-authjs.session-token');
    res.cookies.delete('__Secure-authjs.callback-url');
    res.cookies.delete('__Host-authjs.csrf-token');

    return res;
  }

  const userRole = token.role;

  // Role-based access
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
    '/users': ['ADMIN', 'OPERATOR'],
    '/settings': ['ADMIN'],
    '/village': ['ADMIN', 'OPERATOR'],
    '/residents': ['ADMIN', 'OPERATOR'],
    '/families': ['ADMIN', 'OPERATOR'],
    '/organitations': ['ADMIN', 'OPERATOR'],
    '/accounting': ['ADMIN', 'OPERATOR'],
  };

  for (const [prefix, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(prefix) && !roles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/village/:path*',
    '/residents/:path*',
    '/families/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/organitations/:path*',
    '/accounting/:path*',
    '/auth/:path*',
    // jangan include /auth/:path* untuk mencegah loop
  ],
  // runtime: 'nodejs', // wajib agar secureCookie berjalan di Vercel
};
