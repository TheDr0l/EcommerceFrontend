import React, { createContext, useState, useEffect, useContext } from 'react';
import { logout as logoutService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al cargar la app, revisamos si ya hay un token guardado
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Aquí podrías decodificar el token para sacar el email/rol si quisieras
            // Por ahora, asumimos que si hay token, hay usuario
        }
        setLoading(false);
    }, []);

    const loginSuccess = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        logoutService();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginSuccess, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto más fácil
export const useAuth = () => useContext(AuthContext);