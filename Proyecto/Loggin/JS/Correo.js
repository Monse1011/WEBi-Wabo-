window.addEventListener('pageshow', () => {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = document.querySelectorAll('input[type="password"]')[1];

    const validateNotEmpty = (input) => input.trim() !== "";
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@alumnos\.uady\.mx$/.test(email);
    const validatePasswordLength = (password) => password.length >= 8;
    const validatePasswordMatch = (password, confirmPassword) => password === confirmPassword;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!validateNotEmpty(email)) {
            alert('El campo de correo no puede estar vacío.');
            return;
        }
        
        if (!validateNotEmpty(password)) {
            alert('El campo de contraseña no puede estar vacío.');
            return;
        }
        
        if (!validateNotEmpty(confirmPassword)) {
            alert('El campo de confirmación de contraseña no puede estar vacío.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingresa un correo institucional válido que termine en @alumnos.uady.mx.');
            return;
        }

        if (!validatePasswordLength(password)) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (!validatePasswordMatch(password, confirmPassword)) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        window.location.href = "../HTML/Nombre.html";
    });
});
