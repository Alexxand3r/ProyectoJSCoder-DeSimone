'use strict';

const menu = [
  { nombre: 'Pizza Muzzarella x6', precio: 900 },
  { nombre: 'Pizza  Muzzarella x10', precio: 1550 },
  { nombre: 'Pizza Especial x6', precio: 1370 },
  { nombre: 'Pizza Especial x10', precio: 2100 },
  { nombre: 'Papas Fritas', precio: 950 },
  { nombre: 'Gaseosa 500 ml', precio: 250 },
  { nombre: 'Cerveza', precio: 500 },
];

for (let i = 0; i < menu.length; i++) {
  console.log(`${menu[i].nombre} - Precio: ${menu[i].precio}`);
}
for (let producto of menu) {
  console.log(producto);
  console.log(producto.precio);
  console.log(producto.nombre);
}

menu.forEach(function (producto) {
  console.log(`${producto.nombre} - Precio: ${producto.precio}`);
});

const arr1 = menu.map(function (producto) {
  console.log(`${producto.nombre} - Precio: ${producto.precio}`);
  return `${producto.nombre} - Precio: ${producto.precio}`;
});
console.log(arr1);

//--------------------------------------------------------------------------------------------

let total = 0;
function agregarPlato(precio) {
  return (total += precio);
}
//propina del 10%
function calcularPropina(total) {
  return total * 0.1;
}
function totalConPropina(total) {
  return total * 1.1;
}
console.table(menu);

total = agregarPlato(300);
total = agregarPlato(400);
total = agregarPlato(500);

const totalPagar = totalConPropina(total);
const propina = calcularPropina(total);
console.log(`El consumo total fue :  💲${total}`);
console.log(`propina  10 %  💲${propina}`);
console.log(`El total a pagar es de: 💲${totalPagar}`);
//--------------------------------------------------------------------------------------------
console.log(
  '----------------------------------------------------------------------------'
);

//--------------------------------------------------------------------------------------------
let total2 = 0;
const mesa = [
  { nombre: 'Pizza Muzzarella x6', precio: 900 },
  { nombre: 'Papas Fritas', precio: 950 },
  { nombre: 'Cerveza', precio: 500 },
];

const existe = mesa.some(producto => producto.nombre === 'Papas Fritas');
console.log(existe);

if (existe === true) {
  console.log('Sale Con Fritas🍟😝');
}

//se pide una Gaseosa 500 ml'
const productoAgrega = { nombre: 'Gaseosa 500 ml', precio: 250 };
const mesa2 = [...mesa, productoAgrega];
console.log(mesa2);

//le descontamos la cerveza 😝
let sinCerveza;
sinCerveza = mesa2.find(producto => producto.nombre === 'Cerveza');
console.log(sinCerveza);
sinCerveza = mesa2.filter(producto => producto.nombre !== 'Cerveza');
console.table(sinCerveza);

mesa2.forEach(producto => (total2 += producto.precio));
console.log(`El subtotal a Pagar :  💲${total2}`);

//total guarda el valor acumulado por lo q no usa += e inicia en 0
let total3 = sinCerveza.reduce((total, producto) => total + producto.precio, 0);
console.log(`total c/descuento :  💲${total3}`);

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

/* 

//funcionalidades iniciales/requerimientos iniciales

validación de campos ventana modal
Menu:  AGREGAR/MOSTRAR/ELIMINAR  

Resumen de consumo  MOSTRAR DATOS MODAL(Mesa/hora) / CONSUMO / ELIMINAR

Propina:  CALCULAR  5% 10% 25%

//mostrar SubTotal /  Propina  / Total a Pagar

herramientas:
//calculadora
//conversor de divisas - Dólar/Reales/pesos chilenos/bitcoin
//recetas?
*/

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//crear una api o bd falsa para testeo y consulta.

//variables
/*

let cliente = {
  mesa: ' ',
  hora: ' ',
  pedido: [],
};


//MODAL  CARGAR MESA

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
  //spread operator  "cliente" 1° | para mantener el arreglo pedidos [ ] al ingresar la mesa y la hora
  cliente = { ...cliente, mesa, hora };

  console.log(cliente);

  //Ocultar Modal

  //obtener menu de una bd o API.
  obtenerMenu();

  //Mostrar las secciones
  function mostrarSecciones() {
    //remover d-none cuando la mesa pasa la validación

    //const seccionesOcultas = ('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
  }
}
*/
