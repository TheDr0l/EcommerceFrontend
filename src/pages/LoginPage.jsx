import React, { useState } from 'react';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { loginSuccess } = useAuth(); // Usamos nuestro contexto
    const navigate = useNavigate(); // Para redirigir al Home

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await login(email, password);
            loginSuccess(data.token); // Actualizamos estado global
            navigate('/'); // Redirigir al home
        } catch (err) {
            setError('Credenciales inválidas. Intenta de nuevo.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Ingresar
                                </button>
                                <div className="mt-3 text-center">
                                    <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;