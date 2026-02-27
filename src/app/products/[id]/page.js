"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Paper,
    Chip,
    Divider,
    Button,
    Rating,
    Skeleton,
    Alert,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import InventoryIcon from "@mui/icons-material/Inventory";
import DiscountIcon from "@mui/icons-material/Discount";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { getProductById } from "@/services/api";

/**
 * Custom image carousel with smooth CSS transitions and thumbnail strip.
 */
function ImageCarousel({ images = [] }) {
    const [activeIdx, setActiveIdx] = useState(0);

    // Auto-advance every 4 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    if (!images.length) return null;

    const goNext = () => setActiveIdx((prev) => (prev + 1) % images.length);
    const goPrev = () =>
        setActiveIdx((prev) => (prev - 1 + images.length) % images.length);

    return (
        <Box>
            {/* Main image container */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 280, sm: 380 },
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "#f8f9fa",
                }}
            >
                {images.map((src, i) => (
                    <Box
                        key={i}
                        component="img"
                        src={src}
                        alt={`Product image ${i + 1}`}
                        sx={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            opacity: i === activeIdx ? 1 : 0,
                            transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    />
                ))}

                {/* Nav arrows */}
                {images.length > 1 && (
                    <>
                        <IconButton
                            onClick={goPrev}
                            sx={{
                                position: "absolute",
                                left: 8,
                                top: "50%",
                                transform: "translateY(-50%)",
                                bgcolor: "rgba(255,255,255,0.85)",
                                "&:hover": { bgcolor: "#fff" },
                                boxShadow: 2,
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            onClick={goNext}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: "50%",
                                transform: "translateY(-50%)",
                                bgcolor: "rgba(255,255,255,0.85)",
                                "&:hover": { bgcolor: "#fff" },
                                boxShadow: 2,
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </>
                )}

                {/* Dot indicators */}
                {images.length > 1 && (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 12,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: 0.8,
                        }}
                    >
                        {images.map((_, i) => (
                            <Box
                                key={i}
                                onClick={() => setActiveIdx(i)}
                                sx={{
                                    width: i === activeIdx ? 24 : 8,
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: i === activeIdx ? "#764ba2" : "rgba(0,0,0,0.25)",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                }}
                            />
                        ))}
                    </Box>
                )}
            </Box>

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        mt: 2,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {images.map((src, i) => (
                        <Box
                            key={i}
                            component="img"
                            src={src}
                            alt={`Thumb ${i + 1}`}
                            onClick={() => setActiveIdx(i)}
                            sx={{
                                width: 64,
                                height: 64,
                                objectFit: "cover",
                                borderRadius: 2,
                                cursor: "pointer",
                                border: "2px solid",
                                borderColor: i === activeIdx ? "#764ba2" : "transparent",
                                opacity: i === activeIdx ? 1 : 0.6,
                                transition: "all 0.25s ease",
                                "&:hover": { opacity: 1, borderColor: "#764ba2" },
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to load product details."
                );
            } finally {
                setLoading(false);
            }
        };
        if (id) fetch();
    }, [id]);

    const InfoRow = ({ icon, label, value }) => (
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.5 }}>
            {icon}
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                    {label}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {value || "—"}
                </Typography>
            </Box>
        </Box>
    );

    const iconSx = { fontSize: 20, color: "#764ba2", mt: 0.3 };

    return (
        <ProtectedRoute>
            <Navbar />
            <Box sx={{ maxWidth: 1000, mx: "auto", px: 3, py: 5 }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push("/products")}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#764ba2",
                        mb: 3,
                        "&:hover": { bgcolor: "rgba(118,75,162,0.08)" },
                    }}
                >
                    Back to Products
                </Button>

                {/* Error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Paper
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        overflow: "hidden",
                        p: { xs: 2, sm: 4 },
                    }}
                >
                    {loading ? (
                        /* ──── Skeleton ──── */
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                gap: 4,
                            }}
                        >
                            <Skeleton
                                variant="rounded"
                                height={350}
                                sx={{ borderRadius: 3 }}
                                animation="wave"
                            />
                            <Box>
                                <Skeleton variant="text" width="40%" height={28} />
                                <Skeleton variant="text" width="80%" height={38} sx={{ mb: 1 }} />
                                <Skeleton variant="text" width="30%" height={40} sx={{ mb: 1 }} />
                                <Skeleton variant="text" width="50%" height={24} sx={{ mb: 2 }} />
                                <Divider sx={{ my: 2 }} />
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                                        <Skeleton variant="circular" width={22} height={22} />
                                        <Box>
                                            <Skeleton variant="text" width={70} height={14} />
                                            <Skeleton variant="text" width={140} height={20} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ) : product ? (
                        /* ──── Content ──── */
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                gap: 4,
                            }}
                        >
                            {/* Image carousel */}
                            <ImageCarousel images={product.images} />

                            {/* Details */}
                            <Box>
                                <Chip
                                    label={product.category}
                                    size="small"
                                    sx={{
                                        mb: 1,
                                        fontWeight: 600,
                                        fontSize: "0.7rem",
                                        textTransform: "capitalize",
                                        bgcolor: "rgba(118,75,162,0.1)",
                                        color: "#764ba2",
                                    }}
                                />

                                <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                                    {product.title}
                                </Typography>

                                {/* Price */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: 1.5,
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h4"
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
                                                bgcolor: "rgba(76,175,80,0.12)",
                                                color: "#2e7d32",
                                            }}
                                        />
                                    )}
                                </Box>

                                {/* Rating */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Rating
                                        value={product.rating}
                                        precision={0.1}
                                        readOnly
                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                                color: "#f59e0b",
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        {product.rating} / 5
                                    </Typography>
                                </Box>

                                {/* Description */}
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2, lineHeight: 1.7 }}
                                >
                                    {product.description}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Specs grid */}
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                        gap: 1,
                                    }}
                                >
                                    <InfoRow
                                        icon={<BrandingWatermarkIcon sx={iconSx} />}
                                        label="Brand"
                                        value={product.brand}
                                    />
                                    <InfoRow
                                        icon={<CategoryIcon sx={iconSx} />}
                                        label="Category"
                                        value={product.category}
                                    />
                                    <InfoRow
                                        icon={<InventoryIcon sx={iconSx} />}
                                        label="Stock"
                                        value={`${product.stock} units`}
                                    />
                                    <InfoRow
                                        icon={<DiscountIcon sx={iconSx} />}
                                        label="Discount"
                                        value={`${product.discountPercentage}%`}
                                    />
                                    <InfoRow
                                        icon={<LocalShippingIcon sx={iconSx} />}
                                        label="Shipping"
                                        value={product.shippingInformation}
                                    />
                                    <InfoRow
                                        icon={<VerifiedIcon sx={iconSx} />}
                                        label="Warranty"
                                        value={product.warrantyInformation}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    ) : null}
                </Paper>
            </Box>
        </ProtectedRoute>
    );
}
