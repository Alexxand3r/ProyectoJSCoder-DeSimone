'use strict';

//seleccionar input´s

//variables de cada campo

const clienteReserva = document.querySelector('#clienteReserva');
const telefonoReserva = document.querySelector('#telefonoReserva');
const personasReserva = document.querySelector('#personasReserva');
const fechaReserva = document.querySelector('#fechaReserva');
const horaReserva = document.querySelector('#horaReserva');
const detalleReserva = document.querySelector('#detalleReserva');

// interfaz usuario

const formularioReserva = document.querySelector('#nueva-reserva');
const contenedorReservas = document.querySelector('#reservas');

class Reservas {
  constructor() {
    this.reservas = [];
  }

  agregarReserva(reserva) {
    this.reservas = [...this.reservas, reserva];
    console.log(this.reservas);
  }
}

class UsuarioInterfaz {
  imprimirAlerta(mensaje, tipo) {
    //crear el contenedor para el mensaje y agregar las clases(DIV)
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
    //Agregar clase
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }
    //Mensaje error
    divMensaje.textContent = mensaje;
    //incorporarlo al DOM
    document
      .querySelector('#contenidoCliente')
      .insertBefore(divMensaje, document.querySelector('.agregar-reserva'));
    //remover el alert en 3 segundos.
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  //se accede al arreglo del objeto mediante Destructuring desde el parámetro
  mostarReservas({ reservas }) {
    //metodo para evitar q se dupliquen las reservas.
    this.limpiarHTML();

    //const { reservas } = reservas;
    //console.log(reservas);
    reservas.forEach(reserva => {
      //Destructuring sobre reserva
      //se extrae del objeto actual,la reserva actual y el ID para editar o eliminar reserva
      const { cliente, telefono, personas, fecha, hora, detalle, id } = reserva;

      //estilo y creación del contenedor de cada reserva (DIV)
      const divReserva = document.createElement('div');
      divReserva.classList.add('reserva', 'p-3');
      //capturar el id y asignarlo como un atributo
      divReserva.dataset.id = id;

      //configuración de los elementos de la reserva a mostrar (Scripting)

      const clienteParrafo = document.createElement('h2');
      clienteParrafo.classList.add('card-title', 'font-weight-bolder');
      clienteParrafo.textContent = cliente;

      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `
      <span class="font-weight-bolder"> Teléfono: </span> ${telefono}
      `;

      const personasParrafo = document.createElement('p');
      personasParrafo.innerHTML = `
      <span class="font-weight-bolder"> Cantidad Personas : </span> ${personas}
      `;

      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `
      <span class="font-weight-bolder"> Fecha : </span> ${fecha}
      `;

      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `
      <span class="font-weight-bolder"> Hora : </span> ${hora}
      `;

      const detalleParrafo = document.createElement('p');
      detalleParrafo.innerHTML = `
      <span class="font-weight-bolder"> Detalles : </span> ${detalle}
      `;
      //agrego el elemento al contenedor
      divReserva.appendChild(clienteParrafo);
      divReserva.appendChild(telefonoParrafo);
      divReserva.appendChild(personasParrafo);
      divReserva.appendChild(fechaParrafo);
      divReserva.appendChild(horaParrafo);
      divReserva.appendChild(detalleParrafo);

      //agregar la reserva al HTML
      contenedorReservas.appendChild(divReserva);
    });
  }

  //evitar q se dupliquen

  //llamar método antes de hacer la iteración
  limpiarHTML() {
    //mientras sea "true" la condición,se eliminan cada uno de los hijos del contenedorReservas
    while (contenedorReservas.firstChild) {
      contenedorReservas.removeChild(contenedorReservas.firstChild);
    }
  }
}

//instanciar de forma global

const ui = new UsuarioInterfaz();
const administrarReservas = new Reservas();

//Registrar eventos

captarEventos();
function captarEventos() {
  clienteReserva.addEventListener('input', datosReserva);
  telefonoReserva.addEventListener('input', datosReserva);
  personasReserva.addEventListener('input', datosReserva);
  fechaReserva.addEventListener('input', datosReserva);
  horaReserva.addEventListener('input', datosReserva);
  detalleReserva.addEventListener('input', datosReserva);

  formularioReserva.addEventListener('submit', nuevaReserva);
}

//crear el objeto reserva,definir los name de cada input

//Objeto con la información de la reserva.

const reservaObj = {
  cliente: '',
  telefono: '',
  personas: '',
  fecha: '',
  hora: '',
  detalle: '',
};

//Agregar datos al objeto a traves del "name",leer el evento

//Agrega datos al objeto de reserva
function datosReserva(e) {
  // console.log(e.target.value);
  //acceder a las propiedades del objeto / reemplazo value/target x name
  //solo se puede acceder a las propiedades del obj con [ ] usando esta sintaxis.
  reservaObj[e.target.name] = e.target.value;
  console.log(reservaObj);
}

//Validar y agregar una nueva reserva a la clase de Reservas
function nuevaReserva(e) {
  e.preventDefault();
  //Extraer la información del objeto reserva
  const { cliente, telefono, personas, fecha, hora, detalle } = reservaObj;
  //validar
  if (
    (cliente === '' || telefono === '' || personas === '',
    fecha === '' || hora === '' || detalle === '')
  ) {
    ui.imprimirAlerta('Todos los campos son obligatorios ⚠ ', 'error');
    //console.log('probando campos vacíos');
    //return para q no se ejecute la siguiente linea disponible aunque este dentro de un "if"
    return;
  }
  //generar ID único
  reservaObj.id = Date.now;

  //Creando una nueva reserva usando la instancia adm reserv
  //se pasa el objeto y se toma copia,no la referencia completa,para evitar q se pisen con el prox valor
  administrarReservas.agregarReserva({ ...reservaObj });
  //console.log(reservaObj);

  //reiniciar objeto para la validación
  reiniciarObjeto();

  //reiniciar los campos formulario
  formularioReserva.reset();

  //mostrar reserva en HTML
  //crear método mostrarReservas
  //ref administrarReservas,contiene el arreglo con las reservas
  ui.mostarReservas(administrarReservas);
}

//función para reiniciar el objeto
function reiniciarObjeto() {
  reservaObj.cliente = '';
  reservaObj.telefono = '';
  reservaObj.personas = '';
  reservaObj.fecha = '';
  reservaObj.hora = '';
  reservaObj.detalle = '';
}
