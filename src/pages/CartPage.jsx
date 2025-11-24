import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../services/cartService';
import { checkout } from '../services/cartService';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        cargarCarrito();
    }, []);

    const cargarCarrito = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.error("Error cargando carrito", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productoId) => {
        try {
            const cartActualizado = await removeFromCart(productoId);
            setCart(cartActualizado);
        } catch (error) {
            console.error("Error eliminando item");
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando...</div>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h3>Tu carrito está vacío 😢</h3>
                <a href="/" className="btn btn-primary mt-3">Ir a comprar</a>
            </div>
        );
    }

    const handleCheckout = async () => {
        try {
            await checkout();
            alert("¡Compra realizada con éxito! 🎉 Te enviaremos los detalles.");
            setCart(null); // Limpiamos el estado visual
            navigate('/'); // Volvemos al home
        } catch (error) {
            console.error("Error al procesar compra", error);
            alert("Error al procesar la compra.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Tu Carrito de Compras 🛒</h2>
            <div className="table-responsive shadow-sm">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.producto.nombre}</td>
                                <td>${item.precioUnitario}</td>
                                <td>{item.cantidad}</td>
                                <td>${item.subtotal}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(item.producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end mt-4">
                <div className="card p-3" style={{ width: '300px' }}>
                    <h4>Total: <span className="text-success">${cart.total}</span></h4>
                    <button className="btn btn-dark mt-2 w-100" onClick={handleCheckout}>
                        Proceder al Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;