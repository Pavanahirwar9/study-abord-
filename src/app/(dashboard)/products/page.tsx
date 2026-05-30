// src/app/(dashboard)/products/page.tsx
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box, Typography, TextField, InputAdornment, Pagination,
  MenuItem, Select, FormControl, InputLabel, Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useProductStore from "@/store/productStore";
import ProductGrid from "@/components/products/ProductGrid";
import { CardSkeletonLoader } from "@/components/common/SkeletonLoader";
import ErrorAlert from "@/components/common/ErrorAlert";
import EmptyState from "@/components/common/EmptyState";
import useDebounce from "@/lib/useDebounce";
import { capitalize } from "@/lib/formatters";
import toast from "react-hot-toast";

const LIMIT = 12;

export default function ProductsPage() {
  const {
    products, total, categories, loading, error,
    fetchProducts, searchProductsByQuery, fetchCategories, fetchByCategory, clearError,
  } = useProductStore();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Debounce search — reduces API calls while the user is typing (Step 10)
  const debouncedSearch = useDebounce(searchInput, 400);

  // useMemo — only recalculates when total changes
  const totalPages = useMemo(() => Math.ceil(total / LIMIT), [total]);

  // Load categories once on mount
  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  // Handle category filter
  useEffect(() => {
    if (selectedCategory === "all") {
      if (!debouncedSearch) fetchProducts(LIMIT, (page - 1) * LIMIT);
    } else {
      fetchByCategory(selectedCategory);
    }
  }, [selectedCategory, page, debouncedSearch, fetchProducts, fetchByCategory]);

  // Handle search
  useEffect(() => {
    if (debouncedSearch) {
      searchProductsByQuery(debouncedSearch);
    } else if (selectedCategory === "all") {
      fetchProducts(LIMIT, (page - 1) * LIMIT);
    }
  }, [debouncedSearch, selectedCategory, page, searchProductsByQuery, fetchProducts]);

  // Show error as toast
  useEffect(() => { if (error) toast.error(error); }, [error]);

  // useCallback — stable handler references (Step 15)
  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
    setSelectedCategory("all");
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
    setSearchInput("");
    setPage(1);
  }, []);

  const handleRetry = useCallback(() => {
    clearError();
    fetchProducts(LIMIT, 0);
  }, [clearError, fetchProducts]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Products</Typography>
        <Typography variant="body2" color="text.secondary">
          {total > 0 ? `${total} products total` : "Browse and manage all products"}
        </Typography>
      </Box>

      {/* Filters row */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3, alignItems: { sm: "center" } }}>
        {/* Search */}
        <TextField
          id="product-search"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          size="small"
          sx={{ flex: 1, maxWidth: { sm: 300 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Category filter dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>{capitalize(cat.name)}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {error && <ErrorAlert message={error} onRetry={handleRetry} />}
      {loading && <CardSkeletonLoader />}
      {!loading && !error && products.length === 0 && <EmptyState message="No products found." />}

      {!loading && products.length > 0 && (
        <>
          <ProductGrid products={products} />
          {!debouncedSearch && selectedCategory === "all" && totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" shape="rounded" showFirstButton showLastButton />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
