import { create } from 'zustand';
import { z } from 'zod';

import { createSelectors } from '../utils';
import { getToken, removeToken, setToken } from './utils';
import { AuthResponse } from '@/src/types/types';
import { AxiosResponse } from 'axios';
import { api, endpoints } from '../api-client';
import { showNotification } from '@/src/components/ui/utils';

export const registerSchema = z.object({
    nome_user: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    cpf_user: z.string().length(11, { message: 'CPF deve ter 11 caracteres' }),
    email_user: z.string().email({ message: 'Email inválido' }),
    senha_user: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
});
export type RegisterFormValues = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email_user: z.string().email({ message: 'Email inválido' }),
    senha_user: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
});
export type LoginFormValues = z.infer<typeof loginSchema>

interface AuthState {
    user: AuthResponse | null;
    status: 'idle' | 'signOut' | 'signIn';
    register: (data: RegisterFormValues) => Promise<AxiosResponse>;
    signIn: (data: LoginFormValues) => Promise<AxiosResponse>;
    signOut: () => void;
    hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
    status: 'idle',
    user: null,
    register: async (data) => {
        try {
            const res = await api.post(endpoints.auth.register, data)
            return res
        } catch (error) {
            throw error;
        }
    },
    signIn: async (data) => {
        try {
            const res = await api.post<AuthResponse>(endpoints.auth.login, data)
            const user = res.data;
            const { token } = user;

            setToken(user);
            set({ status: 'signIn', user });

            api.defaults.headers['Authorization'] = `Bearer ${token}`
            return res;
        } catch (error) {
            throw error;
        }
    },
    signOut: () => {
        removeToken();
        set({ status: 'signOut', user: null });
    },
    hydrate: () => {
        try {
            const user = getToken();
            if (user !== null) {
                set({ status: 'signIn', user });
                api.defaults.headers['Authorization'] = `Bearer ${user.token}`
            } else {
                get().signOut();
            }
        } catch (e) {
            get().signOut();
        }
    },
}));

export const useAuth = createSelectors(_useAuth);

// export const signIn = (user: AuthResponse) => _useAuth.getState().signIn(user);
export const signOut = () => _useAuth.getState().signOut();
export const hydrateAuth = () => _useAuth.getState().hydrate();
