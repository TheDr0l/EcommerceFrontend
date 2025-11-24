import api from './api';

// Función para iniciar sesión
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            // Guardamos el token en el navegador
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para registrarse (la usaremos pronto)
export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
};