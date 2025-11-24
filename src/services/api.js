import axios from 'axios';

const API_URL = 'https://exemplary-delight-production-bf10.up.railway.app/api'; // La URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// INTERCEPTOR
// Antes de enviar cualquier petición, revisa si tenemos el token guardado
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lo guardaremos aquí al hacer login
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;