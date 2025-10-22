import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, isAuthenticated } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    setLoading(true);
    
    try {
      await loginUser(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor intente nuevamente.');
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-shop text-primary" style={{ fontSize: '3rem' }}></i>
                  <h2 className="mt-3 mb-2 fw-bold">Tienda Virtual</h2>
                  <p className="text-muted">Panel de Administración</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      <div>{error}</div>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope me-1"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock me-1"></i>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <small className="text-muted">© 2025 Tienda Virtual. Todos los derechos reservados.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;