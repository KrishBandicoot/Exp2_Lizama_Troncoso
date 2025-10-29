let url = 'http://localhost:3000/usuarios';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarUsuarios(data))
        .catch(error => console.log(error));

        function mostrarUsuarios(data) {
            let tbody = "";
            for (let i = 0; i < data.length; i++) {
                tbody += `<tr>
                    <td>${data[i].nombre || ''}</td>
                    <td>${data[i].correo || ''}</td>
                    <td>${data[i].tel || ''}</td>
                    <td>${data[i].comuna || ''}</td>
                </tr>`;
            }
            document.getElementById('tabla-usuarios').innerHTML = tbody;
        }