window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault(); 

        const mail = document.getElementById('mail').value.trim();
        const password = document.getElementById('password').value.trim();


        let formValid = true;

        if (mail === "") {
            alert("Por favor, ingresa tu correo institucional.");
            formValid = false;

        }else if (password === "") {
            alert("Por favor, ingresa tu contraseña.");
            formValid = false;
        }

        if (formValid) {
            window.location.href = "../../ConocerGente/HTML/conocerGente.html";  
        }
    });
});

