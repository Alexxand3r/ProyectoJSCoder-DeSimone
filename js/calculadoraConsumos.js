'use strict';

//json-server --watch db.json --port 4000

let cliente = {
  mesa: '',
  hora: '',
  pedido: [],
};

const categorias = {
  1: 'Comida',
  2: 'Bebida',
  3: 'Postre',
};

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente() {
  //console.log('probando la función');
  const mesa = document.querySelector('#mesa').value;
  const hora = document.querySelector('#hora').value;

  //validación campos vacíos
  const camposVacios = [mesa, hora].some(campo => campo === '');

  if (camposVacios) {
    // console.log('hay campos vacíos');
    //crear alerta
    //evitar q se repita
    //borrarla después de 2.5seg
    //comprobar si existe alerta
    const existeAlerta = document.querySelector('.invalid-feedback');

    if (!existeAlerta) {
      const alerta = document.createElement('DIV');
      alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
      alerta.textContent = 'Completar todos los Campos';
      document.querySelector('.modal-body form').appendChild(alerta);

      setTimeout(() => {
        alerta.remove();
      }, 2500);
    }

    return;
  }

  //console.log('todos los campos llenos');

  //Asignar los datos del formulario al cliente
  //mantener el arreglo del pedido
  //spread "cliente" primero,para no sobrescribir los datos con el objeto vació
  cliente = { ...cliente, mesa, hora };

  //console.log(cliente);

  //Ocultar Modal pasada la validación

  //obtener formulario//obtener instancia de bootstrap
  const modalFormulario = document.querySelector('#formulario');
  //función modal:getInstance obtiene el modal actual//instancia del formulario
  const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
  //método Bootstrap para ocultar
  modalBootstrap.hide();

  //Mostrar  Menu/Secciones
  mostrarSecciones();
  //mostrar Menu de API de JSON-Server
  obtenerMenu();
}

//FUNCIONES

function mostrarSecciones() {
  //selecciono las q tienen la clase de bootstrap "d-none"
  const seccionesOcultas = document.querySelectorAll('.d-none');
  //devuelve arreglo con los elementos,itero y les remuevo la clase
  seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerMenu() {
  const url = 'http://localhost:4000/platos';

  fetch(url)
    // .then(respuesta => console.log(respuesta))
    .then(respuesta => respuesta.json())
    //devuelve como objeto ".json"
    //.then(resultado => console.log(resultado))
    .then(resultado => mostrarMenu(resultado))

    .catch(error => console.log(error));
}

function mostrarMenu(menu) {
  //console.log(menu);
  const contenido = document.querySelector('#menu .contenido');

  //acceder a cada uno de los resultados q se obtienen con fetch
  menu.forEach(plato => {
    //console.log(plato);
    //SCRIPTING

    const row = document.createElement('DIV');
    row.classList.add('row', 'py-3', 'border-top');

    const nombre = document.createElement('DIV');
    nombre.classList.add('col-md-4');
    nombre.textContent = plato.nombre;

    const precio = document.createElement('DIV');
    precio.classList.add('col-md-3', 'fw-bold');
    precio.textContent = `$${plato.precio}`;
    // console.log(precio);

    const categoria = document.createElement('DIV');
    categoria.classList.add('col-md-3');
    categoria.textContent = categorias[plato.categoria];

    const inputCantidad = document.createElement('INPUT');
    inputCantidad.type = 'number';
    //inicia en 0
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    //asignar id como un atributo
    inputCantidad.id = `producto-${plato.id}`;
    //clase para inputs de bootstrap
    inputCantidad.classList.add('form-control');
    //console.log(inputCantidad);

    //Función para detectar la cantidad y el platillo q se esta agregando
    //Asociar un evento que mantenga como referencia el objeto
    //onchange,no se puede usar eventListener en un elemento q fue creado después
    inputCantidad.onchange = function () {
      //se usa una función lineal para que no se llame agregarPlato antes de que suceda el evento

      //devuelve string/convertir a entero
      const cantidad = parseInt(inputCantidad.value);
      console.log(cantidad);

      //spread con el objeto de la API + la cantidad
      agregarPlato({ ...plato, cantidad });
    };

    const agregarInput = document.createElement('DIV');
    agregarInput.classList.add('col-md-2');
    agregarInput.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregarInput);

    contenido.appendChild(row);
  });
}

