window.onload = function() {
    document.getElementById("form-producto").addEventListener("submit", function(e) {
        e.preventDefault();
        const codigo = document.getElementById("codigo").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const precio = parseFloat(document.getElementById("precio").value);
        const stock = parseInt(document.getElementById("stock").value);
        const stockCritico = document.getElementById("stockCritico").value ? 
            parseInt(document.getElementById("stockCritico").value) : null;
        const categoria = document.getElementById("categoria").value;
        const imagen = document.getElementById("imagen").value.trim() || null;
        let errors = [];
        if (!codigo || codigo.length < 3) {
            errors.push("El código debe tener al menos 3 caracteres");
        }
        if (!nombre) {
            errors.push("El nombre es requerido");
        } else if (nombre.length > 100) {
            errors.push("El nombre no puede exceder 100 caracteres");
        }
        if (descripcion && descripcion.length > 500) {
            errors.push("La descripción no puede exceder 500 caracteres");
        }
        if (isNaN(precio) || precio < 0) {
            errors.push("El precio debe ser un número mayor o igual a 0");
        }
        if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
            errors.push("El stock debe ser un número entero mayor o igual a 0");
        }
        if (stockCritico !== null && (isNaN(stockCritico) || stockCritico < 0 || !Number.isInteger(stockCritico))) {
            errors.push("El stock crítico debe ser un número entero mayor o igual a 0");
        }
        if (!categoria) {
            errors.push("Debe seleccionar una categoría");
        }
        if (errors.length > 0) {
            alert("Errores encontrados:\n" + errors.join("\n"));
            return;
        }
        if (stockCritico !== null && stock <= stockCritico) {
            document.getElementById("alerta-stock").style.display = "block";
        } else {
            document.getElementById("alerta-stock").style.display = "none";
        }
        const producto = {
            codigo,
            nombre,
            descripcion: descripcion || null,
            precio,
            stock,
            stockCritico,
            categoria,
            foto: imagen
        };
        fetch('http://localhost:3001/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return res.json();
        })
        .then(data => {
            console.log("Producto agregado:", data);
            alert("Producto agregado exitosamente.");
            document.getElementById("form-producto").reset();
            document.getElementById("alerta-stock").style.display = "none";
        })
        .catch(error => {
            console.error("Error al agregar producto:", error);
            alert("Error al agregar producto: " + error.message);
        });
    });
};