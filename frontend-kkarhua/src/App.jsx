import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';

import CreateProduct from './components/products/CreateProduct';
import EditProduct from './components/products/EditProduct';

import CreateUser from './components/users/CreateUser';
import EditUser from './components/users/EditUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/productos/crear" element={<CreateProduct />} />
        <Route path="/productos/editar/:id" element={<EditProduct />} />
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/usuarios/crear" element={<CreateUser />} />
        <Route path="/usuarios/editar/:id" element={<EditUser />} />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;