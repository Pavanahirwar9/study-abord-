// src/components/users/UserTable.tsx
"use client";

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Avatar, Box, Typography, Chip, IconButton, Tooltip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useRouter } from "next/navigation";
import { DummyUser } from "@/types/user";

interface UserTableProps { users: DummyUser[]; }

const UserTable = React.memo(function UserTable({ users }: UserTableProps) {
  const router = useRouter();

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none", overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover sx={{ cursor: "pointer", "&:last-child td": { border: 0 } }} onClick={() => router.push(`/users/${user.id}`)}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} sx={{ width: 36, height: 36 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.firstName} {user.lastName}</Typography>
                    <Typography variant="caption" color="text.secondary">@{user.username}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell><Typography variant="body2" color="text.secondary">{user.email}</Typography></TableCell>
              <TableCell>
                <Chip label={user.gender} size="small" color={user.gender === "female" ? "secondary" : "primary"} variant="outlined" sx={{ textTransform: "capitalize", fontWeight: 500 }} />
              </TableCell>
              <TableCell><Typography variant="body2" color="text.secondary">{user.phone}</Typography></TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.company.name}</Typography>
                <Typography variant="caption" color="text.secondary">{user.company.title}</Typography>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="View Details">
                  <IconButton size="small" color="primary"><OpenInNewIcon fontSize="small" /></IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default UserTable;
