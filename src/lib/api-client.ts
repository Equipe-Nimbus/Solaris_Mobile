import { Env } from "@/src/core/env";
import Axios from "axios";

export const api = Axios.create({
    baseURL: Env.API_URL
});

export const endpoints = {
    auth: {
        register: "/usuarios",
        login: "/login",
    },
    images: {
        req: "/imagens"
    },
    requests: {
        list: (id: number) => `/requisicao/${id}`,
        listOne: (id: string) => `/requisicao/historico/${id}`,
    }
}