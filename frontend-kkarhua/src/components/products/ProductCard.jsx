import { Link } from 'react-router-dom';

const ProductCard = ({ product, onStatusChange }) => {
  const isLowStock = product.stock < 5;
  const isInactive = product.estado === 'inactivo';

  const handleStatusToggle = () => {
    const newStatus = product.estado === 'activo' ? 'inactivo' : 'activo';
    const confirmMessage = newStatus === 'inactivo'
      ? `¿Está seguro de desactivar el producto "${product.nombre}"?`
      : `¿Está seguro de activar el producto "${product.nombre}"?`;

    if (window.confirm(confirmMessage)) {
      onStatusChange(product.id, newStatus);
    }
  };

  return (
    <li className={`${isInactive ? 'bg-gray-50 opacity-75' : ''}`}>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1">
            {product.imagen && (
              <img
                className="h-16 w-16 rounded object-cover"
                src={product.imagen}
                alt={product.nombre}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64?text=Sin+imagen';
                }}
              />
            )}
            <div className={`${product.imagen ? 'ml-4' : ''} min-w-0 flex-1`}>
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.nombre}
                </p>
                {isLowStock && product.estado === 'activo' && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Stock bajo: {product.stock}
                  </span>
                )}
                {isInactive && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                    Inactivo
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {product.descripcion}
              </p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="font-medium">${product.precio.toLocaleString()}</span>
                <span className="mx-2">•</span>
                <span>Stock: {product.stock}</span>
                <span className="mx-2">•</span>
                <span>{product.categoria?.nombre || 'Sin categoría'}</span>
              </div>
            </div>
          </div>
          <div className="ml-5 flex-shrink-0 flex items-center space-x-2">
            <Link
              to={`/productos/editar/${product.id}`}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isInactive ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={(e) => isInactive && e.preventDefault()}
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </Link>
            <button
              onClick={handleStatusToggle}
              className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isInactive
                  ? 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100 focus:ring-green-500'
                  : 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100 focus:ring-red-500'
              }`}
            >
              {isInactive ? 'Activar' : 'Desactivar'}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;