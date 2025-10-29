import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';

export const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    tipoUsuario: '',
    region: '',
    comuna: '',
    direccion: ''
  });

  const [comunas, setComunas] = useState([]);

  const comunasPorRegion = {
    'Región Metropolitana': ['Santiago', 'Maipú', 'Las Condes', 'Providencia', 'Ñuñoa'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
    'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán']
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setFormData({ ...formData, region, comuna: '' });
    setComunas(comunasPorRegion[region] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push({ id: Date.now(), ...formData });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Usuario registrado correctamente');
    setFormData({
      run: '',
      nombre: '',
      apellidos: '',
      correo: '',
      fechaNacimiento: '',
      tipoUsuario: '',
      region: '',
      comuna: '',
      direccion: ''
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />
        
        <div className="col-md-10 main-content">
          <div className="row justify-content-center" style={{ marginTop: '25px' }}>
            <div className="col-md-6">
              <h1 className="mt-2 mb-4" style={{ textAlign: 'center' }}>Registro de usuarios</h1>
              <form onSubmit={handleSubmit} className="formulario-fondo p-4 rounded">
                <div className="mb-2">
                  <label htmlFor="run" className="form-label">RUN</label>
                  <input type="text" className="form-control" id="run" required 
                    minLength="7" maxLength="9" 
                    pattern="^[0-9]{7,8}[kK0-9]{1}$"
                    value={formData.run}
                    onChange={(e) => setFormData({...formData, run: e.target.value})} />
                </div>
                
                <div className="mb-2">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" required maxLength="50"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                </div>
                
                <div className="mb-2">
                  <label htmlFor="apellidos" className="form-label">Apellidos</label>
                  <input type="text" className="form-control" id="apellidos" required maxLength="100"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({...formData, apellidos: e.target.value})} />
                </div>
                
                <div className="mb-2">
                  <label htmlFor="correo" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" id="correo" required maxLength="100"
                    pattern="^[\w\.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"
                    value={formData.correo}
                    onChange={(e) => setFormData({...formData, correo: e.target.value})} />
                </div>
                
                <div className="mb-2">
                  <label htmlFor="fechaNacimiento" className="form-label">Fecha Nacimiento</label>
                  <input type="date" className="form-control" id="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})} />
                </div>
                
                <div className="mb-2">
                  <label htmlFor="tipoUsuario" className="form-label">Tipo de Usuario</label>
                  <select className="form-control" id="tipoUsuario" required
                    value={formData.tipoUsuario}
                    onChange={(e) => setFormData({...formData, tipoUsuario: e.target.value})}>
                    <option value="">Seleccione tipo</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                  </select>
                </div>
                
                <div className="mb-2">
                  <label htmlFor="region" className="form-label">Región</label>
                  <select className="form-control" id="region" required
                    value={formData.region}
                    onChange={handleRegionChange}>
                    <option value="">Seleccione región</option>
                    <option value="Región Metropolitana">Región Metropolitana</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Biobío">Biobío</option>
                  </select>
                </div>
                
                <div className="mb-2">
                  <label htmlFor="comuna" className="form-label">Comuna</label>
                  <select className="form-control" id="comuna" required
                    value={formData.comuna}
                    onChange={(e) => setFormData({...formData, comuna: e.target.value})}>
                    <option value="">Seleccione comuna</option>
                    {comunas.map((comuna, index) => (
                      <option key={index} value={comuna}>{comuna}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-2">
                  <label htmlFor="direccion" className="form-label">Dirección</label>
                  <input type="text" className="form-control" id="direccion" required maxLength="300"
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})} />
                </div>
                
                <div className="text-center mt-4" style={{ marginBottom: '5px' }}>
                  <input type="submit" value="Registrar" className="btn btn-outline-success me-2" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};