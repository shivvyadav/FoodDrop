import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });
  console.log(token);
  const Role = token?.role;

  const publicPages = ['/', '/login', '/register'];
  const protectedPages = ['/home', '/admin', '/delivery'];
  const notUserPages = ['/admin', '/delivery'];
  const notDeliveryPages = ['/admin', '/home'];
  const notAdminPages = ['/delivery', '/home'];

  // Logged-out users should not access protected pages
  if (!token && protectedPages.some((path) => pathname === path)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Logged-in users should not see auth pages
  if (token && publicPages.some((path) => pathname === path)) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (
    token &&
    Role === 'user' &&
    notUserPages.some((path) => pathname === path)
  ) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (
    token &&
    Role === 'delivery' &&
    notDeliveryPages.some((path) => pathname === path)
  ) {
    return NextResponse.redirect(new URL('/delivery', req.url));
  }

  if (
    token &&
    Role === 'admin' &&
    notAdminPages.some((path) => pathname === path)
  ) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/register',
    '/login',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
