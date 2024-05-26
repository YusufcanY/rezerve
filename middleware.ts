import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('user');

  if (
    cookie &&
    cookie.value &&
    JSON.parse(cookie.value).state.token &&
    (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    cookie &&
    cookie.value &&
    !JSON.parse(cookie.value).state.token &&
    req.nextUrl.pathname === '/profile'
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
