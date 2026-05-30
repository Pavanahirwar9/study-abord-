// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/services/authService";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required.");
        }

        try {
          // Call DummyJSON auth API via authService
          const user = await loginUser(
            credentials.username,
            credentials.password
          );

          // NextAuth expects null for failure, or a user object for success
          if (user && user.accessToken) {
            return {
              id: String(user.id),   // NextAuth User.id must be string
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              image: user.image,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              gender: user.gender,
            };
          }
          return null;
        } catch (error) {
          throw new Error(
            error instanceof Error
              ? error.message
              : "Authentication failed."
          );
        }
      },
    }),
  ],

  callbacks: {
    /**
     * jwt callback — runs when a JWT is created or updated.
     * Store accessToken and user info inside the JWT.
     */
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as { accessToken: string }).accessToken;
        token.user = {
          id: (user as { id: string }).id,
          username: (user as { username: string }).username,
          email: user.email ?? "",
          firstName: (user as { firstName: string }).firstName,
          lastName: (user as { lastName: string }).lastName,
          image: user.image ?? "",
        };
      }
      return token;
    },

    /**
     * session callback — exposes token data to the client session.
     */
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as typeof session.user;
      return session;
    },
  },

  pages: {
    signIn: "/login", // Redirect to our custom login page
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour — matches DummyJSON token expiry
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
