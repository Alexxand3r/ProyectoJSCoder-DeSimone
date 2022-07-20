'use strict';

//variables de cada campo
const clienteReserva = document.querySelector('#clienteReserva');
const telefonoReserva = document.querySelector('#telefonoReserva');
const personasReserva = document.querySelector('#personasReserva');
const fechaReserva = document.querySelector('#fechaReserva');
const horaReserva = document.querySelector('#horaReserva');
const detalleReserva = document.querySelector('#detalleReserva');

const formularioReserva = document.querySelector('#nueva-reserva');
const contenedorReservas = document.querySelector('#reservas');

captarEventos();
function captarEventos() {
  clienteReserva.addEventListener('input', datosReserva);
  telefonoReserva.addEventListener('input', datosReserva);
  personasReserva.addEventListener('input', datosReserva);
  fechaReserva.addEventListener('input', datosReserva);
  horaReserva.addEventListener('input', datosReserva);
  detalleReserva.addEventListener('input', datosReserva);
}

//crear el objeto reserva,definir los name de cada input
const reservaObj = {
  cliente: '',
  telefono: '',
  personas: '',
  fecha: '',
  hora: '',
  detalle: '',
};

//Agrega datos al objeto a traves del "name"
function datosReserva(e) {
  // console.log(e.target.value);
  //acceder a las propiedades del objeto
  reservaObj[e.target.name] = e.target.value;
  console.log(reservaObj);
}
