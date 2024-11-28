const datos = document.querySelectorAll('.dato');

datos.forEach((dato) => {
    const input = dato.querySelector('.inputDato'); 
    const button = dato.querySelector('.editButton'); 

    if (input && button) { 
        button.addEventListener('click', () => {
            if (input.disabled) {
                input.disabled = false; 
                input.focus(); 
                button.textContent = 'Guardar'; 
            } else {
                input.disabled = true; 
                button.textContent = 'Editar'; 
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('.datoEtiquetas'); // Selecciona todas las secciones

    secciones.forEach(seccion => {
        const editButton = seccion.querySelector('.editButtonEtiquetas'); // Botón de "Editar"
        const opciones = seccion.querySelector('.opciones-buscando'); // Lista de opciones
        const etiquetasContainer = seccion.querySelector('.etiquetas-container'); // Contenedor de etiquetas

        // Alternar entre editar/guardar
        editButton.addEventListener('click', () => {
            if (opciones.style.display === 'none' || opciones.style.display === '') {
                opciones.style.display = 'block';
                editButton.textContent = 'Guardar';
                etiquetasContainer.style.pointerEvents = 'auto'; // Permitir interacción
            } else {
                opciones.style.display = 'none';
                editButton.textContent = 'Editar';
                etiquetasContainer.style.pointerEvents = 'none'; // Bloquear interacción
            }
        });

        // Agregar etiquetas al contenedor
        opciones.addEventListener('click', (event) => {
            if (event.target.tagName === 'I') {
                const tag = event.target.dataset.tag;

                // Verifica que la etiqueta no exista ya
                if (!Array.from(etiquetasContainer.children).some(el => el.textContent.includes(tag))) {
                    const etiqueta = document.createElement('div');
                    etiqueta.className = 'etiqueta';
                    etiqueta.innerHTML = `${tag} <i class="fa-solid fa-times"></i>`;
                    etiquetasContainer.appendChild(etiqueta);
                }
            }
        });

        // Eliminar etiquetas del contenedor
        etiquetasContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'I') {
                const etiqueta = event.target.parentElement;
                etiquetasContainer.removeChild(etiqueta);
            }
        });
    });
});
