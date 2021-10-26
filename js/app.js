//Variables 
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =document.querySelector('#vaciar-carrito');
let articuloCarrito = [];

cargarEvenListeners();
function cargarEvenListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articuloCarrito = []; //Resetamos el arreglo
        limpiarHTMl(); // Eliminamos todo el HTML
    })
}

//Funciones 
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();//Volvemos a interar sobre el carrito y mostramos el html
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    console.log(curso);
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articuloCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articuloCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto duplicado
            }else{
                return curso // Retorna los objetos que no son los duplicados
            }
        })
        articuloCarrito = [...cursos];
    }else{
        //Agregar elementos al arreglo de carrito
        articuloCarrito = [...articuloCarrito,infoCurso];
    }
    console.log(articuloCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en le HTML

function carritoHTML(){

    //Limpiar el HTML
    limpiarHTMl();

    articuloCarrito.forEach(curso=>{
        const {imagen,titulo,precio,id,cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href='#' class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTMl(){
    //Forma lenta
    // contenedorCarrito.innerHTML ='';

    //Forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}