function agregarPlato(producto) {
  //console.log('probando agregarPlato', producto);
  //Extraer el pedido actual/mantener  la referencia del arreglo
  let { pedido } = cliente;

  //Revisar q la cantidad sea mayor a 0
  if (producto.cantidad > 0) {
    //revisar si ya existe un elemento en el arreglo y solo actualizar cantidad
    //console.log(pedido.some(articulo => articulo.id === producto.id));
    if (pedido.some(articulo => articulo.id === producto.id)) {
      //El articulo ya existe /Actualizar cantidad
      //"map" iterar y devuelve nuevo arreglo sin modificar el original
      const pedidoActualizado = pedido.map(articulo => {
        if (articulo.id === producto.id) {
          articulo.cantidad = producto.cantidad;
        }
        //se retorna el articulo para q lo asigne al arreglo y fuera de la condición para no perder la referencia en la actualización
        return articulo;
      });
      //Se asigna el nuevo arreglo a cliente.pedido
      cliente.pedido = [...pedidoActualizado];
    } else {
      //Agrega copia del pedido q ya existe + el producto
      //El articulo no existe se agrega al arreglo
      cliente.pedido = [...pedido, producto];
    }
    //console.log('es mayor a 0');
  } else {
    //console.log('no es mayor a 0');
    //Eliminar elementos cuando es 0
    const resultado = pedido.filter(articulo => articulo.id !== producto.id);
    //retorna los q sean diferentes al producto q se elimina /reescribe el arreglo
    cliente.pedido = [...resultado];
  }
  // console.log(cliente.pedido);

  //Mostrar resumen "Pedido"
  //Evitar q se multiple la información q se muestra
  //Limpiar el Contenido previo
  limpiarContenidoPrevio();

  if (cliente.pedido.length) {
    //mostrar resumen
    actualizarResumen();
  } else {
    //limpia y muestra el msj de nuevo
    msjPedidoVacio();
  }
}

function actualizarResumen() {
  // console.log('probando Actualizar');
  //el  #resumen se coloca primero para seleccionar el ".contenido" del resumen
  const contenido = document.querySelector('#resumen .contenido');

  const resumen = document.createElement('DIV');
  resumen.classList.add(
    'col-md-6',
    'card',
    'py-3',
    'px-3',
    'shadow',
    'border',
    'border-3',
    'border-success',
    'contenedor-reservas'
  );

  //Imprimir Información de la mesa

  //numero de mesa
  const mesa = document.createElement('P');
  mesa.textContent = 'Mesa: ';
  mesa.classList.add('fw-bold');

  const mesaSpan = document.createElement('SPAN');
  mesaSpan.textContent = cliente.mesa;
  mesaSpan.classList.add('fw-normal');

  const hora = document.createElement('P');
  hora.textContent = 'Hora: ';
  hora.classList.add('fw-bold');

  const horaSpan = document.createElement('SPAN');
  horaSpan.textContent = cliente.hora;
  horaSpan.classList.add('fw-normal');

  //agrega a los elementos padre
  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  //Titulo de la seccion
  const heading = document.createElement('H3');
  heading.textContent = 'Platos Consumidos';
  heading.classList.add('my-4', 'text-center', 'bg-success', 'rounded-pill');

  //Iterar sobre el arreglo de pedidos
  const grupo = document.createElement('UL');
  grupo.classList.add('list-group');

  const { pedido } = cliente;
  pedido.forEach(articulo => {
    //console.log('probando articulo', articulo);
    const { nombre, cantidad, precio, id } = articulo;

    const lista = document.createElement('LI');
    lista.classList.add('list-group-item');

    //nombre del elemento
    const nombreElemento = document.createElement('H4');
    nombreElemento.classList.add('my-4');
    nombreElemento.textContent = nombre;

    //cantidad del producto
    const cantidadElemento = document.createElement('P');
    cantidadElemento.classList.add('fw-bold');
    cantidadElemento.textContent = 'Cantidad: ';

    const cantidadValor = document.createElement('SPAN');
    cantidadValor.classList.add('fw-normal');
    cantidadValor.textContent = cantidad;

    //Precio del producto
    const precioElemento = document.createElement('P');
    precioElemento.classList.add('fw-bold');
    precioElemento.textContent = 'Precio: ';

    const precioValor = document.createElement('SPAN');
    precioValor.classList.add('fw-normal');
    precioValor.textContent = `$${precio}`;

    //Subtotal del articulo
    const subtotalElemento = document.createElement('P');
    subtotalElemento.classList.add('fw-bold');
    subtotalElemento.textContent = 'Subtotal: ';

    const subtotalValor = document.createElement('SPAN');
    subtotalValor.classList.add('fw-normal');
    //subtotalValor.textContent =precio * cantidad;
    subtotalValor.textContent = calcularSubtotal(precio, cantidad);

    //Boton para Eliminar
    const btnEliminar = document.createElement('BUTTON');
    btnEliminar.classList.add('btn', 'btn-danger', 'rounded-pill');
    btnEliminar.textContent = 'Eliminar';

    //función para eliminar del pedido
    //se ubica en una función lineal/anónima para q no ejecute el código inmediatamente
    btnEliminar.onclick = function () {
      eliminarProducto(id);
    };

    //Agregar Valores a sus contenedores
    cantidadElemento.appendChild(cantidadValor);
    precioElemento.appendChild(precioValor);
    subtotalElemento.appendChild(subtotalValor);

    //Agregar Elementos al LI

    lista.appendChild(nombreElemento);
    lista.appendChild(cantidadElemento);
    lista.appendChild(precioElemento);
    lista.appendChild(subtotalElemento);
    lista.appendChild(btnEliminar);

    //Agregar lista al grupo principal

    grupo.appendChild(lista);
  });

  resumen.appendChild(heading);
  resumen.appendChild(mesa);
  resumen.appendChild(hora);

  resumen.appendChild(grupo);

  //agregar al contenido
  contenido.appendChild(resumen);

  //Mostrar Formulario de Propinas
  //Crear función formulario propinas
  formularioPropinas();
}

