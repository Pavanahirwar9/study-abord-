// src/store/authStore.ts

/**
 * WHY ZUSTAND?
 * ============
 * Zustand is chosen over Redux because:
 * - Minimal boilerplate: no actions, reducers, or dispatchers needed.
 * - Small bundle size (~1KB gzipped vs Redux ~8KB).
 * - Works perfectly with Next.js App Router (no Provider wrapper for reads).
 * - Built-in `persist` middleware for localStorage sync.
 * - Simpler async actions — just regular async functions inside the store.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  /** Store token + user after successful login */
  setAuth: (token: string, user: AuthUser) => void;
  /** Clear all auth data on logout */
  clearAuth: () => void;
}

/**
 * authStore — persisted to localStorage under key "auth-storage".
 *
 * Using Zustand `persist` middleware is cleaner than manual localStorage:
 * - Automatically serializes/deserializes state.
 * - Handles hydration on page reload.
 * - No need to call localStorage.setItem on every state change.
 */
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (token, user) => set({ token, user }),

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

export default useAuthStore;
