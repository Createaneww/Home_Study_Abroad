import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    token: null,

    /** Save user data and token after successful login */
    login: (data) => {
        const { accessToken, ...user } = data;
        if (typeof window !== "undefined") {
            localStorage.setItem("token", accessToken);
            localStorage.setItem("user", JSON.stringify(user));
        }
        set({ user, token: accessToken });
    },

    /** Clear auth state and remove persisted data */
    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        set({ user: null, token: null });
    },

    /** Restore token and user from localStorage (call on app load) */
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
}));

export default useAuthStore;
