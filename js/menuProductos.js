'use strict';

const productosMenu = [
  {
    id: 1,
    nombre: 'Pizza Muzzarella',
    precio: 900,
    categoria: 'comidas',
    img: 'img/menu.svg',
    descripcion: 'Pizza Muzzarella,tomate y aceitunas  //  10 porciones',
  },
  {
    id: 2,
    nombre: 'Pizza  Especial',
    precio: 1550,
    categoria: 'comidas',
    img: 'img/menu.svg',
    descripcion: 'Pizza Muzzarella c/Jamon y morrones  //  10 porciones',
  },
  {
    id: 3,
    nombre: 'Hot Dog',
    precio: 400,
    categoria: 'comidas',
    img: 'img/menu.svg',
    descripcion: 'Sandwich Individual, Salchicha y condimentos a elección',
  },

  {
    id: 4,
    nombre: 'Papas Fritas',
    precio: 950,
    categoria: 'comidas',
    img: 'img/menu.svg',
    descripcion: 'Papas fritas,porción Grande',
  },

  {
    id: 5,
    nombre: 'Gaseosa 500 ml',
    precio: 250,
    categoria: 'bebidas',
    img: 'img/bebidas.svg',
    descripcion: 'Gaseosa individual de 500ml',
  },

  {
    id: 6,
    nombre: 'Cerveza',
    precio: 500,
    categoria: 'bebidas',
    img: 'img/bebidas.svg',
    descripcion: 'Cerveza en Botella 1 litro',
  },
  {
    id: 7,
    nombre: 'Agua Saborizada',
    precio: 410,
    categoria: 'bebidas',
    img: 'img/bebidas.svg',
    descripcion: 'Agua saborizada en Botella 1 litro',
  },
  {
    id: 8,
    nombre: 'Café doble',
    precio: 190,
    categoria: 'bebidas',
    img: 'img/bebidas.svg',
    descripcion: 'Taza de cafe grande',
  },

  {
    id: 9,
    nombre: 'Porción Selva Negra',
    precio: 450,
    categoria: 'postres',
    img: 'img/cubiertos.svg',
    descripcion: 'Porcion individual de torta',
  },

  {
    id: 10,
    nombre: 'Helado 1/4kg',
    precio: 350,
    categoria: 'postres',
    img: 'img/cubiertos.svg',
    descripcion: 'Porcion 1/4kg Helado',
  },

  {
    id: 11,
    nombre: 'Frutillas a la Crema',
    precio: 700,
    categoria: 'postres',
    img: 'img/cubiertos.svg',
    descripcion: 'Porcion individual de frutillas con crema',
  },
  {
    id: 12,
    nombre: 'Flan',
    precio: 450,
    categoria: 'postres',
    img: 'img/cubiertos.svg',
    descripcion: 'Porcion individual de flan',
  },
];

const seccionPrincipal = document.querySelector('.seccionPrincipal');
window.addEventListener('DOMContentLoaded', function () {
  displayMenuProductos(productosMenu);
});

function displayMenuProductos(productosMenu) {
  //  console.log('probando');
  let displayMenu = productosMenu.map(function (producto) {
    //  console.log('probando', producto);

    return ` <article class="menuProducto">
        <img src=${producto.img} alt=${producto.nombre} class="imagenProducto w-100" />
        <div class="infoProducto">
          <header>
            <h4>${producto.nombre}</h4>
            <h4 class="precioProducto">$${producto.precio}</h4>
          </header>
          <p class="textoProducto">
            ${producto.descripcion}
          </p>
        </div>
      </article>`;
  });
  displayMenu = displayMenu.join('');
  seccionPrincipal.innerHTML = displayMenu;

  //console.log(displayMenu);
}
