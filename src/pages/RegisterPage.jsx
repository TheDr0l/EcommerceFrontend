import React, { useState } from 'react';
import { register } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    // Estado para todos los campos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        direccion: '',
        telefono: ''
    });
    
    const [error, setError] = useState('');
    const { loginSuccess } = useAuth(); // Para loguear automáticamente al registrarse
    const navigate = useNavigate();

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Enviamos los datos al backend
            const data = await register(formData);
            
            // Si el backend devuelve el token directo, iniciamos sesión
            if (data.token) {
                loginSuccess(data.token);
                navigate('/'); // Vamos al Home
            } else {
                // Si tu backend no devolviera token (solo 200 OK), iríamos al login
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            // Mensaje de error genérico o el que venga del backend
            setError('Error al registrarse. Puede que el email ya exista.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Crear Cuenta</h3>
                            
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Nombre Completo</label>
                                    <input 
                                        type="text" name="nombre" className="form-control"
                                        value={formData.nombre} onChange={handleChange} required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Email</label>
                                    <input 
                                        type="email" name="email" className="form-control"
                                        value={formData.email} onChange={handleChange} required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Contraseña</label>
                                    <input 
                                        type="password" name="password" className="form-control"
                                        value={formData.password} onChange={handleChange} required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Dirección de Envío</label>
                                    <input 
                                        type="text" name="direccion" className="form-control"
                                        value={formData.direccion} onChange={handleChange} required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Teléfono</label>
                                    <input 
                                        type="text" name="telefono" className="form-control"
                                        value={formData.telefono} onChange={handleChange} required 
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100">
                                    Registrarse
                                </button>
                            </form>

                            <div className="mt-3 text-center">
                                <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión aquí</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;