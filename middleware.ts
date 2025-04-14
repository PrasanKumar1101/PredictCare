import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/custom-sign-in(.*)',
  '/custom-sign-up(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/chat(.*)',
  '/diabetes(.*)',
  '/heart(.*)',
  '/kidney(.*)',
  '/assessment(.*)'
]);

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)'
]);

// Use Clerk middleware with configuration options
export default clerkMiddleware(async (auth, req) => {
  // If it's a protected route, verify the user is authenticated
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  // If it's not a public route and not already handled as protected,
  // default to requiring authentication
  if (!isPublicRoute(req) && !isProtectedRoute(req)) {
    // You can customize this behavior - here we're requiring auth
    // for any route not explicitly marked as public
    await auth.protect();
  }
}, {
  // Clerk configuration options
  signInUrl: '/custom-sign-in',
  signUpUrl: '/custom-sign-up',
  afterSignInUrl: '/dashboard',
  afterSignUpUrl: '/dashboard',
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|.*\\..*|api|trpc).*)',
    // Always run for API routes except chat
    '/(api(?!/chat))(.*)'
  ]
}; 