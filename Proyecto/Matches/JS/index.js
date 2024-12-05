document.addEventListener("DOMContentLoaded", () => {
    const iconElement = document.querySelector(".icono-mensaje i");
    
    async function fetchJoke() {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&lang=es');
            const data = await response.json();

            if (data.error) {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Lo siento, hubo un error al obtener el chiste.',
                    showConfirmButton: true,
                });
            } else {
         
                if (data.type === 'single') {
                    Swal.fire({
                        title: 'Aquí tienes un chiste:',
                        text: data.joke,
                        showConfirmButton: true,
                    });
                } else {

                    Swal.fire({
                        title: 'Aquí tienes un chiste:',
                        text: `${data.setup} - ${data.delivery}`,
                        showConfirmButton: true,
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Error al obtener el chiste. Intenta nuevamente más tarde.',
                showConfirmButton: true,
            });
            console.error(error);
        }
    }


    iconElement.addEventListener("click", fetchJoke);
});
