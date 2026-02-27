"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    Divider,
    Button,
    Skeleton,
    Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { getUserById } from "@/services/api";

export default function UserDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to load user details."
                );
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchUser();
    }, [id]);

    /** Reusable info row */
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

    const iconSx = { fontSize: 20, color: "#667eea", mt: 0.3 };

    return (
        <ProtectedRoute>
            <Navbar />
            <Box sx={{ maxWidth: 800, mx: "auto", px: 3, py: 5 }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push("/users")}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#667eea",
                        mb: 3,
                        "&:hover": { bgcolor: "rgba(102,126,234,0.08)" },
                    }}
                >
                    Back to Users
                </Button>

                {/* Error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Skeleton / Content */}
                <Paper
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    {/* Header gradient band */}
                    <Box
                        sx={{
                            height: 120,
                            background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                    />

                    <Box sx={{ px: 4, pb: 4, mt: -7 }}>
                        {loading ? (
                            /* -------- Skeleton -------- */
                            <>
                                <Skeleton
                                    variant="circular"
                                    width={100}
                                    height={100}
                                    sx={{ border: "4px solid #fff" }}
                                />
                                <Skeleton
                                    variant="text"
                                    width={200}
                                    height={36}
                                    sx={{ mt: 2 }}
                                />
                                <Skeleton variant="text" width={260} height={22} />
                                <Divider sx={{ my: 3 }} />
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            display: "flex",
                                            gap: 1.5,
                                            mb: 1.5,
                                        }}
                                    >
                                        <Skeleton
                                            variant="circular"
                                            width={22}
                                            height={22}
                                        />
                                        <Box>
                                            <Skeleton
                                                variant="text"
                                                width={80}
                                                height={14}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={160}
                                                height={20}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </>
                        ) : user ? (
                            /* -------- Loaded content -------- */
                            <>
                                <Avatar
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        border: "4px solid #fff",
                                        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                                    }}
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    sx={{ mt: 2 }}
                                >
                                    {user.firstName} {user.lastName}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mt: 0.5,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        @{user.username}
                                    </Typography>
                                    <Chip
                                        label={user.gender}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "0.7rem",
                                            textTransform: "capitalize",
                                            bgcolor:
                                                user.gender === "male"
                                                    ? "rgba(102,126,234,0.12)"
                                                    : "rgba(236,72,153,0.12)",
                                            color:
                                                user.gender === "male"
                                                    ? "#667eea"
                                                    : "#ec4899",
                                        }}
                                    />
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                {/* Info Grid */}
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: {
                                            xs: "1fr",
                                            sm: "1fr 1fr",
                                        },
                                        gap: 1,
                                    }}
                                >
                                    <InfoRow
                                        icon={<EmailIcon sx={iconSx} />}
                                        label="Email"
                                        value={user.email}
                                    />
                                    <InfoRow
                                        icon={<PhoneIcon sx={iconSx} />}
                                        label="Phone"
                                        value={user.phone}
                                    />
                                    <InfoRow
                                        icon={<CakeIcon sx={iconSx} />}
                                        label="Age"
                                        value={user.age}
                                    />
                                    <InfoRow
                                        icon={<WcIcon sx={iconSx} />}
                                        label="Gender"
                                        value={user.gender}
                                    />
                                    <InfoRow
                                        icon={<LocationOnIcon sx={iconSx} />}
                                        label="Address"
                                        value={
                                            user.address
                                                ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}`
                                                : null
                                        }
                                    />
                                    <InfoRow
                                        icon={<BusinessIcon sx={iconSx} />}
                                        label="Company"
                                        value={
                                            user.company
                                                ? `${user.company.name} — ${user.company.title}`
                                                : null
                                        }
                                    />
                                    <InfoRow
                                        icon={<SchoolIcon sx={iconSx} />}
                                        label="University"
                                        value={user.university}
                                    />
                                </Box>
                            </>
                        ) : null}
                    </Box>
                </Paper>
            </Box>
        </ProtectedRoute>
    );
}
