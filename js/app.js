'use strict';

//Calculadora

//variables

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
