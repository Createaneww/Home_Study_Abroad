import { create } from "zustand";
import {
    getProducts,
    searchProducts as searchProductsApi,
    getCategories as getCategoriesApi,
    getProductsByCategory,
} from "@/services/api";

const LIMIT = 10;

const useProductStore = create((set, get) => ({
    // State
    products: [],
    total: 0,
    categories: [],
    selectedCategory: "",
    searchQuery: "",
    page: 1,
    limit: LIMIT,
    loading: false,
    error: null,

    /**
     * Fetch products — respects current page, limit, and selected category.
     */
    fetchProducts: async () => {
        const { page, limit, selectedCategory } = get();
        const skip = (page - 1) * limit;
        set({ loading: true, error: null });
        try {
            let data;
            if (selectedCategory) {
                data = await getProductsByCategory(selectedCategory, limit, skip);
            } else {
                data = await getProducts(limit, skip);
            }
            set({ products: data.products, total: data.total, loading: false });
        } catch (err) {
            set({
                error: err?.response?.data?.message || "Failed to fetch products.",
                loading: false,
            });
        }
    },

    /**
     * Search products by query string. Resets page and category.
     */
    searchProducts: async (query) => {
        set({ loading: true, error: null, searchQuery: query, page: 1, selectedCategory: "" });
        try {
            const data = await searchProductsApi(query);
            set({ products: data.products, total: data.total, loading: false });
        } catch (err) {
            set({
                error: err?.response?.data?.message || "Search failed.",
                loading: false,
            });
        }
    },

    /**
     * Fetch all product categories.
     */
    fetchCategories: async () => {
        try {
            const data = await getCategoriesApi();
            set({ categories: data });
        } catch {
            // silently fail — categories are non-critical
        }
    },

    /** Set selected category and reset page. */
    setCategory: (category) => {
        set({ selectedCategory: category, page: 1, searchQuery: "" });
    },

    /** Navigate to a specific page number. */
    setPage: (page) => set({ page }),

    /** Update the search query (controlled input). */
    setSearchQuery: (query) => set({ searchQuery: query }),

    /** Reset all filters. */
    resetFilters: () => {
        set({ searchQuery: "", selectedCategory: "", page: 1 });
    },
}));

export default useProductStore;
