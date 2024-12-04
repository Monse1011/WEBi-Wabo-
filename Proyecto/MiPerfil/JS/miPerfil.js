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
    const secciones = document.querySelectorAll('.datoEtiquetas'); 

    secciones.forEach(seccion => {
        const editButton = seccion.querySelector('.editButtonEtiquetas'); 
        const opciones = seccion.querySelector('.opciones-buscando'); 
        const etiquetasContainer = seccion.querySelector('.etiquetas-container'); 

        editButton.addEventListener('click', () => {
            if (opciones.style.display === 'none' || opciones.style.display === '') {
                opciones.style.display = 'block';
                etiquetasContainer.style.backgroundColor = '#fff';
                editButton.textContent = 'Guardar';
                etiquetasContainer.style.pointerEvents = 'auto'; 
            } else {
                opciones.style.display = 'none';
                editButton.textContent = 'Editar';
                etiquetasContainer.style.backgroundColor= '#efefef4d';
                etiquetasContainer.style.pointerEvents = 'none'; 
            }
        });

        opciones.addEventListener('click', (event) => {
            if (event.target.tagName === 'I') {
                const tag = event.target.dataset.tag;

                if (!Array.from(etiquetasContainer.children).some(el => el.textContent.includes(tag))) {
                    const etiqueta = document.createElement('div');
                    etiqueta.className = 'etiqueta';
                    etiqueta.innerHTML = `${tag} <i class="fa-solid fa-times"></i>`;
                    etiquetasContainer.appendChild(etiqueta);
                }
            }
        });

        etiquetasContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'I') {
                const etiqueta = event.target.parentElement;
                etiquetasContainer.removeChild(etiqueta);
            }
        });
    });
});
