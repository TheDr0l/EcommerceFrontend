import React, { useEffect, useState } from 'react';
import { getProductos } from '../services/productoService';
import api from '../services/api'; 

const AdminPage = () => {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        nombre: '', descripcion: '', precio: '', stock: ''
    });
    const [selectedFile, setSelectedFile] = useState(null); // <-- Nuevo estado para el archivo

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

    const handleFileChange = (e) => { // <-- Nueva función para manejar el archivo
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Crear FormData para enviar JSON y archivo
            const formData = new FormData();
            formData.append('producto', new Blob([JSON.stringify(form)], {
                type: 'application/json'
            }));
            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            // Usar api.post directamente para enviar FormData
            await api.post('/productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // <-- Indicar el tipo de contenido
                }
            });
            
            alert("Producto creado con éxito");
            setForm({ nombre: '', descripcion: '', precio: '', stock: '' }); // Limpiar form
            setSelectedFile(null); // Limpiar archivo seleccionado
            cargarProductos(); // Recargar tabla
        } catch (error) {
            console.error("Error al crear producto:", error);
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
                <div className="col-md-4">
                    <div className="card p-3 mb-4">
                        <h4>Nuevo Producto</h4>
                        <form onSubmit={handleSubmit}>
                            <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                            <textarea className="form-control mb-2" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
                            <input className="form-control mb-2" type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
                            <input className="form-control mb-2" type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
                            
                            {/* INPUT DE TIPO FILE */}
                            <label className="form-label mt-2">Imagen del Producto</label>
                            <input 
                                className="form-control mb-3" 
                                type="file" 
                                onChange={handleFileChange} 
                                accept="image/*" // Solo permite archivos de imagen
                            />

                            <button type="submit" className="btn btn-primary w-100">Guardar Producto</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-8">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imagen</th> {/* Nueva columna */}
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>
                                        {p.urlImagen && ( // Mostrar imagen si existe
                                            <img src={p.urlImagen} alt={p.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        )}
                                    </td>
                                    <td>{p.nombre}</td>
                                    <td>${p.precio}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                                            Borrar
                                        </button>
                                        {/* Aquí podrías agregar un botón para editar */}
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