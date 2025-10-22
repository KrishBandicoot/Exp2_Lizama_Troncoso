import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
      logoutUser();
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          Tienda Virtual
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/usuarios">
                Usuarios
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <span className="text-muted me-3">
              Hola, {user?.nombre || 'Usuario'}
            </span>
            <button 
              onClick={handleLogout}
              className="btn btn-primary btn-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;