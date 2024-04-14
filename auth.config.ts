import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //check if user is authenticated
      const isLoggedIn = !!auth?.user;
      //protected routes
      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");
      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to signin page
      } else if (isLoggedIn) {
        //If user is logged in, redirect to dashboard page
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
