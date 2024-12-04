document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form[name="uady"]').addEventListener('submit', function (e) {
        e.preventDefault(); 

        
        const email = localStorage.getItem('email');

        const name = document.querySelector('input[name="nombre"]').value.trim();

        
        if (name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campo vacío',
                text: 'El nombre es obligatorio.',
            });
            return;
        }

        
        const data = {
            email: email,
            name: name
        };

        
        fetch('../php/Nombre.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Perfecto',
                    text: 'Nombre ingresado correctamente'
                }).then(() => {
                    window.location.href = '../html/Cumple.html';  
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
