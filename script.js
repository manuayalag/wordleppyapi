let intentos = 6;
let diccionario = ["CREAR", "JUGAR", "MOLDE", "VARIOS", "LOSAS"];
const BUTTON = document.getElementById("guess-button");
const GANASTE = document.getElementById("ganaste");
const ERROR = document.getElementById("error");
let palabra;
let listado = []; //historico de intentos
const API =
  "https://random-word-api.herokuapp.com/word?number=1&length=5&lang=es";

fetch(API)
  .then((response) => response.json())
  .then((response) => {
    console.log("desde API", response);
    palabra = response[0].toUpperCase();
    console.log(palabra);
  })
  .catch((err) => {
    //INSTRUCCIONES PARA OBTENER LA PALABRA DE FORMA ALEATORIA DE LA LISTA QUE YO CREE
    console.log("Ocurrio un error");
    palabra = diccionario[Math.floor(Math.random()*diccionario.length())];
  });

window.addEventListener("load", init);
BUTTON.addEventListener("click", intentar);
function init() {
  console.log("Esto se ejecuta cuando se carga la pagina web");
}
function intentar() {
  const INTENTO = leerIntento();
  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");
  ROW.className = "row";
  console.log(INTENTO);
  console.log(palabra);
  if(INTENTO.includes(undefined) || INTENTO.length != 5){
    console.log("No es palabra");
    ERROR.style.display = "block";
    return 0;
  }
  ERROR.style.display = "none";
  listado.push(INTENTO);

  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    if (INTENTO[i] === palabra[i]) {
      //VERDE
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "green";
    } else if (palabra.includes(INTENTO[i])) {
      //AMARILLO
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "yellow";
    } else {
      //GRIS
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "grey";
    }

    ROW.appendChild(SPAN);
  }
  console.log(intentos);
  GRID.appendChild(ROW);
  intentos--;
  if (intentos == 0) {
    terminar("PERDISTE");
  }
  if (INTENTO == palabra) {
    terminar("GANASTE ツ");
  }
}
function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}
function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  GANASTE.style.display = "block";
  console.log(mensaje);
  if (mensaje == "GANASTE ツ") {
    GANASTE.style.backgroundColor = "green";
  } else {
    GANASTE.style.backgroundColor = "red";
  }
  GANASTE.textContent = mensaje;
  INPUT.disabled = true;
  BUTTON.disabled = true;
  let contenedor = document.getElementById("guesses");
  console.log("Historico de INTENTOS: ", listado);
}
