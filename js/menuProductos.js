'use strict';

const menu = [
  {
    id: 1,
    nombre: 'Pizza Muzzarella',
    categoria: 'comidas',
    precio: 900,
    img: 'img/pizza.svg',
    desc: `Pizza con salsa de tomate y queso mozzarella //10 porciones`,
  },
  {
    id: 2,
    nombre: 'Hamburguesa',
    categoria: 'comidas',
    precio: 890,
    img: 'img/burguer.svg',
    desc: ` Sandwich de hamburguesa con lechuga y tomate// Condimentos aparte`,
  },
  {
    id: 3,
    nombre: 'Hot Dogs',
    categoria: 'comidas',
    precio: 400,
    img: 'img/pancho.svg',
    desc: `Sandwich de salchicha y condimentos a elección`,
  },
  {
    id: 4,
    nombre: 'Papas Fritas',
    categoria: 'comidas',
    precio: 950,
    img: 'img/papasfritas.svg',
    desc: `Porcion Mediana de Papas Fritas `,
  },
  {
    id: 5,
    nombre: 'Gaseosa 500ml',
    categoria: 'bebidas',
    precio: 250,
    img: 'img/gaseosa.svg',
    desc: `Gaseosa 1/2 litro individual`,
  },
  {
    id: 6,
    nombre: 'Cerveza',
    categoria: 'bebidas',
    precio: 500,
    img: 'img/cerveza.svg',
    desc: `Botella de Cerveza 1 Litro`,
  },
  {
    id: 7,
    nombre: 'Agua Saborizada',
    categoria: 'bebidas',
    precio: 410,
    img: 'img/saborizada.svg',
    desc: `Agua mineral saborizada 1 Litro `,
  },
  {
    id: 8,
    nombre: 'Cafe Doble',
    categoria: 'bebidas',
    precio: 190,
    img: 'img/cafe.svg',
    desc: `Cafe taza en Grande + vaso de soda`,
  },

  {
    id: 9,
    nombre: 'Porción Torta',
    categoria: 'postres',
    precio: 450,
    img: 'img/selvanegra.svg',
    desc: `Porción de Torta individual`,
  },
  {
    id: 10,
    nombre: 'Helado 1/4 kg',
    categoria: 'postres',
    precio: 350,
    img: 'img/helado.svg',
    desc: `1/4 helado // 2 Sabores a elección`,
  },
  {
    id: 11,
    nombre: 'Frutillas a la Crema',
    categoria: 'postres',
    precio: 700,
    img: 'img/frutilla.svg',
    desc: `Porción individual de Frutillas con crema`,
  },
  {
    id: 12,
    nombre: 'Flan',
    categoria: 'postres',
    precio: 450,
    img: 'img/flan.svg',
    desc: `Porción individual de Flan`,
  },
];
// get parent element
const sectionPrincipal = document.querySelector('.seccionPrincipal');
const btnContainer = document.querySelector('.btn-container');
// display all items when page loads
window.addEventListener('DOMContentLoaded', function () {
  diplayMenuItems(menu);
  displayMenuButtons();
});

function diplayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    // console.log(item);

    return `<article class="menuProducto">
          <img src=${item.img} alt=${item.nombre} class="imagenProducto" />
          <div class="infoProducto">
            <header>
              <h4>${item.nombre}</h4>
              <h4 class="precioProducto">$${item.precio}</h4>
            </header>
            <p class="textoProducto">
              ${item.desc}
            </p>
          </div>
        </article>`;
  });
  displayMenu = displayMenu.join('');
  // console.log(displayMenu);

  sectionPrincipal.innerHTML = displayMenu;
}
function displayMenuButtons() {
  const categorias = menu.reduce(
    function (values, item) {
      if (!values.includes(item.categoria)) {
        values.push(item.categoria);
      }
      return values;
    },
    ['todos']
  );
  const categoriaBtns = categorias
    .map(function (categoria) {
      return `<button type="button" class="btnFiltros" data-id=${categoria}>
          ${categoria}
        </button>`;
    })
    .join('');

  btnContainer.innerHTML = categoriaBtns;
  const filterBtns = btnContainer.querySelectorAll('.btnFiltros');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      // console.log(e.currentTarget.dataset);
      const categoria = e.currentTarget.dataset.id;
      const menuCategoria = menu.filter(function (menuItem) {
        if (menuItem.categoria === categoria) {
          return menuItem;
        }
      });
      if (categoria === 'todos') {
        diplayMenuItems(menu);
      } else {
        diplayMenuItems(menuCategoria);
      }
    });
  });
}
