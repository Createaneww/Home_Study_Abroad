"use client";

import {
    Card,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    Button,
    Box,
    Chip,
    Skeleton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import Link from "next/link";

/**
 * Displays a single user in a styled MUI card.
 */
export default function UserCard({ user }) {
    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.25s ease",
                "&:hover": {
                    boxShadow: "0 8px 30px rgba(102,126,234,0.13)",
                    borderColor: "#667eea",
                    transform: "translateY(-3px)",
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                {/* Avatar + Name + Gender */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                            width: 56,
                            height: 56,
                            border: "2px solid #667eea",
                        }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" fontWeight={700} noWrap>
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Chip
                            label={user.gender}
                            size="small"
                            sx={{
                                mt: 0.5,
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                textTransform: "capitalize",
                                bgcolor:
                                    user.gender === "male"
                                        ? "rgba(102,126,234,0.12)"
                                        : "rgba(236,72,153,0.12)",
                                color:
                                    user.gender === "male" ? "#667eea" : "#ec4899",
                            }}
                        />
                    </Box>
                </Box>

                {/* Details */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EmailIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {user.email}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                            {user.phone}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <BusinessIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {user.company?.name || "—"}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>

            <CardActions sx={{ px: 3, pb: 2 }}>
                <Button
                    component={Link}
                    href={`/users/${user.id}`}
                    size="small"
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#667eea",
                        "&:hover": { bgcolor: "rgba(102,126,234,0.08)" },
                    }}
                >
                    View Details →
                </Button>
            </CardActions>
        </Card>
    );
}

/**
 * Skeleton placeholder shown while user data is loading.
 */
export function UserCardSkeleton() {
    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Skeleton variant="circular" width={56} height={56} />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="70%" height={24} />
                        <Skeleton
                            variant="rounded"
                            width={60}
                            height={22}
                            sx={{ mt: 0.5, borderRadius: 3 }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Skeleton variant="text" width="90%" height={20} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="75%" height={20} />
                </Box>
            </CardContent>
            <CardActions sx={{ px: 3, pb: 2 }}>
                <Skeleton variant="rounded" width={110} height={30} sx={{ borderRadius: 1 }} />
            </CardActions>
        </Card>
    );
}
