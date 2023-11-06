import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

const ALLOWED_PATH = [
  '/login',
  '/unauthenticated',
  '/api/auth',
]

export const config = {
  // matcher: '/((?!api|auth|_next|static|public|favicon.ico).*)',
  matcher: '/((?!api|auth|_next|assets|images|static|public|favicon.ico).*)',
}

export async function middleware(req) {

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-url', req.url)
  
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })

  const supabase = createMiddlewareClient({ req, res })
  const { data: { session }, error } = await supabase.auth.getSession()

  const url = new URL(req.url)
  if (!session && !ALLOWED_PATH.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/unauthenticated', req.url))
  }

  return res
}