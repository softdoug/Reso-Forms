'use strict'

const typesOfDoc = document.getElementById('typedoc')
let buttons = document.getElementsByClassName('doc-types-inactive')
let target
let choosenTypeId
const selectedType = ['zayavlenie', 'jaloba', 'hodataystvo', 'zapros', 'inoe']

typesOfDoc.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        target = event.target
        choosenTypeId = target.id.slice(0, -3)
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].tagName == 'BUTTON' || buttons[i].className === 'doc-types-active') {
                buttons[i].classList.add('interactive-on')
                buttons[i].classList.remove('doc-types-active')
            }
        }
        for (let i = 0; i < selectedType.length; i++) {
            let x = document.getElementById(selectedType[i])
            if (x.tagName == 'DIV' || y.style.display === 'flex') {
                x.style.display = 'none'
            }
        }
        //event.target.id === selectedType[i]
        changeBackgroundColor(target)
        selectType(choosenTypeId)

    }

})

function changeBackgroundColor(target) {
    target.classList.remove('interactive-on')
    target.classList.add('doc-types-active')
}

function selectType(choosenTypeId) {
    let x = document.getElementById(choosenTypeId)
    x.style.display = 'flex'
}