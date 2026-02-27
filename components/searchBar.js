"use client";

import { useRef, useCallback } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * Reusable search bar with built-in debounce.
 * @param {string} value - controlled input value
 * @param {Function} onSearch - called with the debounced search term
 * @param {Function} onChange - called immediately with each keystroke
 * @param {string} placeholder
 * @param {number} delay - debounce delay in ms (default 400)
 */
export default function SearchBar({
    value,
    onSearch,
    onChange,
    placeholder = "Search…",
    delay = 400,
}) {
    const timerRef = useRef(null);

    const handleChange = useCallback(
        (e) => {
            const val = e.target.value;
            if (onChange) onChange(val);

            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                onSearch(val.trim());
            }, delay);
        },
        [onChange, onSearch, delay]
    );

    return (
        <TextField
            fullWidth
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                ),
            }}
            sx={{
                maxWidth: 420,
                "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#764ba2" },
                    "&.Mui-focused fieldset": { borderColor: "#764ba2" },
                },
            }}
        />
    );
}
