const inputIntento = document.getElementById("inputIntento");
const btnAdivinar = document.getElementById("btnAdivinar");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const historial = document.getElementById("historial");
const btnReiniciar = document.getElementById("btnReiniciar");
const tarjeta = document.getElementById("game-card ");


console.log("Elementos encontrados" , inputIntento, tarjeta, mensaje);

function MostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    }
MostrarMensaje("¡Bienvenido al juego!", "#e94560");  

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];

console.log("(Debug) Número Secreto:", numeroSecreto);

function verificarIntento() {
    let valor = Number(inputIntento.value);
    
    if (isNaN(valor) || valor < 1 || valor > 100) {
        MostrarMensaje("Por favor, introduce un número válido entre 1 y 100.", "#ff0000");
        return;
    }}

intentos++;
contador.textContent = "Intentos: " + intentos;

historialIntentos.push(valor);  
historial.textContent = "Historial: " + historialIntentos.join(", ");

if ( valor === numeroSecreto) {
    MostrarMensaje("¡Felicidades! Era el número " + numeroSecreto + ".", "#00ff00");
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = "inline-block";
    tarjeta.style.borderColor = "#1100ff";
    tarjeta.style.boxShadow = "0 0 40px #ff0040";
} else if (valor > numeroSecreto) {
    MostrarMensaje("Demasiado alto. Intenta de nuevo.", "#ffcc00")
} else {
    MostrarMensaje("Demasiado bajo. Intenta de nuevo.", "#00ffbb")
}
InputIntento.value = "";
InputIntento.focus();
}


    BtnAdivinar.addEventListener("click", verificarIntento);