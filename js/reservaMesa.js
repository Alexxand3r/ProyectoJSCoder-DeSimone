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
    //crear el DIV
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
}

//instaciar de forma global

const ui = new UsuarioInterfaz();
const administrarReservas = new Reservas();

//registrar eventos

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

//objeto con la información de la reserva.

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
    ui.imprimirAlerta('Todos los campos son obligatorios ', 'error');
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
}

//funcion para reiniciar el objeto
function reiniciarObjeto() {
  reservaObj.cliente = '';
  reservaObj.telefono = '';
  reservaObj.personas = '';
  reservaObj.fecha = '';
  reservaObj.hora = '';
  reservaObj.detalle = '';
}
