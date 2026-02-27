import { create } from "zustand";
import {
    getUsers,
    searchUsers as searchUsersApi,
    getUserById,
} from "@/services/api";

const LIMIT = 10;

const useUserStore = create((set, get) => ({
    // ── State ──────────────────────────────────────────────
    users: [],
    total: 0,
    selectedUser: null,
    loading: false,
    error: null,
    page: 1,
    limit: LIMIT,
    searchQuery: "",

    // ── Async Actions ──────────────────────────────────────

    /**
     * Fetch paginated users list.
     * Respects the current page & limit stored in state.
     */
    fetchUsers: async () => {
        const { page, limit } = get();
        const skip = (page - 1) * limit;
        set({ loading: true, error: null });
        try {
            const data = await getUsers(limit, skip);
            set({ users: data.users, total: data.total, loading: false });
        } catch (err) {
            set({
                error: err?.response?.data?.message || "Failed to fetch users.",
                loading: false,
            });
        }
    },

    /**
     * Search users by query string.
     * Resets page to 1 before searching.
     */
    searchUsers: async (query) => {
        set({ loading: true, error: null, searchQuery: query, page: 1 });
        try {
            const data = await searchUsersApi(query);
            set({ users: data.users, total: data.total, loading: false });
        } catch (err) {
            set({
                error: err?.response?.data?.message || "Search failed.",
                loading: false,
            });
        }
    },

    /**
     * Fetch a single user by ID and store as selectedUser.
     * @param {number|string} id
     */
    fetchUserById: async (id) => {
        set({ loading: true, error: null, selectedUser: null });
        try {
            const data = await getUserById(id);
            set({ selectedUser: data, loading: false });
        } catch (err) {
            set({
                error: err?.response?.data?.message || "Failed to fetch user details.",
                loading: false,
            });
        }
    },

    // ── Setters ────────────────────────────────────────────

    /** Navigate to a specific page number. */
    setPage: (page) => set({ page }),

    /** Update the search query (used for controlled input). */
    setSearchQuery: (query) => set({ searchQuery: query }),

    /** Clear search and reset to default list. */
    resetSearch: () => set({ searchQuery: "", page: 1 }),

    /** Clear the selected user. */
    clearSelectedUser: () => set({ selectedUser: null }),

    /** Clear any error. */
    clearError: () => set({ error: null }),
}));

export default useUserStore;