function limpiarContenidoPrevio() {
  //Limpia el HTML y deja la ultima copia,evitando q se repita la información q se imprime de la mesa
  const contenido = document.querySelector('#resumen .contenido');
  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}

//Calcular Subtotal
function calcularSubtotal(precio, cantidad) {
  return `$ ${precio * cantidad}`;
}

//Eliminar Producto
function eliminarProducto(id) {
  // console.log('probando eliminar...', id);
  //extrae la seccion de pedido y aplica el filter
  const { pedido } = cliente;
  const resultado = pedido.filter(articulo => articulo.id !== id);
  cliente.pedido = [...resultado];

  //console.log(cliente.pedido);
  limpiarContenidoPrevio();
  if (cliente.pedido.length) {
    actualizarResumen();
  } else {
    msjPedidoVacio();
  }

  //regresar a 0 el input si se elimino el producto
  const productoEliminado = `#producto-${id}`;
  const inputEliminado = document.querySelector(productoEliminado);
  //genera la instancia del input y le asigna valor 0
  inputEliminado.value = 0;
  //console.log(productoEliminado);
}

//reimprimir el mensaje si se eliminan todos los platos
function msjPedidoVacio() {
  const contenido = document.querySelector('#resumen .contenido');

  const texto = document.createElement('P');
  texto.classList.add('text-center');
  texto.textContent = 'Añadir Productos al Pedido';

  contenido.appendChild(texto);
}

//formulario propinas
function formularioPropinas() {
  // console.log('probando formulario propinas');
  const contenido = document.querySelector('#resumen .contenido');

  const formulario = document.createElement('DIV');
  formulario.classList.add('col-md-6', 'formulario');

  const divFormulario = document.createElement('DIV');
  divFormulario.classList.add(
    'card',
    'py-3',
    'px-3',
    'shadow',
    'border',
    'border-3',
    'border-success',
    'contenedor-reservas'
  );

  const heading = document.createElement('H3');
  heading.classList.add(
    'my-4',
    'text-center',
    'bg-success',
    'rounded-pill',
    'mx-3',
    'p-1'
  );
  heading.textContent = 'Propina';

  //Botones Radio

  //botón Sin propina

  const radio0 = document.createElement('INPUT');
  radio0.type = 'radio';
  //se coloca un name para q solo se pueda seleccionar 1 de los radios.
  radio0.name = 'propina';
  radio0.value = '0';
  radio0.classList.add('form-check-input', 'ms-4', 'me-2', 'my-1');
  radio0.onclick = calcularPropina;

  const radio0Label = document.createElement('LABEL');
  radio0Label.textContent = 'Sin propina';
  radio0Label.classList.add('form-check-label');

  const radio0Div = document.createElement('DIV');
  radio0Div.classList.add('form-check');

  radio0Div.appendChild(radio0);
  radio0Div.appendChild(radio0Label);

  //botón 10%

  const radio10 = document.createElement('INPUT');
  radio10.type = 'radio';
  radio10.name = 'propina';
  radio10.value = '10';
  radio10.classList.add('form-check-input', 'ms-4', 'me-2', 'my-1');
  radio10.onclick = calcularPropina;

  const radio10Label = document.createElement('LABEL');
  radio10Label.textContent = '10%';
  radio10Label.classList.add('form-check-label');

  const radio10Div = document.createElement('DIV');
  radio10Div.classList.add('form-check');

  radio10Div.appendChild(radio10);
  radio10Div.appendChild(radio10Label);

  //botón 15%

  const radio15 = document.createElement('INPUT');
  radio15.type = 'radio';
  radio15.name = 'propina';
  radio15.value = '15';
  radio15.classList.add('form-check-input', 'ms-4', 'me-2', 'my-1');
  radio15.onclick = calcularPropina;

  const radio15Label = document.createElement('LABEL');
  radio15Label.textContent = '15%';
  radio15Label.classList.add('form-check-label');

  const radio15Div = document.createElement('DIV');
  radio15Div.classList.add('form-check');

  radio15Div.appendChild(radio15);
  radio15Div.appendChild(radio15Label);

  //Agrega al DIV principal
  divFormulario.appendChild(heading);
  divFormulario.appendChild(radio0Div);
  divFormulario.appendChild(radio10Div);
  divFormulario.appendChild(radio15Div);

  //Agrega al Formulario
  formulario.appendChild(divFormulario);

  contenido.appendChild(formulario);
}

