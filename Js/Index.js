// # Inicialicacion de Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 0;
let tiempoRegresivo = null;

// # Audio
let clickAudio = new Audio("/Audio/click.wav");
let winAudio = new Audio("/Audio/win.wav");
let loseAudio = new Audio("/Audio/lose.wav");
let rightAudio = new Audio("/Audio/right.wav");
let wrongAudio = new Audio("/Audio/wrong.wav");

// # HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// # Generacion de Numeros Aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});

// console.log(numeros);

// # Funciones
function contarTiempo() {
  // * Temporiazador
  tiempoRegresivo = setInterval(() => {
    timer--;
    timerInicial++;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
      loseAudio.play();
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="/Img/${numeros[i]}.png">`;
    tarjetaBloqueada.disabled = true;
  }
}

//$ Funcion Principal
function destapar(id) {
  // * Temporiazador
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  // console.log(tarjetasDestapadas);

  //* Primera Tarjeta
  if (tarjetasDestapadas == 1) {
    // $ Mostrar Numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="/Img/${primerResultado}.png">`;
    clickAudio.play();

    // $ Dehabilitar Primera Tarjeta
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //* Segunda Tarjeta
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="/Img/${segundoResultado}.png">`;

    // $ Dehabilitar Segunda Tarjeta
    tarjeta2.disabled = true;

    // * Incrementar Movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      //* Encerrar contador tarjetas destapadas
      tarjetasDestapadas = 0;
      rightAudio.play();

      //* Aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;

      if (aciertos == 8) {
        clearInterval(tiempoRegresivo);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
        mostrarTiempo.innerHTML = `Fantatico 🎉 solo demoraste ${timerInicial} `;
        mostrarAciertos.innerHTML = `Movimiento: ${movimientos} 👌😎 `;
        winAudio.play();
        setTimeout(() => {
          location.reload();
        }, 5000);
      }
    } else {
      //* Volver a Tapar
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
      wrongAudio.play();
    }
  }
}
