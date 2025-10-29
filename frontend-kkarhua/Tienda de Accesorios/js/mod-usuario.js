fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(data => mostrarUsuarios(data));

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
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarUsuario('${data[i].id}')">Editar</button>
            </td>
        </tr>`;
    }
    document.getElementById('tabla-usuarios').innerHTML = tbody;
}

function editarUsuario(id) {
    fetch('http://localhost:3000/usuarios/' + id)
        .then(res => res.json())
        .then(usuario => {
            document.getElementById('form-editar').style.display = 'block';
            document.getElementById('edit-id').value = usuario.id || '';
            document.getElementById('edit-run').value = usuario.run || '';
            document.getElementById('edit-nombre').value = usuario.nombre || '';
            document.getElementById('edit-apellidos').value = usuario.apellidos || '';
            document.getElementById('edit-correo').value = usuario.correo || '';
            document.getElementById('edit-fechaNacimiento').value = usuario.fechaNacimiento || '';
            document.getElementById('edit-tipoUsuario').value = usuario.tipoUsuario || '';
            document.getElementById('edit-region').value = usuario.region || '';
            actualizarComunas(usuario.region, usuario.comuna);
            document.getElementById('edit-direccion').value = usuario.direccion || '';
        });
}
function actualizarComunas(regionSeleccionada, comunaSeleccionada) {
    const regiones = [
        { nombre: "Región Metropolitana", comunas: ["Santiago", "Maipú", "Ñuñoa", "La Florida", "Providencia"] },
        { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
        { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Coronel"] }
    ];
    const comunaSelect = document.getElementById('edit-comuna');
    comunaSelect.innerHTML = "";
    let comunas = [];
    for (let r of regiones) {
        if (r.nombre === regionSeleccionada) {
            comunas = r.comunas;
            break;
        }
    }
    comunas.forEach(comuna => {
        let selected = comuna === comunaSeleccionada ? "selected" : "";
        comunaSelect.innerHTML += `<option value="${comuna}" ${selected}>${comuna}</option>`;
    });
}

document.getElementById('edit-region').addEventListener('change', function() {
    actualizarComunas(this.value, "");
});

document.getElementById('form-editar').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const usuario = {
        run: document.getElementById('edit-run').value,
        nombre: document.getElementById('edit-nombre').value,
        apellidos: document.getElementById('edit-apellidos').value,
        correo: document.getElementById('edit-correo').value,
        fechaNacimiento: document.getElementById('edit-fechaNacimiento').value,
        tipoUsuario: document.getElementById('edit-tipoUsuario').value,
        region: document.getElementById('edit-region').value,
        comuna: document.getElementById('edit-comuna').value,
        direccion: document.getElementById('edit-direccion').value
    };
    fetch('http://localhost:3000/usuarios/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
    .then(res => res.json())
    .then(data => {
        alert('Usuario actualizado');
        document.getElementById('form-editar').style.display = 'none';
        fetch('http://localhost:3000/usuarios')
            .then(res => res.json())
            .then(data => mostrarUsuarios(data));
    });
});

document.getElementById('cancelar-edicion').addEventListener('click', function() {
    document.getElementById('form-editar').style.display = 'none';
});