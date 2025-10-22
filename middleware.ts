import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'; // ⬅️ ini yang benar!

export async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  const isLoggedIn = !!session?.user;
  // const userRole = session?.user?.role ?? 'USER';

  if (!isLoggedIn && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isLoggedIn && ['/auth/login', '/auth/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
};
