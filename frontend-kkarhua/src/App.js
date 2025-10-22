<<<<<<< HEAD
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
>>>>>>> 1aa447bec7e2001b219c4ffed5e16836e9d646f7

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';

<<<<<<< HEAD
// Components - Products
import CreateProduct from './components/products/CreateProduct';
import EditProduct from './components/products/EditProduct';

// Components - Users
import CreateUser from './components/users/CreateUser';
import EditUser from './components/users/EditUser';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas - Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rutas - Productos */}
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/productos/crear" element={<CreateProduct />} />
        <Route path="/productos/editar/:id" element={<EditProduct />} />
        
        {/* Rutas - Usuarios */}
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/usuarios/crear" element={<CreateUser />} />
        <Route path="/usuarios/editar/:id" element={<EditUser />} />
        
        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
=======
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/productos" element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          } />
          
          <Route path="/usuarios" element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          } />
          
          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
>>>>>>> 1aa447bec7e2001b219c4ffed5e16836e9d646f7
  );
}

export default App;