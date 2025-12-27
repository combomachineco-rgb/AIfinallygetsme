import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Routes that require authentication
  const protectedRoutes = ['/questions', '/dashboard', '/checkout']
  // Routes only for non-authenticated users
  const authRoutes = ['/login', '/signup']
  
  const pathname = request.nextUrl.pathname
  
  // Create response that can be modified
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  
  // Initialize Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
  
  // Check authentication status
  const { data: { user } } = await supabase.auth.getUser()
  
  // Check if route requires protection
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  // Redirect logic
  if (!user && isProtectedRoute) {
    // Not authenticated, trying to access protected route
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (user && isAuthRoute) {
    // Already authenticated, trying to access login/signup
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Allow request to continue
  return response
}

// Configure which routes middleware runs on
export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

