// src/components/products/ProductGrid.tsx
"use client";

import React from "react";
import { Grid } from "@mui/material";
import { DummyProduct } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps { products: DummyProduct[]; }

/**
 * ProductGrid — responsive MUI Grid container for ProductCards.
 * MUI v6 Grid uses `size` prop instead of `item xs sm md lg`.
 * Breakpoints: xs=12, sm=6, md=4, lg=3 (Step 16)
 */
const ProductGrid = React.memo(function ProductGrid({ products }: ProductGridProps) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
});

export default ProductGrid;
