import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const role = token?.role;

  const isLandingPage = pathname === '/';
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const isAdminRoute = pathname.startsWith('/admin');
  const isDeliveryRoute = pathname.startsWith('/delivery');
  const isUserRoute =
    pathname.startsWith('/home') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/my-orders') ||
    pathname.startsWith('/track-order');

  const isProfileRoute = pathname.startsWith('/edit-profile');

  if (
    !token &&
    (isAdminRoute || isDeliveryRoute || isUserRoute || isProfileRoute)
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && (isLandingPage || isAuthPage)) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    if (role === 'delivery') {
      return NextResponse.redirect(new URL('/delivery', req.url));
    }
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (token) {
    if (role === 'admin' && (isDeliveryRoute || isUserRoute)) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    if (role === 'delivery' && (isAdminRoute || isUserRoute)) {
      return NextResponse.redirect(new URL('/delivery', req.url));
    }

    if (role === 'user' && (isAdminRoute || isDeliveryRoute)) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
