import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware ringan — hanya cek cookie session
export function middleware(req: NextRequest) {
  // Nama cookie tergantung environment
  const token =
    req.cookies.get('next-auth.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value;

  // Redirect user yang belum login ke /login
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Tentukan route yang dilindungi
export const config = {
  matcher: ['/dashboard/:path*'],
};
