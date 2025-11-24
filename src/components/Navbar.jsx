import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Mi Ecommerce 🛒</Link>

                <div className="ml-auto">
                    <ul className="navbar-nav">
                        {!isAuthenticated ? (
                            <li className="nav-item">
                                <Link className="btn btn-outline-light btn-sm" to="/login">
                                    Iniciar Sesión
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item me-3">
                                    <span className="nav-link text-white">Hola, Usuario</span>
                                </li>
                                <li className="nav-item me-3">
                                    <Link className="nav-link" to="/cart">
                                        🛒 Carrito
                                    </Link>
                                </li>
                                <li className="nav-item me-3">
                                    <Link className="nav-link" to="/admin">🔧 Admin</Link>
                                </li>
                                <li className="nav-item me-3">
                                    <button onClick={handleLogout} className="btn btn-danger btn-sm">
                                        Salir
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;