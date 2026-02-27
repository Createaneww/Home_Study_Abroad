"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import useAuthStore from "@/store/authStore";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const { token, hydrate } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    useEffect(() => {
        // Wait for hydration before deciding
        const storedToken =
            typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token && !storedToken) {
            router.replace("/login");
        } else {
            setIsChecking(false);
        }
    }, [token, router]);

    if (isChecking) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return <>{children}</>;
}
