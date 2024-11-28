window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = document.querySelectorAll('input[type="password"]')[1];

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    const validateNotEmpty = (input) => input.trim() !== "";
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@alumnos\.uady\.mx$/.test(email);
    const validatePasswordLength = (password) => password.length >= 8;
    const validatePasswordMatch = (password, confirmPassword) => password === confirmPassword;

    const setError = (input, messageElement, message) => {
        input.classList.add('error');
        messageElement.textContent = message;
    };

    const clearError = (input, messageElement) => {
        input.classList.remove('error');
        messageElement.textContent = "";
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        let hasError = false;

       
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
        clearError(confirmPasswordInput, confirmPasswordError);

  
        if (!validateNotEmpty(emailInput.value)) {
            setError(emailInput, emailError, 'El campo de correo no puede estar vacío.');
            hasError = true;
        } else if (!validateEmail(emailInput.value)) {
            setError(emailInput, emailError, 'Por favor, ingresa un correo institucional válido que termine en @alumnos.uady.mx.');
            hasError = true;
        }

        if (!validateNotEmpty(passwordInput.value)) {
            setError(passwordInput, passwordError, 'El campo de contraseña no puede estar vacío.');
            hasError = true;
        } else if (!validatePasswordLength(passwordInput.value)) {
            setError(passwordInput, passwordError, 'La contraseña debe tener al menos 8 caracteres.');
            hasError = true;
        }

        if (!validateNotEmpty(confirmPasswordInput.value)) {
            setError(confirmPasswordInput, confirmPasswordError, 'El campo de confirmación de contraseña no puede estar vacío.');
            hasError = true;
        } else if (!validatePasswordMatch(passwordInput.value, confirmPasswordInput.value)) {
            setError(confirmPasswordInput, confirmPasswordError, 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            hasError = true;
        }

      
        if (!hasError) {
            form.submit(); 
        }
    });
});
