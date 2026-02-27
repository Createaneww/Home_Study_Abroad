import { create } from "zustand";
import { getUsers, searchUsers as searchUsersApi } from "@/services/api";

const LIMIT = 10;

const useUserStore = create((set, get) => ({
    // State
    users: [],
    total: 0,
    loading: false,
    error: null,
    page: 1,
    limit: LIMIT,
    searchQuery: "",

    /**
     * Fetch users list (paginated).
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

    /** Navigate to a specific page number. */
    setPage: (page) => set({ page }),

    /** Update the search query (used for controlled input). */
    setSearchQuery: (query) => set({ searchQuery: query }),

    /** Clear the search and refetch the default users list. */
    resetSearch: () => {
        set({ searchQuery: "", page: 1 });
    },
}));

export default useUserStore;
