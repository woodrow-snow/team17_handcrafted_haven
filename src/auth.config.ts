import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isAccountArea = nextUrl.pathname.startsWith('/account');
      const isSignUpPage = nextUrl.pathname === '/account/add'; // Specific check
      const isAdminArea = nextUrl.pathname.startsWith('/admin');

      // 1. PUBLIC EXCEPTION: Allow anyone to reach the Sign Up page
      if (isSignUpPage) {
        return true; 
      }

      // 2. PROTECTED AREAS: If trying to access any account/admin page
      if (isAccountArea || isAdminArea) {
        if (!isLoggedIn) return false; // Redirects to /login

        // Only Sellers and Admins can access seller actions (if you have other seller pages later)
        // Since /account/add is now public, this check won't trigger for it anymore.
        
        if (isAdminArea && role !== 'admin') {
          return Response.redirect(new URL('/account/home', nextUrl));
        }

        return true;
      }

      // 3. LOGGED-IN REDIRECT: Send away from login page if already signed in
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/account/home', nextUrl));
      }

      return true; // All other pages (Home, Shop) are public
    },
  },
  providers: [], 
} satisfies NextAuthConfig;