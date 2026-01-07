import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'web' ? 'http://localhost:8000' : 'http://192.168.1.15:8000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR (Opcional por ahora, vital para después):
// Esto mete el token en el header automáticamente si existe.
/*
api.interceptors.request.use(async (config) => {
  const token = await obtenerTokenDeAlmacenamiento(); // Ya lo haremos luego
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/