import { NextResponse } from 'next/server';

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);

  const referrer = requestHeaders.get('referer');

  const response = NextResponse.next();

  if (!referrer || !referrer.startsWith('https://www.instagram.com')) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
