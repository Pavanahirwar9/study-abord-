// src/components/products/ProductCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography, Box, Chip, Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { DummyProduct } from "@/types/product";
import { formatCurrency, formatDiscount, capitalize } from "@/lib/formatters";

interface ProductCardProps { product: DummyProduct; }

/**
 * ProductCard — React.memo prevents re-render when product prop is stable.
 * Critical in a grid of 12+ cards — avoids many wasted renders.
 */
const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", "&:hover": { transform: "translateY(-3px)", boxShadow: 6 }, transition: "all 0.2s ease" }}>
      <CardActionArea onClick={() => router.push(`/products/${product.id}`)} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{ height: 180, objectFit: "contain", p: 2, backgroundColor: "#F8FAFC", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)" } }}
          />
          {product.discountPercentage > 5 && (
            <Chip label={formatDiscount(product.discountPercentage)} size="small" color="error" sx={{ position: "absolute", top: 8, right: 8, fontWeight: 700, fontSize: "0.7rem" }} />
          )}
        </Box>
        <CardContent sx={{ flex: 1, pb: 2 }}>
          <Chip label={capitalize(product.category)} size="small" variant="outlined" color="primary" sx={{ mb: 1, fontSize: "0.7rem" }} />
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {product.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">({product.rating})</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }} color="primary">
              {formatCurrency(discountedPrice)}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography variant="body2" color="text.disabled" sx={{ textDecoration: "line-through" }}>
                {formatCurrency(product.price)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ProductCard;
