import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let token = null;
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });
  } catch (err) {
    console.error('Failed to get token in middleware:', err);
  }

  const isLoggedIn = !!token;

  // Redirect ke login jika token tidak ada atau user dihapus
  if (!token || token.deleted) {
    const res = NextResponse.redirect(
      new URL('/auth/login?expired=1', req.url),
    );
    // Hapus semua cookie authjs
    res.cookies.delete('__Secure-authjs.session-token');
    res.cookies.delete('__Secure-authjs.callback-url');
    res.cookies.delete('__Host-authjs.csrf-token');
    return res;

    // const out = NextResponse.redirect(new URL('/auth/login', req.url));
    // out.cookies.delete('__Secure-authjs.session-token');
    // out.cookies.delete('__Secure-authjs.callback-url');
    // out.cookies.delete('__Host-authjs.csrf-token');
    // return out;
  }

  // Role-based route access
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard': ['ADMIN', 'OPERATOR', 'EDITOR'],
    '/users': ['ADMIN', 'OPERATOR'],
    '/settings': ['ADMIN'],
    '/village': ['ADMIN', 'OPERATOR'],
    '/residents': ['ADMIN', 'OPERATOR'],
    '/family': ['ADMIN', 'OPERATOR'],
    '/organitations': ['ADMIN', 'OPERATOR'],
    '/accounting': ['ADMIN', 'OPERATOR'],
  };

  for (const [prefix, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(prefix) && !roles.includes(token.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Block auth routes jika sudah login
  const blockedAuthRoutes = ['/auth/login', '/auth/register'];
  if (isLoggedIn && blockedAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// =========================
// Config matcher + runtime
// =========================
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/village/:path*',
    '/residents/:path*',
    '/family/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
    '/organitations/:path*',
    '/accounting/:path*',
  ],
  runtime: 'nodejs', // WAJIB agar secureCookie di Vercel tidak crash
};
