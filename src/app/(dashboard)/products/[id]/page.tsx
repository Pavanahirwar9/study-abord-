// src/app/(dashboard)/products/[id]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box, Grid, Card, CardContent, Typography, Button, Chip,
  Divider, Rating, LinearProgress, Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import InventoryIcon from "@mui/icons-material/Inventory";
import StarIcon from "@mui/icons-material/Star";
import useProductStore from "@/store/productStore";
import { DetailSkeletonLoader } from "@/components/common/SkeletonLoader";
import ErrorAlert from "@/components/common/ErrorAlert";
import { formatCurrency, formatDiscount, capitalize } from "@/lib/formatters";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  const { currentProduct, loading, error, fetchProductById, clearError, clearCurrentProduct } = useProductStore();

  useEffect(() => {
    if (productId) fetchProductById(productId);
    return () => clearCurrentProduct();
  }, [productId, fetchProductById, clearCurrentProduct]);

  useEffect(() => { if (error) toast.error(error); }, [error]);

  if (loading) return <DetailSkeletonLoader />;
  if (error) return <ErrorAlert message={error} onRetry={() => { clearError(); fetchProductById(productId); }} />;
  if (!currentProduct) return null;

  const p = currentProduct;
  const discountedPrice = p.price * (1 - p.discountPercentage / 100);

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.push("/products")} variant="outlined" sx={{ mb: 3 }}>
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Images */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ mb: 2, overflow: "hidden" }}>
            <Box component="img" src={p.thumbnail} alt={p.title} sx={{ width: "100%", height: 320, objectFit: "contain", p: 2, backgroundColor: "#F8FAFC" }} />
          </Card>
          {/* Simple image map — Step 3: no carousel */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {p.images.map((img, idx) => (
              <Box key={idx} component="img" src={img} alt={`${p.title} image ${idx + 1}`}
                sx={{ width: 72, height: 72, objectFit: "contain", borderRadius: 2, border: "2px solid", borderColor: "divider", p: 0.5, bgcolor: "#F8FAFC", cursor: "pointer", "&:hover": { borderColor: "primary.main" }, transition: "border-color 0.15s" }}
              />
            ))}
          </Box>
        </Grid>

        {/* Details */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <Chip label={capitalize(p.category)} color="primary" size="small" variant="outlined" />
            {p.brand && <Chip label={p.brand} size="small" variant="outlined" />}
          </Stack>

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{p.title}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Rating value={p.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">{p.rating} out of 5 ({p.reviews.length} reviews)</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">{formatCurrency(discountedPrice)}</Typography>
            {p.discountPercentage > 0 && (
              <>
                <Typography variant="h6" color="text.disabled" sx={{ textDecoration: "line-through" }}>{formatCurrency(p.price)}</Typography>
                <Chip label={formatDiscount(p.discountPercentage)} color="error" size="small" />
              </>
            )}
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>{p.description}</Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { label: "Stock", value: `${p.stock} units`, icon: <InventoryIcon fontSize="small" /> },
              { label: "SKU", value: p.sku },
              { label: "Shipping", value: p.shippingInformation, icon: <LocalShippingIcon fontSize="small" /> },
              { label: "Warranty", value: p.warrantyInformation, icon: <VerifiedIcon fontSize="small" /> },
              { label: "Return Policy", value: p.returnPolicy },
              { label: "Availability", value: p.availabilityStatus },
            ].map(({ label, value, icon }) => (
              <Grid key={label} size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  {icon && <Box sx={{ color: "primary.main", mt: 0.3 }}>{icon}</Box>}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{value}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">Stock Level</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{p.stock} units</Typography>
            </Box>
            <LinearProgress variant="determinate" value={Math.min((p.stock / 100) * 100, 100)} sx={{ height: 6, borderRadius: 4 }} color={p.stock > 50 ? "success" : p.stock > 20 ? "warning" : "error"} />
          </Box>
        </Grid>

        {/* Reviews */}
        {p.reviews.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  <StarIcon sx={{ mr: 1, color: "warning.main", verticalAlign: "middle" }} />
                  Customer Reviews
                </Typography>
                <Grid container spacing={2}>
                  {p.reviews.slice(0, 3).map((review, idx) => (
                    <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="body2" sx={{ mt: 1, mb: 1, fontStyle: "italic" }}>&ldquo;{review.comment}&rdquo;</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>— {review.reviewerName}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
