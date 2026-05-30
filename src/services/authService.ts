// src/services/authService.ts
import api from "./api";
import { AuthUser } from "@/types/auth";

/**
 * Login with DummyJSON credentials provider.
 * POST /auth/login → returns user object with accessToken.
 */
export async function loginUser(
  username: string,
  password: string
): Promise<AuthUser> {
  try {
    const response = await api.post<AuthUser>("/auth/login", {
      username,
      password,
      expiresInMins: 60,
    });
    return response.data;
  } catch (error) {
    console.error("[authService] Login failed:", error);
    throw new Error("Invalid username or password. Please try again.");
  }
}
