'use strict';
const monedaEl_uno = document.getElementById('monedaUno');
const monedaEl_dos = document.getElementById('monedaDos');
const cantidadEl_uno = document.getElementById('cantidadUno');
const cantidadEl_dos = document.getElementById('cantidadDos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');

// Fetch Exchange Rate and Update the DOM
function calculate() {
  const moneda_uno = monedaEl_uno.value;
  const moneda_dos = monedaEl_dos.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_uno}`)
    .then(res => res.json())
    .then(data => {
      const taza = data.rates[moneda_dos];

      cambioEl.innerText = `1 ${moneda_uno} = ${taza} ${moneda_dos}`;

      cantidadEl_dos.value = (cantidadEl_uno.value * taza).toFixed(2);
    });
}

//Event listeners
monedaEl_uno.addEventListener('change', calculate);
cantidadEl_dos.addEventListener('input', calculate);
monedaEl_uno.addEventListener('change', calculate);
cantidadEl_dos.addEventListener('input', calculate);

taza.addEventListener('click', () => {
  const temp = monedaEl_uno.value;
  monedaEl_uno.value = monedaEl_dos.value;
  monedaEl_dos.value = temp;
  calculate();
});

calculate();
