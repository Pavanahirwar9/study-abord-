// src/components/common/ErrorAlert.tsx
"use client";

import { Alert, AlertTitle, Button, Box } from "@mui/material";
import React from "react";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

const ErrorAlert = React.memo(function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <Box sx={{ my: 4 }}>
      <Alert
        severity="error"
        sx={{ borderRadius: 2 }}
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : undefined
        }
      >
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
});

export default ErrorAlert;
