import React, { useEffect, useState } from 'react';
import { getProductos } from '../services/productoService';
import { addToCart } from '../services/cartService'; // <--- Importar
import { useAuth } from '../context/AuthContext'; // <--- Importar
import { useNavigate } from 'react-router-dom'; // <--- Importar

const HomePage = () => {
    const [productos, setProductos] = useState([]);
    const { isAuthenticated } = useAuth(); // <--- Usar contexto
    const navigate = useNavigate();

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await getProductos();
            setProductos(data);
        } catch (error) {
            console.error("Falló la carga de productos");
        }
    };

    // --- carrito ---
    const handleAddToCart = async (productoId) => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para comprar 🔒");
            navigate('/login');
            return;
        }

        try {
            await addToCart(productoId, 1);
            alert("¡Producto agregado al carrito! 🛒");
        } catch (error) {
            console.error(error);
            alert("Error al agregar al carrito");
        }
    };
    // ---------------------

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Nuestros Productos 🛍️</h2>
            <div className="row">
                {productos.map((prod) => (
                    <div key={prod.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={prod.urlImagen || "https://via.placeholder.com/150"}
                                className="card-img-top"
                                alt={prod.nombre}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{prod.nombre}</h5>
                                <p className="card-text text-muted">{prod.descripcion}</p>
                                <h6 className="text-primary">${prod.precio}</h6>

                                <button
                                    className="btn btn-success w-100 mt-2"
                                    onClick={() => handleAddToCart(prod.id)}
                                >
                                    Agregar al Carrito
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;