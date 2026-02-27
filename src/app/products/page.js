"use client";

import { useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Alert,
    Chip,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import ProductCard, { ProductCardSkeleton } from "@/components/productCard";
import CategoryFilter from "@/components/categoryFilter";
import SearchBar from "@/components/searchBar";
import useProductStore from "@/store/productStore";

export default function ProductsPage() {
    const {
        products,
        total,
        categories,
        selectedCategory,
        searchQuery,
        page,
        limit,
        loading,
        error,
        fetchProducts,
        searchProducts,
        fetchCategories,
        setCategory,
        setPage,
        setSearchQuery,
        resetFilters,
    } = useProductStore();

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Re-fetch products when page or category changes (not during search)
    useEffect(() => {
        if (!searchQuery) {
            fetchProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedCategory, searchQuery]);

    /** Debounced search callback */
    const handleSearch = (term) => {
        if (term) {
            searchProducts(term);
        } else {
            resetFilters();
            fetchProducts();
        }
    };

    /** Category change handler */
    const handleCategoryChange = (cat) => {
        setCategory(cat);
    };

    const totalPages = Math.ceil(total / limit) || 1;

    return (
        <ProtectedRoute>
            <Navbar />
            <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 5 }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Products
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Browse and manage your product catalog.
                    </Typography>
                </Box>

                {/* Toolbar: Search + Category filter */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 4,
                        alignItems: "center",
                    }}
                >
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSearch={handleSearch}
                        placeholder="Search products…"
                    />
                    <CategoryFilter
                        categories={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    />
                </Box>

                {/* Error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Product Cards Grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 3,
                        mb: 4,
                    }}
                >
                    {loading
                        ? Array.from({ length: limit }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                        : products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </Box>

                {/* Empty state */}
                {!loading && products.length === 0 && (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                            color: "text.secondary",
                        }}
                    >
                        <InventoryIcon sx={{ fontSize: 56, mb: 1, opacity: 0.4 }} />
                        <Typography variant="h6" fontWeight={600}>
                            No products found
                        </Typography>
                        <Typography variant="body2">
                            Try adjusting your search or category filter.
                        </Typography>
                    </Box>
                )}

                {/* Pagination */}
                {!searchQuery && !loading && products.length > 0 && (
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
                            onClick={() => setPage(page - 1)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                borderColor: "#764ba2",
                                color: "#764ba2",
                                "&:hover": {
                                    borderColor: "#667eea",
                                    bgcolor: "rgba(118,75,162,0.06)",
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
                                borderColor: "#764ba2",
                                color: "#764ba2",
                            }}
                        />

                        <Button
                            variant="outlined"
                            endIcon={<NavigateNextIcon />}
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                borderColor: "#764ba2",
                                color: "#764ba2",
                                "&:hover": {
                                    borderColor: "#667eea",
                                    bgcolor: "rgba(118,75,162,0.06)",
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
