// src/components/layout/Sidebar.tsx
"use client";

import React from "react";
import {
  Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, Avatar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  { label: "Users", href: "/users", icon: <PeopleIcon /> },
  { label: "Products", href: "/products", icon: <ShoppingBagIcon /> },
];

interface SidebarProps { onClose?: () => void; }

const Sidebar = React.memo(function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleNav = (href: string) => { router.push(href); onClose?.(); };

  const handleLogout = async () => {
    clearAuth();
    await signOut({ redirect: false });
    toast.success("Logged out successfully.");
    router.push("/login");
    onClose?.();
  };

  return (
    <Box sx={{ width: 260, height: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)", color: "#fff" }}>
      {/* Logo */}
      <Box sx={{ px: 3, py: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ width: 36, height: 36, borderRadius: 2, background: "linear-gradient(135deg, #818CF8, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SchoolIcon sx={{ fontSize: 20, color: "#fff" }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, color: "#fff" }}>
            Help Study
          </Typography>
          <Typography variant="caption" sx={{ color: "#A5B4FC" }}>Abroad</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 1 }} />

      <List sx={{ flex: 1, px: 1.5 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNav(item.href)}
                sx={{
                  borderRadius: 2, px: 2, py: 1.2,
                  backgroundColor: isActive ? "rgba(129,140,248,0.2)" : "transparent",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                  borderLeft: isActive ? "3px solid #818CF8" : "3px solid transparent",
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "#818CF8" : "rgba(255,255,255,0.5)", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {user && (
        <Box sx={{ px: 2, py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Avatar src={user.image} alt={user.firstName} sx={{ width: 36, height: 36, border: "2px solid rgba(255,255,255,0.2)" }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#fff" }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#A5B4FC" }}>{user.email}</Typography>
            </Box>
          </Box>
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, px: 2, py: 1, color: "#FDA4AF", "&:hover": { backgroundColor: "rgba(239,68,68,0.1)" } }}>
            <ListItemIcon sx={{ color: "#FDA4AF", minWidth: 36 }}><LogoutIcon fontSize="small" /></ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Logout
                </Typography>
              }
            />
          </ListItemButton>
        </Box>
      )}
    </Box>
  );
});

export default Sidebar;
