window.onload = function () {
    const regiones = [
        { nombre: "Región Metropolitana", comunas: ["Santiago", "Maipú", "Ñuñoa", "La Florida", "Providencia"] },
        { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
        { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Coronel"] }
    ];

    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    regionSelect.addEventListener("change", function () {
        comunaSelect.innerHTML = "";
        let comunas = [];
        for (let r of regiones) {
            if (r.nombre === regionSelect.value) {
                comunas = r.comunas;
                break;
            }
        }
        comunas.forEach(comuna => {
            comunaSelect.innerHTML += `<option value="${comuna}">${comuna}</option>`;
        });
    });

    document.getElementById("datos").addEventListener("submit", function (e) {
        e.preventDefault();

        const run = document.getElementById("run").value.trim();
        if (!/^[0-9]{7,8}[kK0-9]{1}$/.test(run)) {
            alert("RUN inválido. Ejemplo: 19011022K");
            return;
        }

        const correo = document.getElementById("correo").value.trim();
        if (!/^[\w\.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)) {
            alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com");
            return;
        }

        const usuario = {
            run: run,
            nombre: document.getElementById("nombre").value.trim(),
            apellidos: document.getElementById("apellidos").value.trim(),
            correo: correo,
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            tipoUsuario: document.getElementById("tipoUsuario").value,
            region: document.getElementById("region").value,
            comuna: document.getElementById("comuna").value,
            direccion: document.getElementById("direccion").value.trim()
        };

        fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(res => res.json())
            .then(data => {
                alert("Usuario registrado exitosamente.");
                document.getElementById("datos").reset();
                comunaSelect.innerHTML = "";
            })
            .catch(error => {
                alert("Error al registrar usuario.");
                console.log(error);
            });
    });
}
