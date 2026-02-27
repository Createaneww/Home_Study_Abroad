"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAuthStore from "@/store/authStore";

export default function LoginPage() {
    const router = useRouter();
    const { loginUser, loading, error, clearError } = useAuthStore();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Basic field-level validation
    const [touched, setTouched] = useState({ username: false, password: false });

    const usernameError = touched.username && !username.trim();
    const passwordError = touched.password && !password.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ username: true, password: true });

        if (!username.trim() || !password.trim()) {
            return;
        }

        clearError();

        try {
            await loginUser(username.trim(), password.trim());
            router.push("/dashboard");
        } catch {
            // error is already set in the store
        }
    };


    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    maxWidth: 420,
                    width: "100%",
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                    }}
                >
                    <LockOutlinedIcon sx={{ color: "#fff", fontSize: 28 }} />
                </Box>

                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Sign in to continue to your dashboard
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2, textAlign: "left" }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
                        error={usernameError}
                        helperText={usernameError ? "Username is required" : ""}
                        sx={{ mb: 2 }}
                        autoComplete="username"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                        error={passwordError}
                        helperText={passwordError ? "Password is required" : ""}
                        sx={{ mb: 3 }}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            py: 1.4,
                            fontWeight: 600,
                            fontSize: "1rem",
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            textTransform: "none",
                            "&:hover": {
                                background: "linear-gradient(135deg, #5a6fd6, #6a4292)",
                            },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: "block" }}>
                    Test: emilys / emilyspass
                </Typography>
            </Paper>
        </Box>
    );
}
