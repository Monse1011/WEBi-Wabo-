

document.querySelector('form[name="uady"]').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value.trim();


    if (email === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'El correo institucional es obligatorio.',
        });
        return;
    }

    if (!email.endsWith('@alumnos.uady.mx')) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'El correo debe ser del dominio @alumnos.uady.mx',
        });
        return;
    }

    if (password === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'La contraseña es obligatoria.',
        });
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas no coinciden',
            text: 'Ambas contraseñas deben ser iguales.',
        });
        return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password',password);
    localStorage.setItem('confirmPassword',confirmPassword);


     Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Bienvenido a UadyPoint!',
        }).then(() => {
            window.location.href = '../html/Nombre.html';
        });

/*
    fetch('../php/Correo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }),
    })
        .then(response => response.json())
        .then(data => {
    
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: '¡Bienvenido a UadyPoint!',
                }).then(() => {
                    window.location.href = '../html/Nombre.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
            }

            
        });
    */
});
