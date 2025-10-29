const params = new URLSearchParams(window.location.search);

document.getElementById("nombre").textContent = params.get("nombre");
document.getElementById("nombre-breadcrumb").textContent = params.get("nombre");
document.getElementById("imagen").src = params.get("foto");
document.getElementById("imagen").alt = params.get("nombre");
document.getElementById("precio").textContent = params.get("precio");
document.getElementById("descripcion").textContent = params.get("descripcion");

