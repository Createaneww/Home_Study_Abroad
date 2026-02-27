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

/**
 * Fetches a paginated list of users.
 * @param {number} limit - Number of users per page
 * @param {number} skip  - Number of users to skip
 * @returns {Promise<object>} - { users, total, skip, limit }
 */
export const getUsers = async (limit = 10, skip = 0) => {
    const response = await api.get("/users", { params: { limit, skip } });
    return response.data;
};

/**
 * Searches users by a query string.
 * @param {string} query - Search keyword
 * @returns {Promise<object>} - { users, total, skip, limit }
 */
export const searchUsers = async (query) => {
    const response = await api.get("/users/search", { params: { q: query } });
    return response.data;
};

/**
 * Fetches a single user by ID.
 * @param {number|string} id - The user ID
 * @returns {Promise<object>} - Full user object
 */
export const getUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

// ─── PRODUCTS ────────────────────────────────────────────

/**
 * Fetches a paginated list of products.
 * @param {number} limit
 * @param {number} skip
 * @returns {Promise<object>} - { products, total, skip, limit }
 */
export const getProducts = async (limit = 10, skip = 0) => {
    const response = await api.get("/products", { params: { limit, skip } });
    return response.data;
};

/**
 * Searches products by a query string.
 * @param {string} query
 * @returns {Promise<object>} - { products, total, skip, limit }
 */
export const searchProducts = async (query) => {
    const response = await api.get("/products/search", { params: { q: query } });
    return response.data;
};

/**
 * Fetches a single product by ID.
 * @param {number|string} id
 * @returns {Promise<object>} - Full product object
 */
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

/**
 * Fetches all product categories.
 * @returns {Promise<Array>} - List of category objects
 */
export const getCategories = async () => {
    const response = await api.get("/products/categories");
    return response.data;
};

/**
 * Fetches products filtered by category.
 * @param {string} category - Category slug
 * @param {number} limit
 * @param {number} skip
 * @returns {Promise<object>} - { products, total, skip, limit }
 */
export const getProductsByCategory = async (category, limit = 10, skip = 0) => {
    const response = await api.get(`/products/category/${category}`, {
        params: { limit, skip },
    });
    return response.data;
};

export default api;
