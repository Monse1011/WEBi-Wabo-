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

        if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
            Swal.fire({
                icon: 'error',
                title: 'Formato incorrecto',
                text: 'Los campos de día, mes y año deben contener solo números.',
            });
            return;
        }

        if (año.length !== 4) {
            Swal.fire({
                icon: 'error',
                title: 'Año no válido',
                text: 'El año debe tener exactamente 4 dígitos.',
            });
            return;
        }


        if (parseInt(dia) <= 0 || parseInt(dia) > 31 || parseInt(mes) <= 0 || parseInt(mes) > 12 || parseInt(año) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Fecha no válida',
                text: 'El día, mes o año ingresado no es válido.',
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


        localStorage.setItem('fechaNacimiento',fechaNacimiento);

        Swal.fire({
            icon: 'success',
            title: 'Fecha registrada',
            text: 'La fecha ha sido registrada correctamente',
        }).then(() => {
            window.location.href = '../html/Genero.html';
        });

        /*

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
        */
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
