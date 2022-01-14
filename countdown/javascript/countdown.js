export default class Countdown {
    constructor(futureDate) {
        this.futureDate = futureDate;
    }

    get _dataAtual() {
        return new Date();
    }

    get _dataFutura() {
        return new Date(this.futureDate)
    }

    get _diferencaTimestamp() {
        return this._dataFutura.getTime() - this._dataAtual.getTime()
    }

    get dias() {
        return Math.floor(this._diferencaTimestamp / (24 * 60 * 60 * 1000))
    }

    get horas() {
        return Math.floor(this._diferencaTimestamp / (60 * 60 * 1000))
    }

    get minutos() {
        return Math.floor(this._diferencaTimestamp / (60 * 1000))
    }

    get segundos() {
        return Math.floor(this._diferencaTimestamp / 1000)
    }

    get total() {
        const dias = this.dias < 10 ? "0" + this.dias : this.dias
        const horas = this.horas % 24 < 10 ? "0" + (this.horas % 24) : this.horas % 24
        const minutos = this.minutos % 60 < 10 ? "0" + (this.minutos % 60) : this.minutos % 60
        const segundos = this.segundos % 60 < 10 ? "0" + (this.segundos % 60) : this.segundos % 60

        return [dias, horas, minutos, segundos]
    }

}

// Math.floor arredonda para baixo