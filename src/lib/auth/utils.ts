import { AuthResponse } from "@/src/types/types";
import { getItem, removeItem, setItem } from "../storage";

const USER = 'user';

export const getToken = () => getItem<AuthResponse>(USER);
export const removeToken = () => removeItem(USER);
export const setToken = (value: AuthResponse) => setItem<AuthResponse>(USER, value);