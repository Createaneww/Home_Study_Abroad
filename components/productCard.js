"use client";

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Chip,
    Rating,
    Skeleton,
} from "@mui/material";
import Link from "next/link";

/**
 * Displays a single product in a styled MUI card with hover effects.
 */
export default function ProductCard({ product }) {
    return (
        <Card
            component={Link}
            href={`/products/${product.id}`}
            elevation={1}
            sx={{
                textDecoration: "none",
                color: "inherit",
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                    elevation: 8,
                    boxShadow: "0 12px 40px rgba(118,75,162,0.15)",
                    borderColor: "#764ba2",
                    transform: "translateY(-4px) scale(1.01)",
                },
            }}
        >
            {/* Product Image */}
            <CardMedia
                component="img"
                height="200"
                image={product.thumbnail}
                alt={product.title}
                sx={{
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    "&:hover": { transform: "scale(1.05)" },
                }}
            />

            <CardContent sx={{ p: 2.5 }}>
                {/* Category Chip */}
                <Chip
                    label={product.category}
                    size="small"
                    sx={{
                        mb: 1,
                        fontWeight: 600,
                        fontSize: "0.68rem",
                        textTransform: "capitalize",
                        bgcolor: "rgba(118,75,162,0.1)",
                        color: "#764ba2",
                    }}
                />

                {/* Title */}
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    noWrap
                    sx={{ mb: 0.5 }}
                >
                    {product.title}
                </Typography>

                {/* Price + Discount */}
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ color: "#667eea" }}
                    >
                        ${product.price}
                    </Typography>
                    {product.discountPercentage > 0 && (
                        <Chip
                            label={`-${Math.round(product.discountPercentage)}%`}
                            size="small"
                            sx={{
                                fontWeight: 700,
                                fontSize: "0.65rem",
                                bgcolor: "rgba(76,175,80,0.12)",
                                color: "#2e7d32",
                                height: 20,
                            }}
                        />
                    )}
                </Box>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Rating
                        value={product.rating}
                        precision={0.1}
                        size="small"
                        readOnly
                        sx={{
                            "& .MuiRating-iconFilled": { color: "#f59e0b" },
                        }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        ({product.rating})
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

/**
 * Skeleton placeholder for product cards during loading.
 */
export function ProductCardSkeleton() {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Skeleton variant="rectangular" height={200} animation="wave" />
            <CardContent sx={{ p: 2.5 }}>
                <Skeleton
                    variant="rounded"
                    width={80}
                    height={22}
                    sx={{ mb: 1, borderRadius: 3 }}
                />
                <Skeleton variant="text" width="85%" height={26} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={20} />
            </CardContent>
        </Card>
    );
}
