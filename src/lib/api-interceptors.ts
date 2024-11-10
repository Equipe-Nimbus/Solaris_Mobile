import { router } from "expo-router";
import { api } from "./api-client";
import { useAuth } from "./auth";

// Interceptador para lidar com o token expirado
export function setupAxiosInterceptors() {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                useAuth.getState().signOut();
                router.replace('/login');
            }
            return Promise.reject(error);
        }
    );
}