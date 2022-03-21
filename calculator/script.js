'use strict'

const display = document.getElementById('display')
const numbers = document.querySelectorAll('[id*=key]')
const operators = document.querySelectorAll('[id*=operator]')

let newNumber = true
let operator
let previousNumber

/* Checa se o operador já foi selecionado */
const pendingOperation = () => operator != undefined

/* Realiza o cálculo */
const calculate = () => {
    if (pendingOperation()) {
        const currentNumber = parseFloat(display.textContent.replace(',', '.'))
        newNumber = true
        const result = eval(`${previousNumber}${operator}${currentNumber}`)
        updateDisplay(result)
    }
}

/* Atualiza o display */
const updateDisplay = (text) => {
    if (newNumber) {
        display.textContent = text.toLocaleString('pt-BR')
        newNumber = false
    } else {
        display.textContent += text.toLocaleString('pt-BR')
    }
}

/* Adiciona o número clicado no display */
const insertNumber = (event) => updateDisplay(event.target.textContent)
numbers.forEach(number => number.addEventListener('click', insertNumber))

/* Seleciona o operador matemático */
const selectOperator = (event) => {
    if (!newNumber) {
        calculate()
        newNumber = true
        operator = event.target.textContent
        previousNumber = parseFloat(display.textContent.replace(',', '.'))
    }
}
operators.forEach(operator => operator.addEventListener('click', selectOperator))

/* Ativa o botão de 'igual a' */
const activeEqual = () => {
    calculate()
    operator = undefined
}
document.getElementById('equal').addEventListener('click', activeEqual)

/* Limpa o display */
const cleanDisplay = () => display.textContent = ''
document.getElementById('cleanDisplay').addEventListener('click', cleanDisplay)

/* Limpa o cálculo */
const cleanCalculation = () => {
    cleanDisplay()
    operator = undefined
    newNumber = true
    previousNumber = undefined
}
document.getElementById('cleanCalculation').addEventListener('click', cleanCalculation)

/* Remove número da esquerda para a direita */
const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById('backspace').addEventListener('click', removeLastNumber)

/* Inverte de + para - e vice-versa */
const invertSignal = () => {
    newNumber = true
    updateDisplay(display.textContent * -1)
}
document.getElementById('invert').addEventListener('click', invertSignal)

/* Sinal decimal */
const existDecimal = () => display.textContent.indexOf(',') != -1
const existValue = () => display.textContent.length > 0
const insertDecimal = () => {
    if (!existDecimal()) {
        if (existValue()) {
            updateDisplay(',')
        } else {
            updateDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal)

/* Mapeamento do teclado */
const keyboardMap = {
    '0'         : 'keyZero',
    '1'         : 'keyOne',
    '2'         : 'keyTwo',
    '3'         : 'keyThree',
    '4'         : 'keyFour',
    '5'         : 'keyFive',
    '6'         : 'keySix',
    '7'         : 'keySeven',
    '8'         : 'keyEight',
    '9'         : 'keyNine',
    '/'         : 'operatorDivide',
    '*'         : 'operatorMultiply',
    '-'         : 'operatorSubtract',
    '+'         : 'operatorAdd',
    '='         : 'equal',
    'Enter'     : 'equal',
    'Backspace' : 'backspace',
    'c'         : 'cleanDisplay',
    'Escape'    : 'cleanCalculation',
    ','         : 'decimal'
}

/* Desconsidera teclas pressionadas que não estejam mapeadas */
const mapKeyboard = (event) => {
    const key = event.key
    const allowedKey = () => Object.keys(keyboardMap).indexOf(key) != -1 // Verifica se uma das chaves do objeto keyboardMap tem a tecla pressionada
    if (allowedKey()) document.getElementById(keyboardMap[key]).click()
}
document.addEventListener('keydown', mapKeyboard)