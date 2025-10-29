fetch('http://localhost:3001/productos')
    .then(res => res.json())
    .then(data => mostrarProductos(data));

function mostrarProductos(data) {
    let tbody = "";
    for (let i = 0; i < data.length; i++) {
        tbody += `<tr>
            <td>${data[i].codigo || ''}</td>
            <td>${data[i].nombre || ''}</td>
            <td><img src="${data[i].foto || ''}" class="tabla-producto-img" alt="${data[i].nombre || ''}"></td>
            <td>$${data[i].precio || ''}</td>
            <td>${data[i].descripcion || ''}</td>
            <td>${data[i].stock || ''}</td>
            <td>${data[i].stockCritico || ''}</td>
            <td>${data[i].categoria || ''}</td>
        </tr>`;
    }
    document.getElementById('tabla-productos').innerHTML = tbody;
}