// Script para generar header, body y footer dinámicamente para páginas web
// Variables globales:
isMikelPresent = true
projectName = "test"

function createNewElement(name, type, width, height, X, Y, parentElement) {
    
    let newElement = document.createElement(type);
    newElement.style.width = width + "px";
    newElement.style.height = height + "px";
    newElement.style.position = "absolute";
    newElement.style.top = Y + "px";
    newElement.style.left = X + "px";
    if (parentElement){
        parentElement.appendChild(newElement);
    } else {
        document.body.appendChild(newElement);
    }
    return newElement;

}
function buildPageTemplate() {
    // Crea header element
    const header = document.createElement('header');
    header.style.backgroundColor = '#333';
    header.style.color = '#fff';
    header.style.padding = '10px 20px';
    header.style.textAlign = 'center';
    header.innerHTML = `
        <h1>Website Header</h1>
        <nav>
            <ul>
                <a>Inicio</a>
                <a>Apuestas</a>
                <a>Cartera</a>
                <a>Asistente virtual</a>
            </ul>
        </nav>
        `;

    // Crea main body element
    const container = document.createElement('div');
    // Remplazar por el nombre del elemento que queramos crear.
    // ¿Ingeniero? Nah, sólo me aburro mucho en casa mientras espero =P
    container.style.minHeight = '400px';
    container.style.padding = '20px';
    container.innerHTML = '<p>Esto es el main/body/container, según cómo quieras llamarlo. Normalmente lo llamo container.</p>';

    // Crear footer element
    const footer = document.createElement('footer');
    footer.style.backgroundColor = '#333';
    footer.style.color = '#fff';
    footer.style.padding = '10px 20px';
    footer.style.textAlign = 'center';
    footer.style.position = 'fixed';
    footer.style.width = '100%';
    footer.style.bottom = '0';
    if (isMikelPresent) {
        footer.innerHTML = `<p>${projectName} &copy; | Carlos Mansilla Cruz | Mikel Sierra | 2025 - VS2DAW ${new Date().getFullYear()}</p>`;
    } else {
        footer.innerHTML = `<p>${projectName} &copy; || Carlos Mansilla Cruz ${new Date().getFullYear()}</p>`;
    }
    
    // Añadir elementos al body documento
    document.body.appendChild(header);
    document.body.appendChild(container);    
    // Por si acaso, Mikel, "container" sería un "objeto", creado en la línea 16. Lo pongo entre comillas por si no se llama así,
    // Aún así, te lo dejo por aquí más o menos documentado para que puedas usarlo si es preciso en tu examen con Sebas.
    // Quién sabe...igual te salva el culo o ahorras tiempo.
    document.body.appendChild(footer);
}
buildPageTemplate()
// Exporta la funcion si usamos modulos (opcional, pero lo evitaremos de momento por si acaso, para no tener más pegas de Camilo)
// export { buildPageTemplate };
