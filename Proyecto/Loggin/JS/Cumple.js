window.addEventListener('pageshow', () => {
    const form = document.querySelector(".formulario form");
    const diaInput = document.querySelector(".dia input");
    const mesInput = document.querySelector(".mes input");
    const anioInput = document.querySelector(".año input");

    const isNumeric = (str) => /^\d+$/.test(str);

    const validateDate = (day, month, year) => {
        if (!isNumeric(day) || !isNumeric(month) || !isNumeric(year)) {
            alert("Por favor, ingresa solo números en los campos de fecha.");
            return false;
        }

        const dia = parseInt(day, 10);
        const mes = parseInt(month, 10);
        const anio = parseInt(year, 10);

        if (dia < 1 || dia > 31) {
            alert("Por favor, ingresa un día válido (1-31).");
            return false;
        }
        if (mes < 1 || mes > 12) {
            alert("Por favor, ingresa un mes válido (1-12).");
            return false;
        }
        if (anio > new Date().getFullYear() || anio < 1900) {
            alert("Por favor, ingresa un año válido.");
            return false;
        }

        const birthDate = new Date(anio, mes - 1, dia);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
            alert("Debes ser mayor de 18 años para poder continuar.");
            return false;
        }

        return true;
    };

    // Limpia el campo cuando el usuario hace clic en él la primera vez
    [diaInput, mesInput, anioInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.value = "";
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const dia = diaInput.value.trim();
        const mes = mesInput.value.trim();
        const anio = anioInput.value.trim();

        if (!dia || !mes || !anio) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (validateDate(dia, mes, anio)) {
            window.location.href = "Genero.html";
        }
    });
});
