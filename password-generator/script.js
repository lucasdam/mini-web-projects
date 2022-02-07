let sliderElement = document.querySelector('#slider')
let buttonElement = document.querySelector('#button')
let sizePassword = document.querySelector('#value')
let password = document.querySelector('#password')
let containerPassword = document.querySelector('#container-password')

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%&*'
let newPassword = ''

sizePassword.innerHTML = sliderElement.value

slider.oninput = function () {
    sizePassword.innerHTML = this.value
}

function generatePassword() {
    let pass = ''

    for (let i = 0, n = charset.length; i < sliderElement.value; ++i) {
        pass += charset.charAt(Math.floor(Math.random() * n))
    }

    containerPassword.classList.remove('hide')
    password.innerHTML = pass
    newPassword = pass
}

function copyPassword() {
    navigator.clipboard.writeText(newPassword)
        .then(() => {
            alert('Copied password!')
        })
        .catch(() => {
            alert('Something went wrong... Please, try again!')
        })
}


/* No for, gera um número aleatório (Math.random) que é inteiro (Math.floor) e esse número vai ser a posição da variável charset (charAt). Se for retornado '2', a letra será 'c' */

/* navigator.clipboard.writeText retorna uma function */