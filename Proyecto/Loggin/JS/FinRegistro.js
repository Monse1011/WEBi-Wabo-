document.addEventListener("DOMContentLoaded", () => {
    const dogImage = document.getElementById("dogImage");
    const newDogButton = document.getElementById("newDogButton");

    // Función para obtener una imagen aleatoria
    async function fetchRandomDogImage() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            if (data.status === "success") {
                dogImage.src = data.message;
            } else {
                console.error("Failed to fetch dog image.");
            }
        } catch (error) {
            console.error("Error fetching the dog image:", error);
        }
    }

    // Cargar una imagen al iniciar la página
    fetchRandomDogImage();

    // Evento para cargar una nueva imagen al hacer clic en el botón
    newDogButton.addEventListener("click", fetchRandomDogImage);
});
