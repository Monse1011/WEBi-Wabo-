window.addEventListener('pageshow', () => {
    const botonesGenero = document.querySelectorAll('.genero input[type="button"]');
    const botonContinuar = document.querySelector('.boton button');
    let generoSeleccionado = null; 


    botonesGenero.forEach(boton => {
        boton.addEventListener('click', () => {

            botonesGenero.forEach(b => {
                b.style.backgroundColor = ""; 
                b.style.color = "";
                b.style.border = ""; 
            });

            boton.style.backgroundColor = "#192762"; 
            boton.style.color = "White"; 
            generoSeleccionado = boton.value; 
        });
    });


    botonContinuar.addEventListener('click', (event) => {
        if (!generoSeleccionado) {
            event.preventDefault(); 
            alert("Por favor, selecciona un género para continuar.");
        } else {

            window.location.href = "Foto.html";
        }
    });
});
