// src/types/auth.ts
import "next-auth";
import "next-auth/jwt";

export interface AuthUser {
  id: string;       // NextAuth User.id is always string
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      image: string;
    };
    accessToken: string;
  }

  interface User extends AuthUser {
    id: string; // ensuring there's at least one property to satisfy empty-object-type
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: {
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      image: string;
    };
  }
}
