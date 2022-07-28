'use strict';

/*
================================= Alexander De Simone =====
================= CALCULADORA😎=========================
    ====================================================
*/
const calculadora = {
  visor: document.getElementById('display'),
  valorVisor: '0',
  operacion: '',
  primerValor: 0,
  segundoValor: 0,
  ultimoValor: 0,
  resultado: 0,
  auxTeclaIgual: false,

  init: function () {
    this.asignarEventosaFuncion();
  },

  asignarEventosaFuncion: function () {
    document.getElementById('cero').addEventListener('click', function () {
      calculadora.ingresoNumero('0');
    });
    document.getElementById('uno').addEventListener('click', function () {
      calculadora.ingresoNumero('1');
    });
    document.getElementById('dos').addEventListener('click', function () {
      calculadora.ingresoNumero('2');
    });
    document.getElementById('tres').addEventListener('click', function () {
      calculadora.ingresoNumero('3');
    });
    document.getElementById('cuatro').addEventListener('click', function () {
      calculadora.ingresoNumero('4');
    });
    document.getElementById('cinco').addEventListener('click', function () {
      calculadora.ingresoNumero('5');
    });
    document.getElementById('seis').addEventListener('click', function () {
      calculadora.ingresoNumero('6');
    });
    document.getElementById('siete').addEventListener('click', function () {
      calculadora.ingresoNumero('7');
    });
    document.getElementById('ocho').addEventListener('click', function () {
      calculadora.ingresoNumero('8');
    });
    document.getElementById('nueve').addEventListener('click', function () {
      calculadora.ingresoNumero('9');
    });
    document
      .getElementById('borrarDisplay')
      .addEventListener('click', function () {
        calculadora.borrarVisor();
      });

    document.getElementById('punto').addEventListener('click', function () {
      calculadora.ingresoDecimal();
    });

    document.getElementById('igual').addEventListener('click', function () {
      calculadora.verResultado();
    });

    document.getElementById('dividido').addEventListener('click', function () {
      calculadora.ingresoOperacion('/');
    });

    document.getElementById('por').addEventListener('click', function () {
      calculadora.ingresoOperacion('*');
    });

    document.getElementById('menos').addEventListener('click', function () {
      calculadora.ingresoOperacion('-');
    });

    document.getElementById('mas').addEventListener('click', function () {
      calculadora.ingresoOperacion('+');
    });

    document
      .getElementById('porcentaje')
      .addEventListener('click', function () {
        calculadora.ingresoOperacion('%');
      });
  },

  borrarVisor: function () {
    this.valorVisor = '0';
    this.operacion = '';
    this.primerValor = 0;
    this.segundoValor = 0;
    this.resultado = 0;
    this.Operación = '';
    this.auxTeclaIgual = false;
    this.ultimoValor = 0;
    this.updateVisor();
  },

  ingresoDecimal: function () {
    if (this.valorVisor.indexOf('.') == -1) {
      if (this.valorVisor == '') {
        this.valorVisor = this.valorVisor + '0.';
      } else {
        this.valorVisor = this.valorVisor + '.';
      }
      this.updateVisor();
    }
  },

  ingresoNumero: function (valor) {
    if (this.valorVisor.length < 8) {
      if (this.valorVisor == '0') {
        this.valorVisor = '';
        this.valorVisor = this.valorVisor + valor;
      } else {
        this.valorVisor = this.valorVisor + valor;
      }
      this.updateVisor();
    }
  },

  ingresoOperacion: function (oper) {
    this.primerValor = parseFloat(this.valorVisor);
    this.valorVisor = '';
    this.operacion = oper;
    this.auxTeclaIgual = false;
    this.updateVisor();
  },

  verResultado: function () {
    if (!this.auxTeclaIgual) {
      this.segundoValor = parseFloat(this.valorVisor);
      this.ultimoValor = this.segundoValor;
      this.realizarOperacion(
        this.primerValor,
        this.segundoValor,
        this.operacion
      );
    } else {
      this.realizarOperacion(
        this.primerValor,
        this.ultimoValor,
        this.operacion
      );
    }

    this.primerValor = this.resultado;
    this.valorVisor = '';

    if (this.resultado.toString().length < 9) {
      this.valorVisor = this.resultado.toString();
    } else {
      this.valorVisor = this.resultado.toString().slice(0, 8) + '...';
    }

    this.auxTeclaIgual = true;
    this.updateVisor();
  },

  realizarOperacion: function (primerValor, segundoValor, operacion) {
    switch (operacion) {
      case '+':
        this.resultado = eval(primerValor + segundoValor);
        break;
      case '-':
        this.resultado = eval(primerValor - segundoValor);
        break;
      case '*':
        this.resultado = eval(primerValor * segundoValor);
        break;
      case '/':
        this.resultado = eval(primerValor / segundoValor);
        break;
      case '%':
        this.resultado = eval((primerValor * segundoValor) / 100);
    }
  },

  updateVisor: function () {
    this.visor.innerHTML = this.valorVisor;
  },
};

calculadora.init();
