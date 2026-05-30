// src/store/userStore.ts

/**
 * CACHING STRATEGY
 * ================
 * The user store caches API responses in a `cache` object keyed by query string.
 * On every fetch, we first check the cache:
 *   - Cache HIT  → return cached data instantly (no loading, no API call).
 *   - Cache MISS → fetch from API, store result in cache, update state.
 *
 * This improves performance by:
 * - Avoiding repeated API calls for the same data.
 * - Reducing network latency for previously-visited pages.
 * - Preventing unnecessary re-renders from loading states.
 */

import { create } from "zustand";
import { DummyUser } from "@/types/user";
import { getUsers, getUserById, searchUsers } from "@/services/userService";

interface UserState {
  users: DummyUser[];
  total: number;
  currentUser: DummyUser | null;
  loading: boolean;
  error: string | null;
  /** Cache: key = "limit-skip" or "search-query", value = users array */
  cache: Record<string, { users: DummyUser[]; total: number }>;

  fetchUsers: (limit?: number, skip?: number) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  searchUsersByQuery: (q: string) => Promise<void>;
  clearError: () => void;
  clearCurrentUser: () => void;
}

const useUserStore = create<UserState>()((set, get) => ({
  users: [],
  total: 0,
  currentUser: null,
  loading: false,
  error: null,
  cache: {},

  fetchUsers: async (limit = 10, skip = 0) => {
    const cacheKey = `list-${limit}-${skip}`;
    const { cache } = get();

    // Caching avoids repeated API calls, improves performance,
    // and reduces unnecessary loading states for the user.
    if (cache[cacheKey]) {
      set({ users: cache[cacheKey].users, total: cache[cacheKey].total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await getUsers(limit, skip);
      const newCache = { ...cache, [cacheKey]: { users: data.users, total: data.total } };
      set({ users: data.users, total: data.total, cache: newCache, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load users.",
        loading: false,
      });
    }
  },

  fetchUserById: async (id) => {
    const cacheKey = `user-${id}`;
    const { cache } = get();

    // Check if the user is already cached from a list fetch
    if (cache[cacheKey]) {
      set({ currentUser: cache[cacheKey].users[0] });
      return;
    }

    set({ loading: true, error: null, currentUser: null });
    try {
      const user = await getUserById(id);
      const newCache = { ...cache, [cacheKey]: { users: [user], total: 1 } };
      set({ currentUser: user, cache: newCache, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load user.",
        loading: false,
      });
    }
  },

  searchUsersByQuery: async (q) => {
    if (!q.trim()) {
      // Reset to default list on empty search
      get().fetchUsers();
      return;
    }

    const cacheKey = `search-${q}`;
    const { cache } = get();

    // Cache search results too — same query won't re-fetch
    if (cache[cacheKey]) {
      set({ users: cache[cacheKey].users, total: cache[cacheKey].total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await searchUsers(q);
      const newCache = { ...cache, [cacheKey]: { users: data.users, total: data.total } };
      set({ users: data.users, total: data.total, cache: newCache, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to search users.",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentUser: () => set({ currentUser: null }),
}));

export default useUserStore;
