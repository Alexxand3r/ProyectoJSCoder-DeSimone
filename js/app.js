'use strict';

// DARK MODE

const darkMode = document.getElementById('darkMode');

function cambiarModo() {
  if (!body.classList.contains('dark')) {
    darkMode.innerText = 'Dark';
    darkMode.classList.remove('btn-secondary');
    darkMode.classList.add('btn-light');
  } else {
    darkMode.innerText = 'Light';
    darkMode.classList.remove('btn-light');
    darkMode.classList.add('btn-secondary');
  }
  body.classList.toggle('dark');
  document.getElementsByClassName('table')[0].classList.toggle('dark');
}

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

// AGREGAR NOTAS

//variables
const formularioNotas = document.querySelector('#formulario-notas');
const listaNotas = document.querySelector('#lista-notas');

let notas = [];

//eventos
escucharEvento();
function escucharEvento() {
  formularioNotas.addEventListener('submit', agregarNota);
}

//Funciones

function agregarNota(e) {
  e.preventDefault();
  // console.log('probando');

  //textarea donde el usuario guarda la mesa.
  const nota = document.querySelector('#notas').value;
  //validación
  if (nota === '') {
    console.log('probando vació');
    mostrarError('No ingresaste contenido! ⚠');
    return; //evita q se ejecuten mas linea de código
  }
  //console.log('probando');
  //asignar un id con (Date.now) no hay base de datos aun..
  const notaObj = {
    id: Date.now(),
    nota,
  };

  //añadir al arreglo notas [ ]
  notas = [...notas, notaObj];
  console.log(notas);
  //crear HTML
  crearHTML();
  //reiniciar el formulario
  formularioNotas.reset();
}

//mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  //insertar en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);
  //elimina el mensaje después de 2.5seg
  setTimeout(() => {
    mensajeError.remove();
  }, 2500);
}

//Crear HTML
function crearHTML() {
  limpiarHTML();

  if (notas.length > 0) {
    notas.forEach(nota => {
      //Crear HTML
      const li = document.createElement('li');
      //Añadir texto
      li.innerText = nota.nota;
      //insertarlo en el html
      listaNotas.appendChild(li);
    });
  }
}

//limpiar el HTML
function limpiarHTML() {
  while (listaNotas.firstChild) {
    listaNotas.removeChild(listaNotas.firstChild);
  }
}
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/* 

//funcionalidades iniciales/requerimientos iniciales

validación de campos ventana modal

Menu:  AGREGAR/MOSTRAR/ELIMINAR  

Resumen de consumo  MOSTRAR DATOS MODAL(Mesa/hora) / CONSUMO / ELIMINAR

Propina:  CALCULAR  5% 10% 25%

//mostrar SubTotal /  Propina  / Total a Pagar

herramientas extras:

//botón dark mode
//calculadora
//conversor de divisas - Dólar/Reales/pesos chilenos/bitcoin(API?)
//recetas?(API)

simulaciones:

//Envió y validación de Email?


Tareas:

*crear una api o bd falsa para testeo y consulta/json-server
*construir modal con javascript
---------------------------------------------------------------------------------------------
*Cargar imágenes // ordenar archivos
*maquetado
*interfaz visual UX / Ui 
*responsive / Mobil first
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
