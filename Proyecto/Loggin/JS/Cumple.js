document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form[name="uady"]').addEventListener('submit', function (e) {
        e.preventDefault();

        console.log('Cumple.js cargado');

        const dia = document.getElementById('dia').value.trim();
        const mes = document.getElementById('mes').value.trim();
        const año = document.getElementById('año').value.trim();

        if (!dia || !mes || !año) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Todos los campos son obligatorios.',
            });
            return;
        }

        const fechaNacimiento = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

 
        const fechaHoy = new Date();
        const fechaNacimientoObj = new Date(fechaNacimiento);

        if (fechaNacimientoObj > fechaHoy) {
            Swal.fire({
                icon: 'error',
                title: 'Fecha futura',
                text: 'La fecha de nacimiento no puede ser una fecha futura.',
            });
            return;
        }

     
        const edad = calcularEdad(fechaNacimientoObj);

        if (edad < 18) {
            Swal.fire({
                icon: 'error',
                title: 'Edad insuficiente',
                text: 'Debes ser mayor de 18 años para registrarte.',
            });
            return;
        }

        const email = localStorage.getItem('email');

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se encontró un email válido.',
            });
            return;
        }

        const data = {
            email: email,
            fecha_nacimiento: fechaNacimiento,
        };

        fetch('../php/Cumple.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Fecha registrada',
                    text: data.message,
                }).then(() => {
                    window.location.href = '../html/Genero.html';
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
            console.error('Error al enviar los datos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar los datos.',
            });
        });
    });
});

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth();
    const dia = hoy.getDate();

    if (mes < fechaNacimiento.getMonth() || (mes === fechaNacimiento.getMonth() && dia < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad;
}
