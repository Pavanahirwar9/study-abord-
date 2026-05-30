// src/store/productStore.ts

/**
 * CACHING STRATEGY
 * ================
 * productStore caches fetched product lists and individual products.
 * Cache key format:
 *   - List:     "list-{limit}-{skip}"
 *   - Search:   "search-{query}"
 *   - Category: "cat-{category}"
 *   - Single:   "product-{id}"
 *
 * Caching avoids repeated API calls, improves performance,
 * and reduces unnecessary loading states for the user.
 * The categories list is fetched only once and stored globally.
 */

import { create } from "zustand";
import { DummyProduct, ProductCategory } from "@/types/product";
import {
  getProducts,
  getProductById,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "@/services/productService";

interface ProductState {
  products: DummyProduct[];
  total: number;
  categories: ProductCategory[];
  currentProduct: DummyProduct | null;
  loading: boolean;
  error: string | null;
  cache: Record<string, { products: DummyProduct[]; total: number }>;

  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  searchProductsByQuery: (q: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchByCategory: (category: string) => Promise<void>;
  clearError: () => void;
  clearCurrentProduct: () => void;
}

const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  total: 0,
  categories: [],
  currentProduct: null,
  loading: false,
  error: null,
  cache: {},

  fetchProducts: async (limit = 12, skip = 0) => {
    const cacheKey = `list-${limit}-${skip}`;
    const { cache } = get();

    // Return cached result if available — no API call needed
    if (cache[cacheKey]) {
      set({ products: cache[cacheKey].products, total: cache[cacheKey].total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await getProducts(limit, skip);
      const newCache = {
        ...cache,
        [cacheKey]: { products: data.products, total: data.total },
      };
      set({ products: data.products, total: data.total, cache: newCache, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load products.",
        loading: false,
      });
    }
  },

  fetchProductById: async (id) => {
    const cacheKey = `product-${id}`;
    const { cache } = get();

    if (cache[cacheKey]) {
      set({ currentProduct: cache[cacheKey].products[0] });
      return;
    }

    set({ loading: true, error: null, currentProduct: null });
    try {
      const product = await getProductById(id);
      const newCache = {
        ...cache,
        [cacheKey]: { products: [product], total: 1 },
      };
      set({ currentProduct: product, cache: newCache, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load product.",
        loading: false,
      });
    }
  },

  searchProductsByQuery: async (q) => {
    if (!q.trim()) {
      get().fetchProducts();
      return;
    }

    const cacheKey = `search-${q}`;
    const { cache } = get();

    if (cache[cacheKey]) {
      set({ products: cache[cacheKey].products, total: cache[cacheKey].total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await searchProducts(q);
      const newCache = {
        ...cache,
        [cacheKey]: { products: data.products, total: data.total },
      };
      set({ products: data.products, total: data.total, cache: newCache, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to search products.",
        loading: false,
      });
    }
  },

  fetchCategories: async () => {
    // Categories are fetched once and reused — no need to cache by key
    const { categories } = get();
    if (categories.length > 0) return;

    try {
      const data = await getCategories();
      set({ categories: data });
    } catch (err) {
      console.error("[productStore] fetchCategories failed:", err);
    }
  },

  fetchByCategory: async (category) => {
    const cacheKey = `cat-${category}`;
    const { cache } = get();

    if (cache[cacheKey]) {
      set({ products: cache[cacheKey].products, total: cache[cacheKey].total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await getProductsByCategory(category);
      const newCache = {
        ...cache,
        [cacheKey]: { products: data.products, total: data.total },
      };
      set({ products: data.products, total: data.total, cache: newCache, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load category.",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentProduct: () => set({ currentProduct: null }),
}));

export default useProductStore;
