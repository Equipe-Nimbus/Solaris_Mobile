import { router } from "expo-router";
import { api } from "./api-client";
import { useAuth } from "./auth";
import { showNotification } from "../components/ui/utils";

// Interceptador para lidar com o token expirado
export function setupAxiosInterceptors() {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                useAuth.getState().signOut();
                router.replace('/login');
                showNotification({
                    description: 'Sessão expirada. Faça login novamente.',
                    type: 'warning'
                })
            }
            return Promise.reject(error);
        }
    );
}