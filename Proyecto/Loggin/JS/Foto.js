document.addEventListener('DOMContentLoaded', () => {
    const inputFile = document.getElementById('photos');
    const gallery = document.querySelector('.gallery');
    const submitButton = document.getElementById('button');


    inputFile.addEventListener('change', function(event) {
        const files = event.target.files;


        gallery.innerHTML = "";


        if (files.length > 0) {

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
        
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.width = '120px';
                        img.style.margin = '0 10px 10px 0';
                        gallery.appendChild(img);
                    };

                    reader.readAsDataURL(file);
                } else {
                    Swal.fire('Solo se permiten imágenes');
                }
            }
        }

    });


    submitButton.addEventListener('click', () => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const confirmPassword = localStorage.getItem('confirmPassword');
        const nombre = localStorage.getItem('nombre');
        const genero = localStorage.getItem('genero');
        const fechaNacimiento = localStorage.getItem('fechaNacimiento');
    
        fetch('../php/Servidor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                nombre: nombre,
                genero: genero,
                fechaNacimiento: fechaNacimiento,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Perfecto',
                    text: 'Usuario registrado exitosamente en UadyPoint',
                }).then(() => {
                    window.location.href = '../html/FinRegistro.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                }).then(()=>{
                    window.location.href = '../html/Correo.html';
                    localStorage.clear();
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
    });
    

    
});
