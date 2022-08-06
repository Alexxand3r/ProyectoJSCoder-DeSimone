'use strict';

/*
----------------------------------------------------------------------------------------------
HOJA DE PRUEBAS
----------------------------------------------------------------------------------------------

*/

const containerClima = document.querySelector('.containerClima');
const resultadoClima = document.querySelector('#resultadoClima');
const formularioClima = document.querySelector('#formularioClima');

window.addEventListener('load', () => {
  formularioClima.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
  e.preventDefault();
  //console.log('Probando función buscarClima');

  //validar
  const climaCiudad = document.querySelector('#climaCiudad').value;
  const climaPais = document.querySelector('#climaPais').value;

  if (climaCiudad === '' || climaPais === '') {
    //si hay error
    mostrarError();
    //return para detener la ejecución del código
    return;
  }
  consultarClimaAPI(climaCiudad, climaPais);
}

function mostrarError() {
  Swal.fire({
    icon: 'error',
    title: 'Hay Campos Vacios!',
    text: 'Ingresa todos los Campos ⚠',
    confirmButtonColor: '#3085d6',
  });
}
function mostrarError404() {
  Swal.fire({
    icon: 'error',
    title: 'Error en la Búsqueda',
    text: 'Verifica los Datos de Ingreso ⚠',
    confirmButtonColor: '#3085d6',
  });
}
//console.log(climaCiudad);
//console.log(climaPais);

function consultarClimaAPI(climaCiudad, climaPais) {
  const appId = '31c5f1ad3590a392ffdf789e1f758f84';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${climaCiudad},${climaPais}&appid=${appId}`;

  //Spinner de carga
  mostrarSpinner();

  //console.log(url);
  fetch(url)
    .then(respuesta => respuesta.json())
    // .then(datos => console.log(datos));
    //validar resultados
    .then(datos => {
      console.log(datos);
      //limpiar HTML previo
      limpiarResultadoClima();
      if (datos.cod === '404') {
        mostrarError404();
        return;
      }

      //Mostrar Repuesta HTML
      mostrarClima(datos);
    });
}
function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const nombreCiudad = document.createElement('p');
  nombreCiudad.textContent = `El Clima en ${name}`;
  nombreCiudad.classList.add('fw-bold', 'fs-1', 'text-success');
  // temperatura = (temp - 273.15)
  //tempCentigrados = temp - 273.15;
  const tempCentigrados = kelvinACentigrados(temp);
  const tempMaxCentigrados = kelvinACentigrados(temp_max);
  const tempMinCentigrados = kelvinACentigrados(temp_min);
  // console.log(temp - 273.15);
  const tempActual = document.createElement('p');
  // &#8451; entidad q imprime ° grados centígrados
  tempActual.innerHTML = `Actual : ${tempCentigrados} &#8451;`;
  tempActual.classList.add('fw-bold', 'fs-2');

  const tempMaxActual = document.createElement('p');
  tempMaxActual.innerHTML = `Max : ${tempMaxCentigrados} &#8451;`;
  tempMaxActual.classList.add('fw-bold', 'fs-3', 'text-danger');

  const tempMinActual = document.createElement('p');
  tempMinActual.innerHTML = `Min : ${tempMinCentigrados} &#8451;`;
  tempMinActual.classList.add('fw-bold', 'fs-3', 'text-info');

  const resultadoClimaDiv = document.createElement('div');
  resultadoClimaDiv.classList.add('text-center', 'text-dark');

  resultadoClimaDiv.appendChild(nombreCiudad);
  resultadoClimaDiv.appendChild(tempActual);
  resultadoClimaDiv.appendChild(tempMaxActual);
  resultadoClimaDiv.appendChild(tempMinActual);

  resultadoClima.appendChild(resultadoClimaDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarResultadoClima() {
  while (resultadoClima.firstChild) {
    resultadoClima.removeChild(resultadoClima.firstChild);
  }
}

function mostrarSpinner() {
  limpiarResultadoClima();

  const divSpinner = document.createElement('DIV');
  divSpinner.classList.add('sk-fading-circle');
  divSpinner.innerHTML = `  
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `;
  resultadoClima.appendChild(divSpinner);
}
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
