import api from './api';

export const getProductos = async () => {
    try {
        const response = await api.get('/productos');
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos", error);
        throw error;
    }
};

export const getProductoById = async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
};

// Solo funcionará si el usuario es admin (según tu backend)
export const createProducto = async (producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
};