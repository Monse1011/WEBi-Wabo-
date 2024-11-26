document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const comentarios = document.querySelectorAll(".comentario");

    // Mostrar el primer comentario
    comentarios[currentIndex].classList.add("active");

    // Función para deslizar los comentarios
    function slideComments() {
        // Oculta el comentario actual
        comentarios[currentIndex].classList.remove("active");

        // Calcula el siguiente índice
        currentIndex = (currentIndex + 1) % comentarios.length;

        // Muestra el siguiente comentario con la clase active
        comentarios[currentIndex].classList.add("active");
    }

    // Cambia de comentario cada 5 segundos
    setInterval(slideComments, 5000);
});


