"use client";

import { Box, Typography, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function UsersPage() {
    return (
        <ProtectedRoute>
            <Navbar />
            <Box sx={{ maxWidth: 1100, mx: "auto", px: 3, py: 5 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Users
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Manage and view all registered users.
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
                    <PeopleIcon sx={{ fontSize: 64, color: "#667eea", mb: 2 }} />
                    <Typography variant="h6" fontWeight={600}>
                        Users list will appear here
                    </Typography>
                    <Typography variant="body2">
                        Connect this page to your user data source to display user cards.
                    </Typography>
                </Paper>
            </Box>
        </ProtectedRoute>
    );
}
