"use client";

import { useRouter, usePathname } from "next/navigation";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Chip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import useAuthStore from "@/store/authStore";

const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { label: "Users", href: "/users", icon: <PeopleIcon fontSize="small" /> },
    { label: "Products", href: "/products", icon: <InventoryIcon fontSize="small" /> },
];

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mr: 3 }}>
                        MyApp
                    </Typography>
                    {navLinks.map((link) => (
                        <Button
                            key={link.href}
                            startIcon={link.icon}
                            onClick={() => router.push(link.href)}
                            sx={{
                                color: "#fff",
                                textTransform: "none",
                                fontWeight: pathname === link.href ? 700 : 400,
                                backgroundColor:
                                    pathname === link.href ? "rgba(255,255,255,0.15)" : "transparent",
                                borderRadius: 2,
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                            }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {user && (
                        <Chip
                            label={user.firstName || user.username || "User"}
                            sx={{
                                color: "#fff",
                                borderColor: "rgba(255,255,255,0.4)",
                                fontWeight: 600,
                            }}
                            variant="outlined"
                        />
                    )}
                    <Button
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
