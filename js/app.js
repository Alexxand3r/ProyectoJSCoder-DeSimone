'use strict';

//variables

let cliente = {
  mesa: ' ',
  hora: ' ',
  pedido: [],
};

// seleccionar el documento   ⚠
const btnGuardarCliente = '#guardar-cliente';
// crear el evento "click"  ⚠
//--------------------------------------------------------------------------------------------

//FUNCIONES

// cargar mesa / Validación
// guardar cliente

function guardarCliente() {
  //seleccionar documento ⚠
  const mesa = '#mesa';
  const hora = '#hora';
  //console.log('probando función');
  //revisar campos vacíos
  const camposVacios = [mesa, hora].some(campo => campo === ' ');

  if (camposVacios) {
    // crear alerta  ⚠
    console.log(' falta completar campos');
  } else {
    console.log('campos completados');
  }

  //ASIGNAR LOS DATOS  DEL FORM A CLIENTE
  //spread operator "cliente" para mantener el arreglo pedidos [ ] al ingresar la mesa
  cliente = { ...cliente, mesa, hora };

  console.log(cliente);

  //Ocultar Modal
}
