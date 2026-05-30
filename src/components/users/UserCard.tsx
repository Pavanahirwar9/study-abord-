// src/components/users/UserCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardActionArea, Avatar, Typography, Chip, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import { useRouter } from "next/navigation";
import { DummyUser } from "@/types/user";

interface UserCardProps { user: DummyUser; }

const UserCard = React.memo(function UserCard({ user }: UserCardProps) {
  const router = useRouter();
  return (
    <Card sx={{ height: "100%", "&:hover": { transform: "translateY(-2px)", boxShadow: 4 }, transition: "all 0.2s ease" }}>
      <CardActionArea onClick={() => router.push(`/users/${user.id}`)} sx={{ height: "100%", alignItems: "flex-start", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} sx={{ width: 52, height: 52 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{user.firstName} {user.lastName}</Typography>
              <Chip label={user.gender} size="small" color={user.gender === "female" ? "secondary" : "primary"} variant="outlined" sx={{ textTransform: "capitalize", mt: 0.5 }} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon fontSize="small" sx={{ color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary" noWrap>{user.email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon fontSize="small" sx={{ color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <BusinessIcon fontSize="small" sx={{ color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary" noWrap>{user.company.name}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default UserCard;
