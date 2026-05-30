// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Route protection middleware.
 * Unauthenticated users visiting any protected route are redirected to /login.
 *
 * Protected routes (Step 5 — all private paths):
 *  - /dashboard and sub-paths
 *  - /users and sub-paths
 *  - /products and sub-paths
 */
export default withAuth(
  function middleware() {
    // If user IS authenticated, allow the request
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // null token = not authenticated
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/products/:path*",
  ],
};
