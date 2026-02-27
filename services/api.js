import axios from "axios";

const api = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Authenticates a user with the DummyJSON API.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} - User data including accessToken
 */
export const loginUser = async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
};

export default api;
