// Select the elements
let toggleBtn
let bigWrapper
let hamburguerMenu

function declare() {
    toggleBtn = document.querySelector('.toggle-btn')
    bigWrapper = document.querySelector('.big-wrapper')
    hamburguerMenu = document.querySelector('.hamburguer-menu')
}

const main = document.querySelector('main')

declare()

let dark = false

function toggleAnimation() {
    // Clone the wrapper
    dark = !dark
    let clone = bigWrapper.cloneNode(true)

    if (dark) {
        clone.classList.remove('light')
        clone.classList.add('dark')
    } else {
        clone.classList.remove('dark')
        clone.classList.add('light')
    }

    clone.classList.add('copy')
    main.appendChild(clone)

    document.body.classList.add('stop-scrolling')

    clone.addEventListener('animationend', () => {
        document.body.classList.remove('stop-scrolling')
        bigWrapper.remove()
        clone.classList.remove('copy')

        // Reset variables
        declare()
        events()
    })
}

function events() {
    toggleBtn.addEventListener('click', toggleAnimation)

    hamburguerMenu.addEventListener('click', () => {
        bigWrapper.classList.toggle('active')
    })
}

events()