"use client";

import { Box, Typography, Paper, Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import useAuthStore from "@/store/authStore";

const statCards = [
    { label: "Users", value: "1,240", icon: <PeopleIcon fontSize="large" />, color: "#667eea" },
    { label: "Products", value: "856", icon: <InventoryIcon fontSize="large" />, color: "#764ba2" },
    { label: "Active Sessions", value: "342", icon: <DashboardIcon fontSize="large" />, color: "#f093fb" },
];

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    return (
        <ProtectedRoute>
            <Navbar />
            <Box sx={{ maxWidth: 1100, mx: "auto", px: 3, py: 5 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Welcome back{user?.firstName ? `, ${user.firstName}` : ""}! 👋
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Here&apos;s a quick overview of your dashboard.
                </Typography>

                <Grid container spacing={3}>
                    {statCards.map((card) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={card.label}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    borderLeft: `4px solid ${card.color}`,
                                }}
                            >
                                <Box sx={{ color: card.color }}>{card.icon}</Box>
                                <Box>
                                    <Typography variant="h5" fontWeight={700}>
                                        {card.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.label}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ProtectedRoute>
    );
}
