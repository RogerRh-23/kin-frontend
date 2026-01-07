import axios from 'axios';

export const API_BASE_URL = 'http://10.11.38.227:8000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export default api;
