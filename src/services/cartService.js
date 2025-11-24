import api from './api';

// Obtener el carrito actual del usuario logueado
export const getCart = async () => {
    const response = await api.get('/carrito');
    return response.data;
};

// Agregar un producto (cantidad por defecto 1)
export const addToCart = async (productoId, cantidad = 1) => {
    const response = await api.post('/carrito', { productoId, cantidad });
    return response.data;
};

// Eliminar un producto del carrito
export const removeFromCart = async (productoId) => {
    const response = await api.delete(`/carrito/${productoId}`);
    return response.data;
};

export const checkout = async () => {
    const response = await api.post('/pedidos/checkout');
    return response.data;
};