import { NextRequest, NextResponse } from 'next/server';
import pages from '@/constants/authPages';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('user');

  if (
    cookie &&
    cookie.value &&
    JSON.parse(cookie.value).state.token &&
    pages.unauthPages.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    cookie &&
    cookie.value &&
    !JSON.parse(cookie.value).state.token &&
    pages.authPages.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