function calcularPropina() {
  //console.log('probando Calcular');

  //extraer el pedido del cliente
  const { pedido } = cliente;
  let subtotal = 0;

  //Calcular Subtotal a Pagar
  //En cada iteración suma con el anterior
  pedido.forEach(articulo => {
    subtotal += articulo.cantidad * articulo.precio;
  });

  //seleccionar el Radio
  // % de propina sobre el pago total
  const propinaSeleccionada = document.querySelector(
    '[name="propina"]:checked'
  ).value;

  //console.log('probando Propina:', propinaSeleccionada);

  //console.log('probando subtotal:', subtotal);

  //Calcular la Propina
  //convertir a entero el string q devuelve "propinaSeleccionada"
  const propina = (subtotal * parseInt(propinaSeleccionada)) / 100;
  //console.log('probando propina:', propina);

  //Calcular el total a pagar
  const totalPagar = subtotal + propina;
  //console.log('probando totalPagar', totalPagar);

  mostrarTotalPagar(subtotal, totalPagar, propina);
}

//Función mostrar total a pagar.

function mostrarTotalPagar(subtotal, totalPagar, propina) {
  //CONTENEDOR
  const divTotalPagar = document.createElement('DIV', 'my-5');
  divTotalPagar.classList.add('total-pagar');

  //SUBTOTAL
  const subtotalParrafo = document.createElement('P');
  subtotalParrafo.classList.add('fs-4', 'fw-bold', 'mt-3');
  subtotalParrafo.textContent = 'Subtotal a Pagar: ';

  const subtotalSpan = document.createElement('SPAN');
  subtotalSpan.classList.add('fw-normal');
  subtotalSpan.textContent = `$${subtotal}`;

  subtotalParrafo.appendChild(subtotalSpan);

  //PROPINA
  const propinaParrafo = document.createElement('P');
  propinaParrafo.classList.add('fs-4', 'fw-bold', 'mt-3');
  propinaParrafo.textContent = 'Propina: ';

  const propinaSpan = document.createElement('SPAN');
  propinaSpan.classList.add('fw-normal');
  propinaSpan.textContent = `$${propina}`;

  propinaParrafo.appendChild(propinaSpan);

  //TOTAL A PAGAR
  const totalPagarParrafo = document.createElement('P');
  totalPagarParrafo.classList.add(
    'fs-3',
    'fw-bold',
    'mt-3',
    'bg-info',
    'rounded-pill',
    'p-1',
    'text-center',
    'herramientasTitulo'
  );
  totalPagarParrafo.textContent = 'Total a Pagar: ';

  const totalPagarSpan = document.createElement('SPAN');
  totalPagarSpan.classList.add('fw-normal', 'letraNegra');
  totalPagarSpan.textContent = `$${totalPagar}`;

  totalPagarParrafo.appendChild(totalPagarSpan);

  //Evitar q se dupliquen las cuentas si se cambia la propina
  //Eliminar resultado anterior
  const totalPagarDiv = document.querySelector('.total-pagar');
  if (totalPagarDiv) {
    totalPagarDiv.remove();
  }

  divTotalPagar.appendChild(subtotalParrafo);
  divTotalPagar.appendChild(propinaParrafo);
  divTotalPagar.appendChild(totalPagarParrafo);

  //seleccionar el div de propinas
  const formulario = document.querySelector('.formulario > div');
  formulario.appendChild(divTotalPagar);
}
