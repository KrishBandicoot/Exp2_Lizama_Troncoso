import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from './Footer';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lógica de autenticación
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.correo === formData.correo);
    
    if (usuario && usuario.password === formData.password) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      
      if (usuario.tipoUsuario === 'Administrador') {
        navigate('/admin/home');
      } else {
        navigate('/home');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <>
      <Navbar />
      
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#222' }}>Kkarhua</h1>
      </div>

      <div className="row justify-content-center" style={{ marginTop: '25px' }}>
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="formulario-fondo p-4 rounded">
            <h3 className="titulo2" style={{ textAlign: 'center', marginBottom: '20px' }}>
              Iniciar Sesión
            </h3>
            
            <div className="form-group" style={{ marginTop: '10px' }}>
              <label htmlFor="correo" className="form-label etiqueta">Correo electrónico:</label>
              <input type="text" className="form-control" id="correo" placeholder="Correo"
                value={formData.correo}
                onChange={(e) => setFormData({...formData, correo: e.target.value})}
                maxLength="100"
                pattern="^[\w\.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$" />
            </div>

            <div className="form-group" style={{ marginTop: '10px' }}>
              <label htmlFor="pass" className="form-label etiqueta">Contraseña:</label>
              <input type="password" className="form-control" id="pass" placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
            </div>
            
            <div className="text-center mt-4" style={{ marginBottom: '5px' }}>
              <input type="submit" value="Iniciar Sesión" className="btn btn-outline-success me-2" />
            </div>
          </form>
          
          <div className="text-center mt-3">
            <p style={{ fontSize: '1rem', marginBottom: '8px' }}>
              ¿No estás registrado? <Link to="/register" className="btn btn-outline-primary">Registrarse</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};