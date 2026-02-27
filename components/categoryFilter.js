"use client";

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

/**
 * Dropdown filter for product categories.
 * @param {Array} categories - List of category objects { slug, name }
 * @param {string} value - Currently selected category slug
 * @param {Function} onChange - Called with the new category slug
 */
export default function CategoryFilter({ categories, value, onChange }) {
    return (
        <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel
                id="category-filter-label"
                sx={{
                    "&.Mui-focused": { color: "#764ba2" },
                }}
            >
                Category
            </InputLabel>
            <Select
                labelId="category-filter-label"
                value={value}
                label="Category"
                onChange={(e) => onChange(e.target.value)}
                sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                        transition: "border-color 0.2s",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#764ba2",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#764ba2",
                    },
                }}
            >
                <MenuItem value="">
                    <em>All Categories</em>
                </MenuItem>
                {categories.map((cat) => (
                    <MenuItem key={cat.slug} value={cat.slug}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
