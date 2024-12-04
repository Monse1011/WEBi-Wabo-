document.addEventListener('DOMContentLoaded', () => {
    const inputFile = document.getElementById('photos');
    const gallery = document.querySelector('.gallery');
    const submitButton = document.getElementById('button');

    // Manejar el cambio de archivos (drag & drop o selección)
    inputFile.addEventListener('change', function(event) {
        const files = event.target.files;

        // Limpiar la galería antes de agregar nuevas imágenes
        gallery.innerHTML = "";

        // Verificar si se seleccionaron archivos
        if (files.length > 0) {
            // Mostrar cada archivo seleccionado
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                // Validar que el archivo sea una imagen
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

        submitButton.addEventListener('click', () => {
            const email = localStorage.getItem('email'); 
            const files = inputFile.files;
    
          
            if (files.length === 0) {
                Swal.fire('Por favor, selecciona al menos una imagen');
                return;
            }

            Swal.fire('¡Éxito!', 'Las imágenes se han subido correctamente.', 'success').then(() => {
                window.location.href = '../html/FinRegistro.html';
            }); 

    });
    });

/*
    submitButton.addEventListener('click', () => {
        const email = localStorage.getItem('email'); 
        const files = inputFile.files;

      
        if (files.length === 0) {
            Swal.fire('Por favor, selecciona al menos una imagen');
            return;
        }

        // Crear un FormData para enviar las imágenes por Fetch
        const formData = new FormData();
        formData.append('email', email); // Agregar email al FormData

        for (let i = 0; i < files.length; i++) {
            formData.append('photos[]', files[i]); // Agregar cada imagen
        }

        // Usar Fetch para enviar las imágenes al servidor
        fetch('../php/Foto.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                Swal.fire('¡Éxito!', 'Las imágenes se han subido correctamente.', 'success').then(() => {
                    window.location.href = '../html/FinRegistro.html'; 
                });
            } else {
                Swal.fire('Error', 'Hubo un problema al subir las imágenes.', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Error', 'Hubo un error al conectar con el servidor.', 'error');
            console.error('Error al subir las imágenes:', error);
        });
    });

    */
});
