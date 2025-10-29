let url = 'http://localhost:3000/usuarios';

fetch(url)
    .then(response => response.json())
    .then(data => mostrarUsuarios(data))
    .catch(error => console.log(error));

function mostrarUsuarios(data) {
    let tbody = "";
    for (let i = 0; i < data.length; i++) {
        tbody += `<tr>
            <td>${data[i].run || ''}</td>
            <td>${data[i].nombre || ''}</td>
            <td>${data[i].apellidos || ''}</td>
            <td>${data[i].correo || ''}</td>
            <td>${data[i].fechaNacimiento || ''}</td>
            <td>${data[i].tipoUsuario || ''}</td>
            <td>${data[i].region || ''}</td>
            <td>${data[i].comuna || ''}</td>
            <td>${data[i].direccion || ''}</td>
        </tr>`;
    }
    document.getElementById('tabla-usuarios').innerHTML = tbody;
}


        const regiones = [
            { nombre: "Región Metropolitana", comunas: ["Santiago", "Maipú", "Ñuñoa", "La Florida", "Providencia"] },
            { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
            { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Coronel"] }
        ];
