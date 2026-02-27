"use client";

import { useEffect, useCallback, useRef } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    InputAdornment,
    Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import UserCard, { UserCardSkeleton } from "@/components/userCard";
import useUserStore from "@/store/userStore";

export default function UsersPage() {
    const {
        users,
        total,
        loading,
        error,
        page,
        limit,
        searchQuery,
        fetchUsers,
        searchUsers,
        setPage,
        setSearchQuery,
        resetSearch,
    } = useUserStore();

    const debounceRef = useRef(null);

    // Fetch users whenever page changes (and there's no active search)
    useEffect(() => {
        if (!searchQuery) {
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchQuery]);

    /** Debounced search handler */
    const handleSearchChange = useCallback(
        (e) => {
            const value = e.target.value;
            setSearchQuery(value);

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
                if (value.trim()) {
                    searchUsers(value.trim());
                } else {
                    resetSearch();
                    fetchUsers();
                }
            }, 400);
        },
        [setSearchQuery, searchUsers, resetSearch, fetchUsers]
    );

    const totalPages = Math.ceil(total / limit) || 1;

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
            if (searchQuery) fetchUsers(); // re-trigger for paginated search isn't supported, so keep list
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 5 }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Users
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage and view all registered users.
                    </Typography>
                </Box>

                {/* Search Bar */}
                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Search users by name…"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "text.secondary" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            maxWidth: 480,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "&:hover fieldset": { borderColor: "#667eea" },
                                "&.Mui-focused fieldset": { borderColor: "#667eea" },
                            },
                        }}
                    />
                </Box>

                {/* Error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* User Cards Grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                        mb: 4,
                    }}
                >
                    {loading
                        ? Array.from({ length: limit }).map((_, i) => (
                            <UserCardSkeleton key={i} />
                        ))
                        : users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                </Box>

                {/* Empty state */}
                {!loading && users.length === 0 && (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                            color: "text.secondary",
                        }}
                    >
                        <PeopleIcon sx={{ fontSize: 56, mb: 1, opacity: 0.4 }} />
                        <Typography variant="h6" fontWeight={600}>
                            No users found
                        </Typography>
                        <Typography variant="body2">
                            Try adjusting your search query.
                        </Typography>
                    </Box>
                )}

                {/* Pagination (hidden during search since DummyJSON search doesn't paginate) */}
                {!searchQuery && !loading && users.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<NavigateBeforeIcon />}
                            disabled={page <= 1}
                            onClick={handlePrev}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                borderColor: "#667eea",
                                color: "#667eea",
                                "&:hover": {
                                    borderColor: "#764ba2",
                                    bgcolor: "rgba(102,126,234,0.06)",
                                },
                            }}
                        >
                            Previous
                        </Button>

                        <Chip
                            label={`Page ${page} of ${totalPages}`}
                            variant="outlined"
                            sx={{
                                fontWeight: 600,
                                borderColor: "#667eea",
                                color: "#667eea",
                            }}
                        />

                        <Button
                            variant="outlined"
                            endIcon={<NavigateNextIcon />}
                            disabled={page >= totalPages}
                            onClick={handleNext}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                borderColor: "#667eea",
                                color: "#667eea",
                                "&:hover": {
                                    borderColor: "#764ba2",
                                    bgcolor: "rgba(102,126,234,0.06)",
                                },
                            }}
                        >
                            Next
                        </Button>
                    </Box>
                )}
            </Box>
        </ProtectedRoute>
    );
}
