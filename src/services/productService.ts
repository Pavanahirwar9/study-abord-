// src/services/productService.ts
import api from "./api";
import { DummyProduct, ProductCategory, ProductsResponse } from "@/types/product";

/**
 * Fetch paginated list of products.
 * Caching handled by Zustand productStore.
 */
export async function getProducts(
  limit: number = 12,
  skip: number = 0
): Promise<ProductsResponse> {
  try {
    const response = await api.get<ProductsResponse>(
      `/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error) {
    console.error("[productService] getProducts failed:", error);
    throw new Error("Failed to load products. Please try again.");
  }
}

/**
 * Search products by query string.
 */
export async function searchProducts(q: string): Promise<ProductsResponse> {
  try {
    const response = await api.get<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(q)}`
    );
    return response.data;
  } catch (error) {
    console.error("[productService] searchProducts failed:", error);
    throw new Error("Failed to search products. Please try again.");
  }
}

/**
 * Fetch all product categories.
 */
export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const response = await api.get<ProductCategory[]>("/products/categories");
    return response.data;
  } catch (error) {
    console.error("[productService] getCategories failed:", error);
    throw new Error("Failed to load categories.");
  }
}

/**
 * Fetch products filtered by category slug.
 */
export async function getProductsByCategory(
  category: string
): Promise<ProductsResponse> {
  try {
    const response = await api.get<ProductsResponse>(
      `/products/category/${encodeURIComponent(category)}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `[productService] getProductsByCategory(${category}) failed:`,
      error
    );
    throw new Error("Failed to load products for this category.");
  }
}

/**
 * Fetch a single product by ID.
 */
export async function getProductById(id: number): Promise<DummyProduct> {
  try {
    const response = await api.get<DummyProduct>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`[productService] getProductById(${id}) failed:`, error);
    throw new Error("Failed to load product details. Please try again.");
  }
}
