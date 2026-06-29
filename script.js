// Referencias a los elementos del DOM
const inputIntento = document.getElementById("inputIntento");
const btnAdivinar = document.getElementById("btnAdivinar");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const historial = document.getElementById("historial");
const btnReiniciar = document.getElementById("btnReiniciar");
const tarjeta = document.getElementById("game-card");
const imgVictoria = document.getElementById("imgVictoria");

// Variables de estado del juego
let numeroSecreto;
let intentos;
let historialIntentos;
let distanciaAnterior; // Guarda qué tan lejos estabas en el intento previo

function iniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    historialIntentos = [];
    distanciaAnterior = null; 

    // Resetear la interfaz
    inputIntento.value = "";
    inputIntento.disabled = false;
    btnAdivinar.disabled = false;
    btnReiniciar.style.display = "none";
    imgVictoria.style.display = "none";
    tarjeta.classList.remove("victoria-efecto"); // Quita la animación de victoria
    
    contador.textContent = "Intentos: 0";
    historial.textContent = "Historial: -";
    MostrarMensaje("Sistema Iniciado. Esperando input...", "#66fcf1");
    inputIntento.focus();

    console.log("(Debug Hacker) Objetivo bloqueado en:", numeroSecreto);
}

function MostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    mensaje.style.textShadow = `0 0 10px ${color}`; // Añade resplandor al texto
}

function verificarIntento() {
    let valor = Number(inputIntento.value);
    
    // Validación de entrada
    if (isNaN(valor) || valor < 1 || valor > 100) {
        MostrarMensaje("Error: Rango inválido (1-100).", "#ff0000");
        return;
    }

    intentos++;
    contador.textContent = "Intentos: " + intentos;
    historialIntentos.push(valor);  
    historial.textContent = "Historial: " + historialIntentos.join(", ");

    // Calcular la distancia actual entre el intento y el número secreto
    let distanciaActual = Math.abs(numeroSecreto - valor);

    // Condición 1: ¡El usuario adivinó!
    if (valor === numeroSecreto) {
        MostrarMensaje("¡ACCESO CONCEDIDO! Era el " + numeroSecreto, "#00ff00");
        btnAdivinar.disabled = true;
        inputIntento.disabled = true;
        btnReiniciar.style.display = "inline-block";
        
        // Activar efectos visuales
        imgVictoria.style.display = "block";
        tarjeta.classList.add("victoria-efecto"); 
        
    } else {
        // Lógica de pista: Alto/Bajo y Frío/Caliente
        let pista = valor > numeroSecreto ? "Muy alto." : "Muy bajo.";
        let colorNeon = "#ffaa00"; // Color por defecto (naranja/amarillo)

        if (distanciaAnterior !== null) {
            if (distanciaActual < distanciaAnterior) {
                pista += " 🔥 ¡CALIENTE! Te acercas.";
                colorNeon = "#ff007f"; // Rosa caliente
            } else if (distanciaActual > distanciaAnterior) {
                pista += " ❄️ ¡FRÍO! Te alejas.";
                colorNeon = "#00bfff"; // Azul frío
            } else {
                pista += " Estás a la misma distancia.";
            }
        } else {
            // Si es el primer intento, solo le decimos si es alto o bajo
            pista += " Analizando patrón...";
        }

        MostrarMensaje(pista, colorNeon);
    }

    // Actualizamos la distancia anterior para el siguiente turno
    distanciaAnterior = distanciaActual;
    
    inputIntento.value = "";
    inputIntento.focus();
}

// Event Listeners
btnAdivinar.addEventListener("click", verificarIntento);

// Permite usar la tecla "Enter" para jugar más rápido
inputIntento.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        verificarIntento();
    }
});

btnReiniciar.addEventListener("click", iniciarJuego);

// Iniciar el juego la primera vez que carga la página
iniciarJuego();