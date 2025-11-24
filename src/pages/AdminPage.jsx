import React, { useEffect, useState } from 'react';
import { getProductos, createProducto } from '../services/productoService';
import api from '../services/api'; // Necesitamos axios directo para el delete si no creamos funcion en service

const AdminPage = () => {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        nombre: '', descripcion: '', precio: '', stock: '', urlImagen: ''
    });

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const data = await getProductos();
        setProductos(data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProducto(form);
            alert("Producto creado ✅");
            setForm({ nombre: '', descripcion: '', precio: '', stock: '', urlImagen: '' }); // Limpiar form
            cargarProductos(); // Recargar tabla
        } catch (error) {
            alert("Error al crear producto");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres borrar este producto?")) {
            try {
                await api.delete(`/productos/${id}`);
                cargarProductos();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Panel de Administración 🛠️</h2>
            
            <div className="row">
                {/* Formulario de Creación */}
                <div className="col-md-4">
                    <div className="card p-3 mb-4">
                        <h4>Nuevo Producto</h4>
                        <form onSubmit={handleSubmit}>
                            <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                            <textarea className="form-control mb-2" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
                            <input className="form-control mb-2" type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
                            <input className="form-control mb-2" type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
                            <input className="form-control mb-2" name="urlImagen" placeholder="URL Imagen" value={form.urlImagen} onChange={handleChange} />
                            <button className="btn btn-primary w-100">Guardar Producto</button>
                        </form>
                    </div>
                </div>

                {/* Lista de Productos */}
                <div className="col-md-8">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.nombre}</td>
                                    <td>${p.precio}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;