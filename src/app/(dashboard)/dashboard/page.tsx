// src/app/(dashboard)/dashboard/page.tsx
"use client";

import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StatCard from "@/components/dashboard/StatCard";
import useUserStore from "@/store/userStore";
import useProductStore from "@/store/productStore";
import useAuthStore from "@/store/authStore";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { total: totalUsers, fetchUsers } = useUserStore();
  const { total: totalProducts, categories, fetchProducts, fetchCategories } = useProductStore();

  useEffect(() => {
    fetchUsers(1, 0);
    fetchProducts(1, 0);
    fetchCategories();
  }, [fetchUsers, fetchProducts, fetchCategories]);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} color="text.primary">
          {greeting}, {user?.firstName || "Admin"} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Here&apos;s what&apos;s happening in your dashboard today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Total Users" value={totalUsers || "—"} icon={<PeopleIcon />} color="#4F46E5" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Total Products" value={totalProducts || "—"} icon={<ShoppingBagIcon />} color="#0EA5E9" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Categories" value={categories.length || "—"} icon={<TrendingUpIcon />} color="#10B981" />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }} color="text.primary">
          Quick Access
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Navigate to <strong>Users</strong> or <strong>Products</strong> from the sidebar to manage data, search, and view details.
        </Typography>
      </Box>
    </Box>
  );
}
