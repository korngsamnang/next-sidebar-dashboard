import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // withCredentials: true,
});

api.interceptors.request.use(
    config => {
        // Get token from storage
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("authToken")
                : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export default api;
