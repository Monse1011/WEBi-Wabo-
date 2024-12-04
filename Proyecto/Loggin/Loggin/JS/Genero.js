document.getElementById("button").addEventListener("click", function() {
   
    const generoSeleccionado = document.querySelector('input[name="genero"]:checked');


    if (!generoSeleccionado) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, selecciona un género.',
        });
        return;
    }


    const genero = generoSeleccionado.value;
    const email = localStorage.getItem('email'); 


    localStorage.setItem('genero',genero);

    Swal.fire({
        icon: 'success',
        title: 'Perfecto',
        text: 'Género registrado correctamente',
    }).then(() => {
        window.location.href = '../html/Foto.html'; 
    });


  /*
    fetch('../php/Genero.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            genero: genero
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                tittle: 'Perfecto',
                text: 'Género ingresado correctamente',
            }).then(() => {
                window.location.href = '../html/Foto.html'; 
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'Ocurrió un error al enviar los datos.',
        });
        
    });
    */
});
