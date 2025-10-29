import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';

export const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    setProductos(productosGuardados);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />
        
        <div className="col-md-10 main-content">
          <div className="container mt-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th colSpan="8"><h3>Lista de Productos</h3></th>
                </tr>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Stock</th>
                  <th>Stock Crítico</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.codigo}</td>
                    <td>{producto.nombre}</td>
                    <td>
                      <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px' }} />
                    </td>
                    <td>${producto.precio}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.stockCritico}</td>
                    <td>{producto.categoria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};