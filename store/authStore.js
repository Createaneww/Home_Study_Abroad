import { create } from "zustand";
import { loginUser as loginUserApi } from "@/services/api";

const useAuthStore = create((set) => ({
    // ── State ──────────────────────────────────────────────
    user: null,
    token: null,
    loading: false,
    error: null,

    // ── Actions ────────────────────────────────────────────

    /**
     * Async login — calls the API, persists token, and updates state.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<object>} Resolved user data on success
     */
    loginUser: async (username, password) => {
        set({ loading: true, error: null });
        try {
            const data = await loginUserApi(username, password);
            const { accessToken, ...user } = data;

            if (typeof window !== "undefined") {
                localStorage.setItem("token", accessToken);
                localStorage.setItem("user", JSON.stringify(user));
            }

            set({ user, token: accessToken, loading: false });
            return data; // let caller know login succeeded
        } catch (err) {
            const message =
                err?.response?.data?.message || "Login failed. Please try again.";
            set({ error: message, loading: false });
            throw err; // re-throw so caller can react
        }
    },

    /**
     * Save auth data directly (used when data is already available).
     */
    login: (data) => {
        const { accessToken, ...user } = data;
        if (typeof window !== "undefined") {
            localStorage.setItem("token", accessToken);
            localStorage.setItem("user", JSON.stringify(user));
        }
        set({ user, token: accessToken, error: null });
    },

    /**
     * Clear auth state and remove persisted data.
     */
    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        set({ user: null, token: null, error: null });
    },

    /**
     * Restore token and user from localStorage on app load.
     */
    hydrate: () => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");
            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    set({ user, token });
                } catch {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }
        }
    },

    /** Clear any error. */
    clearError: () => set({ error: null }),
}));

export default useAuthStore;
