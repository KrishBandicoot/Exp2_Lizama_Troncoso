import { useEffect, useState } from "react";
import { getProducts } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Prueba de Productos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.nombre} - Stock: {p.stock}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
