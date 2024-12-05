document.addEventListener('DOMContentLoaded', () => {
   
    document.querySelector('form[name="uady"]').addEventListener('submit', function (e) {
        e.preventDefault(); 


        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();

   
        if (email === '' || password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campo vacío',
                text: 'Por favor complete los campos.',
            });
            return; 
        }

        const data = {
            email: email,
            password: password,
        };

        
        fetch('../php/SignIn.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) 
        .then(data => {
            console.log(data); 

            if (data.success) {
                localStorage.setItem('email', email);

                Swal.fire({
                    icon: 'success',
                    title: 'Perfecto',
                    text: 'Usuario registrado correctamente'
                }).then(() => {
                    window.location.href = '../../ConocerGente/HTML/conocerGente.html';  
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
