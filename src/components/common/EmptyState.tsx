// src/components/common/EmptyState.tsx
"use client";

import { Box, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import React from "react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = React.memo(function EmptyState({
  message = "No results found.",
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        gap: 2,
        color: "text.secondary",
      }}
    >
      <InboxIcon sx={{ fontSize: 64, opacity: 0.3 }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      <Typography variant="body2" color="text.disabled">
        Try adjusting your search or filters.
      </Typography>
    </Box>
  );
});

export default EmptyState;
