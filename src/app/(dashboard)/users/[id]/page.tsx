// src/app/(dashboard)/users/[id]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box, Grid, Card, CardContent, Typography, Avatar, Chip, Button, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import useUserStore from "@/store/userStore";
import { DetailSkeletonLoader } from "@/components/common/SkeletonLoader";
import ErrorAlert from "@/components/common/ErrorAlert";
import { formatDate } from "@/lib/formatters";
import toast from "react-hot-toast";

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 1 }}>
      <Box sx={{ color: "primary.main", mt: 0.2 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{value}</Typography>
      </Box>
    </Box>
  );
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.id);
  const { currentUser, loading, error, fetchUserById, clearError, clearCurrentUser } = useUserStore();

  useEffect(() => {
    if (userId) fetchUserById(userId);
    return () => clearCurrentUser();
  }, [userId, fetchUserById, clearCurrentUser]);

  useEffect(() => { if (error) toast.error(error); }, [error]);

  if (loading) return <DetailSkeletonLoader />;
  if (error) return <ErrorAlert message={error} onRetry={() => { clearError(); fetchUserById(userId); }} />;
  if (!currentUser) return null;

  const u = currentUser;
  const fullAddress = `${u.address.address}, ${u.address.city}, ${u.address.state} ${u.address.postalCode}, ${u.address.country}`;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.push("/users")} sx={{ mb: 3 }} variant="outlined">
        Back to Users
      </Button>

      <Grid container spacing={3}>
        {/* Profile card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ textAlign: "center", p: 3 }}>
            <Avatar src={u.image} alt={`${u.firstName} ${u.lastName}`} sx={{ width: 100, height: 100, mx: "auto", mb: 2, border: "4px solid", borderColor: "primary.light" }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{u.firstName} {u.lastName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>@{u.username}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
              <Chip label={u.gender} color={u.gender === "female" ? "secondary" : "primary"} size="small" sx={{ textTransform: "capitalize" }} />
              <Chip label={`Age ${u.age}`} variant="outlined" size="small" />
              <Chip label={u.bloodGroup} color="error" size="small" icon={<BloodtypeIcon />} />
            </Box>
          </Card>
        </Grid>

        {/* Details */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Contact Information</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <InfoRow icon={<EmailIcon fontSize="small" />} label="Email" value={u.email} />
                  <InfoRow icon={<PhoneIcon fontSize="small" />} label="Phone" value={u.phone} />
                  <InfoRow icon={<CakeIcon fontSize="small" />} label="Birth Date" value={formatDate(u.birthDate)} />
                  <InfoRow icon={<LocationOnIcon fontSize="small" />} label="Address" value={fullAddress} />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Company</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <InfoRow icon={<BusinessIcon fontSize="small" />} label="Company" value={u.company.name} />
                  <InfoRow icon={<BusinessIcon fontSize="small" />} label="Department" value={u.company.department} />
                  <InfoRow icon={<BusinessIcon fontSize="small" />} label="Title" value={u.company.title} />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Education</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <InfoRow icon={<SchoolIcon fontSize="small" />} label="University" value={u.university} />
                  <InfoRow icon={<BloodtypeIcon fontSize="small" />} label="Blood Group" value={u.bloodGroup} />
                  <InfoRow icon={<CakeIcon fontSize="small" />} label="Age" value={`${u.age} years old`} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
