// src/components/layout/DashboardLayout.tsx
"use client";

import React, { useState, useCallback } from "react";
import {
  Box, AppBar, Toolbar, IconButton, Typography, Drawer,
  useMediaQuery, useTheme, Avatar, Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import useAuthStore from "@/store/authStore";
import { usePathname } from "next/navigation";

const DRAWER_WIDTH = 260;

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/products": "Products",
};

interface DashboardLayoutProps { children: React.ReactNode; }

const DashboardLayout = React.memo(function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuthStore();
  const pathname = usePathname();

  const handleDrawerToggle = useCallback(() => setMobileOpen((prev) => !prev), []);
  const handleDrawerClose = useCallback(() => setMobileOpen(false), []);

  const pageTitle =
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ?? "Dashboard";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Desktop: permanent sidebar */}
      {!isMobile && (
        <Box component="nav" sx={{ width: DRAWER_WIDTH, flexShrink: 0, position: "fixed", height: "100vh", zIndex: theme.zIndex.drawer }}>
          <Sidebar />
        </Box>
      )}

      {/* Mobile: temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, border: "none" } }}
      >
        <Sidebar onClose={handleDrawerClose} />
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, ml: { md: `${DRAWER_WIDTH}px` }, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{ backgroundColor: "background.paper", borderBottom: "1px solid", borderColor: "divider", zIndex: theme.zIndex.appBar }}
        >
          <Toolbar sx={{ gap: 2 }}>
            {isMobile && (
              <IconButton edge="start" onClick={handleDrawerToggle} aria-label="open navigation menu" sx={{ color: "text.primary" }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }} color="text.primary">
              {pageTitle}
            </Typography>
            {user && (
              <Chip
                avatar={<Avatar src={user.image} alt={user.firstName} sx={{ width: 28, height: 28 }} />}
                label={`${user.firstName} ${user.lastName}`}
                variant="outlined"
                size="small"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
});

export default DashboardLayout;
