import Countdown from "./countdown.js";

const tempoParaAnoNovo = new Countdown("1 January 2023 00:00:00 GMT-0300");
const tempos = document.querySelectorAll("[data-time]")

function mostrarTempo() {
    tempos.forEach((tempo, index) => {
        tempo.innerHTML = tempoParaAnoNovo.total[index]
    })
}

mostrarTempo()
setInterval(mostrarTempo, 1000)