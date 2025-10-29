let url='http://localhost:3001/productos';
    fetch(url)
        .then(response =>response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

        const mostrarData = (data) => {
            let tbody = "";
            for (var i = 0; i < data.length; i++) {
                tbody += `<tr>
                    <td>${data[i].nombre}</td>
                    <td>
                        <a href="detalleProducto.html?codigo=${encodeURIComponent(data[i].codigo)}&nombre=${encodeURIComponent(data[i].nombre)}&foto=${encodeURIComponent(data[i].foto)}&precio=${encodeURIComponent(data[i].precio)}&descripcion=${encodeURIComponent(data[i].descripcion)}">
                            <img src="${data[i].foto}" class="tabla-producto-img" alt="${data[i].nombre}">
                        </a>
                    </td>
                    <td>$${data[i].precio}</td>
                    <td>${data[i].descripcion}</td>
                </tr>`;
            }
            document.getElementById('tabla-productos').innerHTML = tbody;
}