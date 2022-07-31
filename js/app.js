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
  //usuario agrega una nueva nota
  formularioNotas.addEventListener('submit', agregarNota);

  //documento listo
  document.addEventListener('DOMContentLoaded', () => {
    //null / forEach no itera sobre "null"
    //si la nota no fue creada aun (arreglo),asigno arreglo vació
    notas = JSON.parse(localStorage.getItem('notas')) || [];

    console.log(notas);
    //solo se ejecuta si hay algo en el arreglo
    crearHTML();
  });
}

//Funciones

function agregarNota(e) {
  e.preventDefault();
  // console.log('probando');

  //textarea donde el usuario guarda la mesa.
  const nota = document.querySelector('#notas').value;
  //validación
  if (nota === '') {
    //console.log('probando vació');
    mostrarError();
    return; //evita q se ejecuten mas linea de código
    //solo funciona en un if,mientras se encuentre en una función
  } else {
    mostrarConfirmacion();
  }
  //console.log('probando');
  //asignar un id con (Date.now)
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

//Mostrar mensaje de confirmación

function mostrarConfirmacion() {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'La Nota se Agrego Correctamente',
    showConfirmButton: false,
    timer: 2000,
  });
}

//mostrar mensaje de error NOTA VACÍA
function mostrarError(error) {
  Swal.fire({
    icon: 'error',
    title: 'La Nota esta Vacía!',
    text: 'Inténtalo Nuevamente ⚠',
    confirmButtonColor: '#3085d6',
    //showConfirmButton: false,
    //timer: 2500,
  });
  /*const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  //insertar en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);
  //elimina el mensaje después de 2.5seg
  setTimeout(() => {
    mensajeError.remove();
  }, 2500);*/
}

//Mostrar confirmación al borrar
function confirmarBorrarNota() {
  Swal.fire({
    title: 'Estas Seguro/a?',
    text: 'No podrás Recuperar la Nota',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire('Borrada!', 'La Nota fue Borrada Correctamente.', 'success');
    }
  });
}

//Crear en HTML listado de notas
function crearHTML() {
  limpiarHTML();

  //el código se ejecuta solo cuando haya algo en el arreglo.
  if (notas.length > 0) {
    notas.forEach(nota => {
      //Boton Eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-nota');
      btnEliminar.innerText = 'X';
      //agregar la función para eliminar
      //la función requiere parámetros
      btnEliminar.onclick = () => {
        borrarNota(nota.id);
        confirmarBorrarNota();
      };

      //Crear HTML
      const li = document.createElement('li');
      //Añadir texto
      li.innerText = nota.nota;
      //asignar el botón
      li.appendChild(btnEliminar);
      //insertarlo en el html
      listaNotas.appendChild(li);
    });
  }
  sincronizarStorage();
}

//Agregar las notas al LocalStorage
function sincronizarStorage() {
  localStorage.setItem('notas', JSON.stringify(notas));
}

//limpiar el HTML
function limpiarHTML() {
  while (listaNotas.firstChild) {
    listaNotas.removeChild(listaNotas.firstChild);
  }
}

//Eliminar Nota
function borrarNota(id) {
  //console.log('probando borrar', id);

  //asi trae todas las notas excepto a la q se le dio click
  notas = notas.filter(nota => nota.id !== id);
  // console.log(notas);

  //Se sincroniza con el local Storage
  crearHTML();
}
/*
----------------------------------------------------------------------------------------------
HOJA DE PRUEBAS
----------------------------------------------------------------------------------------------
*/

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/* 

//funcionalidades iniciales/requerimientos iniciales

validación de campos// ventanas modal//Formularios
MOSTRAR MENSAJES A EVENTOS.

Menu:  AGREGAR/MOSTRAR/ELIMINAR  

Resumen de consumo  MOSTRAR DATOS MODAL(Mesa/hora) / CONSUMO / ELIMINAR

Propina:  CALCULAR  5% 10% 15%

//mostrar SubTotal /  Propina  / Total a Pagar

herramientas extras:

//calculadora
//conversor de divisas - Dólar/Reales/pesos chilenos/bitcoin(API?)
//Reservas

//Traductor?

simulaciones:

//login?
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
*Local Storage
*Session Storage
*IndexDB
*JSON
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*/
