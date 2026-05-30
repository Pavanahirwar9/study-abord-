// src/app/(dashboard)/users/page.tsx
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box, Typography, TextField, InputAdornment, Pagination,
  useMediaQuery, useTheme, Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useUserStore from "@/store/userStore";
import UserTable from "@/components/users/UserTable";
import UserCard from "@/components/users/UserCard";
import { TableSkeletonLoader } from "@/components/common/SkeletonLoader";
import ErrorAlert from "@/components/common/ErrorAlert";
import EmptyState from "@/components/common/EmptyState";
import useDebounce from "@/lib/useDebounce";
import toast from "react-hot-toast";

const LIMIT = 10;

export default function UsersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { users, total, loading, error, fetchUsers, searchUsersByQuery, clearError } = useUserStore();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);

  // useMemo — only recalculates when total changes
  const totalPages = useMemo(() => Math.ceil(total / LIMIT), [total]);

  useEffect(() => {
    if (!debouncedSearch) fetchUsers(LIMIT, (page - 1) * LIMIT);
  }, [page, debouncedSearch, fetchUsers]);

  useEffect(() => {
    if (debouncedSearch) { searchUsersByQuery(debouncedSearch); }
  }, [debouncedSearch, searchUsersByQuery]);

  useEffect(() => { if (error) toast.error(error); }, [error]);

  // useCallback — stable handler references (Step 15)
  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  }, []);

  const handleRetry = useCallback(() => {
    clearError();
    fetchUsers(LIMIT, (page - 1) * LIMIT);
  }, [clearError, fetchUsers, page]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Users</Typography>
          <Typography variant="body2" color="text.secondary">
            {total > 0 ? `${total} users total` : "Manage and view all users"}
          </Typography>
        </Box>
        <TextField
          id="user-search"
          placeholder="Search users..."
          value={searchInput}
          onChange={handleSearchChange}
          size="small"
          sx={{ width: { xs: "100%", sm: 280 } }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><SearchIcon color="action" fontSize="small" /></InputAdornment>,
            },
          }}
        />
      </Box>

      {error && <ErrorAlert message={error} onRetry={handleRetry} />}
      {loading && <TableSkeletonLoader />}
      {!loading && !error && users.length === 0 && <EmptyState message="No users found." />}

      {!loading && users.length > 0 && (
        <>
          {isMobile ? (
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid key={user.id} size={{ xs: 12 }}><UserCard user={user} /></Grid>
              ))}
            </Grid>
          ) : (
            <UserTable users={users} />
          )}
          {!debouncedSearch && totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" shape="rounded" showFirstButton showLastButton />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
