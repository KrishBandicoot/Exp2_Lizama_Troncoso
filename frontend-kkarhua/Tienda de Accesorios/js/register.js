
        window.onload=function(){
        const inputCorreo = document.getElementById("correo");
        const mensajeCorreo = document.getElementById("mensajeCorreo");
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        inputCorreo.addEventListener("input", function () {
        const email = inputCorreo.value.trim();
        if (email === "") {
            mensajeCorreo.textContent = "El correo no puede estar vacío.";
            mensajeCorreo.className = "error";
        } else if (!regexEmail.test(email)) {
            mensajeCorreo.textContent = "Formato de correo inválido.";
            mensajeCorreo.className = "error";
        } else {
            mensajeCorreo.textContent = "Correo válido ✔️";
            mensajeCorreo.className = "valido";
        }
        });
        const inputPass = document.getElementById("pass");
        const mensajePass = document.getElementById("mensajePass");
        inputPass.addEventListener("input", function () {
            const pass = inputPass.value;
            const requisitos = [
                { test: /.{8,}/, mensaje: "Mínimo 8 caracteres." },
                { test: /[a-z]/, mensaje: "Al menos una letra minúscula." },
                { test: /[A-Z]/, mensaje: "Al menos una letra mayúscula." },
                { test: /\d/, mensaje: "Al menos un número." }
            ];
            let errores = requisitos.filter(r => !r.test.test(pass)).map(r => r.mensaje);
            if (pass === "") {
                mensajePass.textContent = "La contraseña no puede estar vacía.";
                mensajePass.className = "error";
            } else if (errores.length > 0) {
                mensajePass.textContent = "Requisitos: " + errores.join(" ");
                mensajePass.className = "error";
            } else {
                mensajePass.textContent = "Contraseña válida ✔️";
                mensajePass.className = "valido";
            }
        }); 
        const inputCorreoConfirm = document.getElementById("correoConfirm");
        const mensajeCorreoConfirm = document.getElementById("mensajeCorreoConfirm");
        inputCorreoConfirm.addEventListener("input", function () {
            if (inputCorreoConfirm.value.trim() === "") {
                mensajeCorreoConfirm.textContent = "Confirma tu correo.";
                mensajeCorreoConfirm.className = "error";
            } else if (inputCorreoConfirm.value.trim() !== inputCorreo.value.trim()) {
                mensajeCorreoConfirm.textContent = "Los correos no coinciden.";
                mensajeCorreoConfirm.className = "error";
            } else {
                mensajeCorreoConfirm.textContent = "¡Los correos coinciden! ✔️";
                mensajeCorreoConfirm.className = "valido";
            }
        });   
        const inputPassConfirm = document.getElementById("passConfirm");
        const mensajePassConfirm = document.getElementById("mensajePassConfirm");
        inputPassConfirm.addEventListener("input", function () {
            if (inputPassConfirm.value.trim() === "") {
                mensajePassConfirm.textContent = "Confirma tu contraseña.";
                mensajePassConfirm.className = "error";
            } else if (inputPassConfirm.value.trim() !== inputPass.value.trim()) {
                mensajePassConfirm.textContent = "Las contraseñas no coinciden.";
                mensajePassConfirm.className = "error";
            } else {
                mensajePassConfirm.textContent = "¡Las contraseñas coinciden! ✔️";
                mensajePassConfirm.className = "valido";
            }
        });
    }


    document.getElementById("datos").addEventListener("submit", function(e) {
        e.preventDefault();
        const nombre = document.getElementById("nom").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const pass = document.getElementById("pass").value.trim();
        const tel = document.getElementById("tel").value.trim();
        const comunaSelect = document.getElementById("comuna");
        const comuna = comunaSelect.options[comunaSelect.selectedIndex].text;

        const usuario = {
            nombre: nombre,
            correo: correo,
            pass: pass,
            tel: tel,
            comuna: comuna
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
        })
        .catch(error => {
            alert("Error al registrar usuario.");
            console.log(error);
        });
    });

