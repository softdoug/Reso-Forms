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


const docParameters = document.getElementById('parameter-listener')
let zayavlenieSelectAbout = document.getElementById('zayavlenie-select-about')
let zayavlenieSelectProperties = document.getElementById('zayavlenie-select-properties')
let jalobaSelectStage = document.getElementById('jaloba-select-stage')
let jalobaSelectStatus = document.getElementById('jaloba-select-status')
let jalobaSelectWhich = document.getElementById('jaloba-select-which')
let hodataystvoSelectStatus = document.getElementById('hodataystvo-select-status')
let hodataystvoSelectAbout = document.getElementById('hodataystvo-select-about')
let zaprosSelectStatus = document.getElementById('zapros-select-status')
let zaprosSelectAbout = document.getElementById('zapros-select-about')

docParameters.addEventListener('click', event => {
    //Заявление
    if (event.target.id === 'zayavlenie-select-about' && zayavlenieSelectAbout.value === '1') {
        zayavlenieSelectProperties.style.display = 'block'
    }
    if (event.target.id === 'zayavlenie-select-about' && zayavlenieSelectAbout.value != '1') {
        zayavlenieSelectProperties.style.display = 'none'
    }
    //Жалоба
    if (event.target.id === 'jaloba-select-stage' && jalobaSelectStage.value === '1') {
        disableOption(jalobaSelectWhich, 4)
        disableOption(jalobaSelectWhich, 5)
        disableOption(jalobaSelectWhich, 7)
        enableOption(jalobaSelectStatus, 4)
        enableOption(jalobaSelectWhich, 1)
        enableOption(jalobaSelectWhich, 2)
        enableOption(jalobaSelectWhich, 3)
        for (let i = 0; i < jalobaSelectStatus.length; i++) {
            if (i > 0 && i < 3) {
                disableOption(jalobaSelectStatus, i)
            }
        }
    }
    if (event.target.id === 'jaloba-select-stage' && jalobaSelectStage.value != '1') {
        enableOption(jalobaSelectWhich, 4)
        enableOption(jalobaSelectWhich, 5)
        enableOption(jalobaSelectWhich, 7)
        disableOption(jalobaSelectStatus, 4)
        disableOption(jalobaSelectWhich, 1)
        disableOption(jalobaSelectWhich, 2)
        disableOption(jalobaSelectWhich, 3)
        for (let i = 0; i < jalobaSelectStatus.length; i++) {
            if (i > 0 && i < 3) {
                enableOption(jalobaSelectStatus, i)
            }
        }
    }
    // Ходатайство
    if (event.target.id === 'hodataystvo-select-status' && hodataystvoSelectStatus.value === '2') {
        enableOption(hodataystvoSelectAbout, 7)
    }
    if (event.target.id === 'hodataystvo-select-status' && hodataystvoSelectStatus.value != '2') {
        disableOption(hodataystvoSelectAbout, 7)
    }
    // Запрос
    if (event.target.id === 'zapros-select-status' && zaprosSelectStatus.value === '3') {
        enableOption(zaprosSelectAbout, 3)
        enableOption(zaprosSelectAbout, 4)
    }
    if (event.target.id === 'zapros-select-status' && zaprosSelectStatus.value != '3') {
        disableOption(zaprosSelectAbout, 3)
        disableOption(zaprosSelectAbout, 4)
    }
})


function disableOption(name, index) {
    name.options[index].setAttribute("disabled", "disabled")
}

function enableOption(name, index) {
    name.options[index].removeAttribute("disabled", "disabled")
}

let buttonDone = document.getElementById('done')
let searchPanel = document.getElementById('search-panel')
let resultPanel = document.getElementById('result-panel')

buttonDone.onclick = () => {
    searchPanel.style.display = 'none'
    resultPanel.style.display = 'block'
        // Заявление
    if (choosenTypeId === 'zayavlenie') {
        document.getElementById('results-' + choosenTypeId).style.display = 'flex'
        if (zayavlenieSelectAbout > 0) {
            let z = document.getElementById('z' + zayavlenieSelectAbout.value)
            z.style.display = 'block'
            if (zayavlenieSelectProperties.value > 0) {
                document.getElementById(z.id + zayavlenieSelectProperties.value).style.display = 'block'
            } else {
                for (let i = 1; i <= zayavlenieSelectProperties.length; i++) {
                    document.getElementById(z.id + i).style.display = 'block'
                }
            }
        } else {
            document.getElementById('err-text').style.display = 'inline'
        }
    }
    //Жалоба
    if (choosenTypeId === 'jaloba') {
        document.getElementById('results-' + choosenTypeId).style.display = 'flex'
        let z = document.getElementById('j' + jalobaSelectStage.value)
        if (jalobaSelectStage.value > 0) {
            z.style.display = 'block'
            if (jalobaSelectStatus.value > 0) {
                document.getElementById(z.id + jalobaSelectStatus.value).style.display = 'block'
                if (jalobaSelectWhich.value > 0) {
                    document.getElementById(z.id + jalobaSelectStatus.value + jalobaSelectWhich.value).style.display = 'block'
                } else {
                    for (let i = 1; i <= jalobaSelectWhich.length; i++) {
                        if (document.getElementById(z.id + jalobaSelectStatus.value + i) == null) continue
                        document.getElementById(z.id + jalobaSelectStatus.value + i).style.display = 'block'
                    }
                }
            } else {
                for (let i = 1; i <= jalobaSelectStatus.length; i++) {
                    if (document.getElementById(z.id + i) == null) continue
                    document.getElementById(z.id + i).style.display = 'block'
                    if (jalobaSelectWhich.value > 0) {
                        document.getElementById(z.id + i + jalobaSelectWhich.value).style.display = 'block'
                    } else {
                        for (let x = 1; x <= jalobaSelectWhich.length; x++) {
                            if (document.getElementById(z.id + i + x) == null) continue
                            document.getElementById(z.id + i + x).style.display = 'block'
                        }
                    }
                }
            }
        } else {
            document.getElementById('err-text').style.display = 'inline'
        }
    }
    //Ходатайство
    if (choosenTypeId === 'hodataystvo') {
        document.getElementById('results-' + choosenTypeId).style.display = 'flex'
        let z = document.getElementById('h' + hodataystvoSelectStatus.value)
        if (hodataystvoSelectStatus.value > 0) {
            z.style.display = 'block'
            if (hodataystvoSelectAbout.value > 0) {
                document.getElementById(z.id + hodataystvoSelectAbout.value).style.display = 'block'
            } else {
                for (let i = 1; i <= hodataystvoSelectAbout.length; i++) {
                    if (document.getElementById(z.id + i) == null) continue
                    document.getElementById(z.id + i).style.display = 'block'
                }
            }
        } else {
            document.getElementById('err-text').style.display = 'inline'
        }
    }

    //Запрос
    if (choosenTypeId === 'zapros') {
        console.log('q')
        document.getElementById('results-' + choosenTypeId).style.display = 'flex'
        let z = document.getElementById('a' + zaprosSelectStatus.value)
        if (zaprosSelectStatus.value > 0) {
            z.style.display = 'block'
            if (zaprosSelectAbout.value > 0) {
                document.getElementById(z.id + zaprosSelectAbout.value).style.display = 'block'
            } else {
                for (let i = 1; i <= zaprosSelectAbout.length; i++) {
                    if (document.getElementById(z.id + i) == null) continue
                    document.getElementById(z.id + i).style.display = 'block'
                }
            }
        } else {
            document.getElementById('err-text').style.display = 'inline'
        }
    }
}