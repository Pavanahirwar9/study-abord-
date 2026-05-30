// src/app/(auth)/login/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SchoolIcon from "@mui/icons-material/School";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!username.trim() || !password.trim()) {
        setError("Please enter both username and password.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await signIn("credentials", {
          username: username.trim(),
          password: password.trim(),
          redirect: false,
        });
        if (result?.error) {
          setError("Invalid username or password. Try: emilys / emilyspass");
          toast.error("Login failed. Check your credentials.");
        } else {
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username.trim(), password: password.trim() }),
          });
          const data = await res.json();
          if (data.accessToken) {
            setAuth(data.accessToken, {
              id: data.id,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              image: data.image,
            });
          }
          toast.success(`Welcome back, ${data.firstName || "Admin"}!`);
          router.push("/dashboard");
        }
      } catch {
        setError("Something went wrong. Please try again.");
        toast.error("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    },
    [username, password, router, setAuth]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 4, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Logo */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 64, height: 64, borderRadius: 3,
                background: "linear-gradient(135deg, #818CF8, #4F46E5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 2, boxShadow: "0 8px 24px rgba(79,70,229,0.4)",
              }}
            >
              <SchoolIcon sx={{ fontSize: 32, color: "#fff" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }} color="text.primary">
              Help Study Abroad
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Sign in to your admin dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              autoComplete="username"
              autoFocus
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              autoComplete="current-password"
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                "&:hover": { background: "linear-gradient(135deg, #4338CA, #6D28D9)" },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Sign In"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.disabled">Demo Credentials</Typography>
          </Divider>

          <Box sx={{ bgcolor: "action.hover", borderRadius: 2, p: 2 }}>
            <Typography variant="caption" sx={{ display: "block" }} color="text.secondary">
              <strong>Username:</strong> emilys
            </Typography>
            <Typography variant="caption" sx={{ display: "block" }} color="text.secondary">
              <strong>Password:</strong> emilyspass
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
