document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("#contenedor_candidato_imagen img");
    let currentIndex = 0;
  
    // Asegúrate de que solo la primera imagen esté visible inicialmente
    images.forEach((img, index) => {
      img.style.opacity = index === 0 ? "1" : "0";
    });
  
    function changeImage() {
      // Ocultar la imagen actual
      images[currentIndex].style.opacity = "0";
  
      // Pasar a la siguiente imagen (o volver al inicio)
      currentIndex = (currentIndex + 1) % images.length;
  
      // Mostrar la nueva imagen
      images[currentIndex].style.opacity = "1";
    }
  
    // Cambiar imagen cada 3 segundos
    setInterval(changeImage, 3000);
  });