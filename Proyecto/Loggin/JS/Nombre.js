window.addEventListener('DOMContentLoaded', () => {


    const form = document.querySelector(".formulario form"); 
    const nombreInput = document.getElementById("name");

   
    const validateNotEmpty = (input) => input.trim() !== "";

  
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const nombre = nombreInput.value; 


        if (!validateNotEmpty(nombre)) {
            alert('Por favor ingresa tu nombre');
            return; 
        }

        window.location.href = "Cumple.html";
    });
});
