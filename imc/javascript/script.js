function calcular () {
    let altura = Number(document.getElementById('num-altura').value)
    let peso = Number(document.getElementById('num-peso').value)
    let resultado = document.querySelector('div#resultado')
    let imc = (peso / (altura * altura)).toFixed(1)
    let classificacao

    switch (true) {
        case (imc < 18.5):
            classificacao = "abaixo do peso"
            break
        case (imc <= 24.9):
            classificacao = "peso ideal"
            break
        case (imc <= 29.9):
            classificacao = "sobrepeso"
            break
        case (imc <= 39.9):
            classificacao = "obesidade"
            break
        case (imc >= 40):
            classificacao = "obesidade grave"
            break
        default:
            break
    }

    resultado.innerHTML = `Seu IMC é de ${imc} -> <em>${classificacao}</em>`

}