"use client";

import { Box, Typography, Paper } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function ProductsPage() {
    return (
        <ProtectedRoute>
            <Navbar />
            <Box sx={{ maxWidth: 1100, mx: "auto", px: 3, py: 5 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Products
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Browse and manage your product catalog.
                </Typography>

                <Paper
                    elevation={1}
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        textAlign: "center",
                        color: "text.secondary",
                    }}
                >
                    <InventoryIcon sx={{ fontSize: 64, color: "#764ba2", mb: 2 }} />
                    <Typography variant="h6" fontWeight={600}>
                        Products list will appear here
                    </Typography>
                    <Typography variant="body2">
                        Connect this page to your product data source to display product cards.
                    </Typography>
                </Paper>
            </Box>
        </ProtectedRoute>
    );
}
