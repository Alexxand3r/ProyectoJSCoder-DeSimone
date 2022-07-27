'use strict';

let cliente = {
  mesa: '',
  hora: '',
  pedido: [],
};

const categorias = {
  1: 'Comida',
  2: 'Bebida',
  3: 'Postre',
};

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente() {
  //console.log('probando la función');
  const mesa = document.querySelector('#mesa').value;
  const hora = document.querySelector('#hora').value;

  //validación campos vacíos
  const camposVacios = [mesa, hora].some(campo => campo === '');

  if (camposVacios) {
    // console.log('hay campos vacíos');
    //crear alerta
    //evitar q se repita
    //borrarla después de 2.5seg
    //comprobar si existe alerta
    const existeAlerta = document.querySelector('.invalid-feedback');

    if (!existeAlerta) {
      const alerta = document.createElement('DIV');
      alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
      alerta.textContent = 'Completar todos los Campos';
      document.querySelector('.modal-body form').appendChild(alerta);

      setTimeout(() => {
        alerta.remove();
      }, 2500);
    }

    return;
  }

  //console.log('todos los campos llenos');

  //Asignar los datos del formulario al cliente
  //mantener el arreglo del pedido
  //spread "cliente" primero,para no sobrescribir los datos con el objeto vació
  cliente = { ...cliente, mesa, hora };

  //console.log(cliente);

  //Ocultar Modal pasada la validación

  //obtener formulario//obtener instancia de bootstrap
  const modalFormulario = document.querySelector('#formulario');
  //función modal:getInstance obtiene el modal actual//instancia del formulario
  const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
  //método Bootstrap para ocultar
  modalBootstrap.hide();

  //Mostrar  Menu/Secciones
  mostrarSecciones();
  //mostrar Menu de API de JSON-Server
  obtenerMenu();
}

//FUNCIONES

function mostrarSecciones() {
  //selecciono las q tienen la clase de bootstrap "d-none"
  const seccionesOcultas = document.querySelectorAll('.d-none');
  //devuelve arreglo con los elementos,itero y les remuevo la clase
  seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerMenu() {
  const url = 'http://localhost:4000/platos';

  fetch(url)
    // .then(respuesta => console.log(respuesta))
    .then(respuesta => respuesta.json())
    //devuelve como objeto ".json"
    //.then(resultado => console.log(resultado))
    .then(resultado => mostrarMenu(resultado))

    .catch(error => console.log(error));
}

function mostrarMenu(menu) {
  //console.log(menu);
  const contenido = document.querySelector('#menu .contenido');

  //acceder a cada uno de los resultados q se obtienen con fetch
  menu.forEach(plato => {
    //console.log(plato);

    const row = document.createElement('DIV');
    row.classList.add('row', 'py-3', 'border-top');

    const nombre = document.createElement('DIV');
    nombre.classList.add('col-md-4');
    nombre.textContent = plato.nombre;

    const precio = document.createElement('DIV');
    precio.classList.add('col-md-3', 'fw-bold');
    precio.textContent = `$${plato.precio}`;
    // console.log(precio);

    const categoria = document.createElement('DIV');
    categoria.classList.add('col-md-3');
    categoria.textContent = categorias[plato.categoria];

    const inputCantidad = document.createElement('INPUT');
    inputCantidad.type = 'number';
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    //asignar id como un atributo
    inputCantidad.id = `producto-${plato.id}`;
    inputCantidad.classList.add('form-control');
    //console.log(inputCantidad);

    //Función para detectar la cantidad y el platillo q se esta agregando
    //Asociar un evento que mantenga como referencia//onchange,no se puede usar eventListener
    inputCantidad.onchange;

    const agregarInput = document.createElement('DIV');
    agregarInput.classList.add('col-md-2');
    agregarInput.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregarInput);

    contenido.appendChild(row);
  });
}
