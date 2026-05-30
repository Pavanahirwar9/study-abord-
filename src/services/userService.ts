// src/services/userService.ts
import api from "./api";
import { DummyUser, UsersResponse } from "@/types/user";

/**
 * Fetch paginated list of users.
 * Caching is handled in Zustand store to avoid redundant calls.
 */
export async function getUsers(
  limit: number = 10,
  skip: number = 0
): Promise<UsersResponse> {
  try {
    const response = await api.get<UsersResponse>(
      `/users?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error) {
    console.error("[userService] getUsers failed:", error);
    throw new Error("Failed to load users. Please try again.");
  }
}

/**
 * Search users by query string.
 * Returns matching users from DummyJSON search endpoint.
 */
export async function searchUsers(q: string): Promise<UsersResponse> {
  try {
    const response = await api.get<UsersResponse>(
      `/users/search?q=${encodeURIComponent(q)}`
    );
    return response.data;
  } catch (error) {
    console.error("[userService] searchUsers failed:", error);
    throw new Error("Failed to search users. Please try again.");
  }
}

/**
 * Fetch a single user by ID.
 */
export async function getUserById(id: number): Promise<DummyUser> {
  try {
    const response = await api.get<DummyUser>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`[userService] getUserById(${id}) failed:`, error);
    throw new Error("Failed to load user details. Please try again.");
  }
}
