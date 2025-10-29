import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';

export const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    setUsuarios(usuariosGuardados);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />
        
        <div className="col-md-10 main-content">
          <h1 className="mt-2 mb-4" style={{ textAlign: 'center' }}>Lista de Usuarios</h1>
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Run</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Fecha Nacimiento</th>
                <th>Tipo de Usuario</th>
                <th>Región</th>
                <th>Comuna</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.run}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.fechaNacimiento}</td>
                  <td>{usuario.tipoUsuario}</td>
                  <td>{usuario.region}</td>
                  <td>{usuario.comuna}</td>
                  <td>{usuario.direccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};