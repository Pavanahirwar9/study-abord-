// src/components/dashboard/StatCard.tsx
"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = React.memo(function StatCard({ title, value, icon, color = "#4F46E5" }: StatCardProps) {
  return (
    <Card sx={{ height: "100%", background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, border: `1px solid ${color}20`, transition: "transform 0.2s ease, box-shadow 0.2s ease", "&:hover": { transform: "translateY(-2px)" } }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: color }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 700, color, mb: 0.5 }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{title}</Typography>
      </CardContent>
    </Card>
  );
});

export default StatCard;
