import { create } from "zustand";
import {
    getProducts,
    searchProducts as searchProductsApi,
    getProductById,
    getCategories as getCategoriesApi,
    getProductsByCategory,
} from "@/services/api";

const LIMIT = 10;

const useProductStore = create((set, get) => ({
    // ── State ──────────────────────────────────────────────
    products: [],
    total: 0,
    selectedProduct: null,
    categories: [],
    selectedCategory: "",
    searchQuery: "",
    page: 1,
    limit: LIMIT,
    loading: false,
    error: null,

    // ── Async Actions ──────────────────────────────────────

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
        set({
            loading: true,
            error: null,
            searchQuery: query,
            page: 1,
            selectedCategory: "",
        });
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
     * Fetch a single product by ID and store as selectedProduct.
     * @param {number|string} id
     */
    fetchProductById: async (id) => {
        set({ loading: true, error: null, selectedProduct: null });
        try {
            const data = await getProductById(id);
            set({ selectedProduct: data, loading: false });
        } catch (err) {
            set({
                error:
                    err?.response?.data?.message || "Failed to fetch product details.",
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
            // silently fail — categories are non-critical UI
        }
    },

    /**
     * Fetch products filtered by a specific category slug.
     * @param {string} category
     */
    fetchProductsByCategory: async (category) => {
        const { limit } = get();
        set({
            loading: true,
            error: null,
            selectedCategory: category,
            page: 1,
            searchQuery: "",
        });
        try {
            const data = await getProductsByCategory(category, limit, 0);
            set({ products: data.products, total: data.total, loading: false });
        } catch (err) {
            set({
                error: err?.response?.data?.message || "Failed to fetch category products.",
                loading: false,
            });
        }
    },

    // ── Setters ────────────────────────────────────────────

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

    /** Clear the selected product. */
    clearSelectedProduct: () => set({ selectedProduct: null }),

    /** Clear any error. */
    clearError: () => set({ error: null }),
}));

export default useProductStore;
