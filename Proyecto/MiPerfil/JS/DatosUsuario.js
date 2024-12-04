document.addEventListener("DOMContentLoaded", () => {

    fetch("DatosUsuario.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener los datos del perfil");
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            // Actualizar el contenido del HTML con los datos del usuario
            document.getElementById("nombreUsuario").textContent = `Nombre: ${data.usuario.nombre}`;
            document.getElementById("correoElectronico").textContent = `Correo: ${data.usuario.email}`;
        } else {
            alert(data.message || "No se pudo cargar el perfil");
        }
    })
    .catch(error => {
        console.error("Hubo un problema con la solicitud:", error);
        alert("Error al cargar el perfil.");
    });
});