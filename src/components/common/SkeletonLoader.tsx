// src/components/common/SkeletonLoader.tsx
"use client";

import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

export const TableSkeletonLoader = React.memo(function TableSkeletonLoader() {
  return (
    <Box>
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={52} sx={{ mb: 1, borderRadius: 1 }} animation="wave" />
      ))}
    </Box>
  );
});

export const CardSkeletonLoader = React.memo(function CardSkeletonLoader() {
  return (
    <Grid container spacing={3}>
      {[...Array(12)].map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card>
            <Skeleton variant="rectangular" height={200} animation="wave" />
            <CardContent>
              <Skeleton variant="text" width="80%" animation="wave" />
              <Skeleton variant="text" width="50%" animation="wave" />
              <Skeleton variant="text" width="40%" animation="wave" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export const DetailSkeletonLoader = React.memo(function DetailSkeletonLoader() {
  return (
    <Box>
      <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2, mb: 3 }} animation="wave" />
      <Skeleton variant="text" width="60%" height={40} animation="wave" />
      <Skeleton variant="text" width="40%" animation="wave" />
      <Skeleton variant="text" width="30%" animation="wave" />
      <Box sx={{ mt: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="text" animation="wave" />
        ))}
      </Box>
    </Box>
  );
});
