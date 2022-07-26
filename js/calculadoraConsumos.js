'use strict';

let cliente = {
  mesa: '',
  hora: '',
  pedido: [],
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
}
