import { api } from '@/src/api/client';
import type { LoginResponse } from '@/src/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'kin_auth_token';

export const AuthService = {
    // Función para Login
    login: async (username: string, password: string) => {
        // FastAPI suele usar x-www-form-urlencoded para OAuth2, 
        // pero si configuraste JSON body, úsalo así:
        const { data } = await api.post<LoginResponse>('/auth/login', {
            username,
            password
        });

        if (data.access_token) {
            await AsyncStorage.setItem(TOKEN_KEY, data.access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        }
        return data;
    },

    logout: async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        delete api.defaults.headers.common['Authorization'];
    },

    getToken: async () => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    },

    // Función para obtener perfil (ejemplo)
    getProfile: async () => {
        const { data } = await api.get('/users/me');
        return data;
    }
};