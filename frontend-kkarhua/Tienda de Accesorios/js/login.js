document.getElementById("datos").addEventListener("submit", function(e) {
    e.preventDefault();
    const correo = document.getElementById("correo").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const correoValido = /^[\w\.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
    if (correo.length > 100) {
        alert("El correo no puede tener más de 100 caracteres.");
        return;
    }
    if (!correoValido) {
        alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com");
        return;
    }

    fetch(`http://localhost:3000/usuarios?correo=${encodeURIComponent(correo)}&pass=${encodeURIComponent(pass)}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0 && data[0].tipoUsuario === "Administrador") {
                window.location.href = "home-admin.html";
            } else if (data.length > 0) {
                alert("Acceso solo para el administrador.");
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
});