
const POPUP = document.querySelector('.popup')
const CHECKBOXS = POPUP.querySelectorAll('input[type="checkbox"]')
const RANGES = POPUP.querySelectorAll('.setting__range')
const update = new Event('input')


const showSetting = () => {
    POPUP.classList.add('popup__setting_active')
}

const hideSetting = () => {
    POPUP.classList.remove('popup__setting_active')
}

RANGES.forEach(input => {
    const OUTPUT = document.querySelector(`#${input.id}_output`)
    OUTPUT.textContent = input.value + ' sec'
    input.addEventListener('input', showDigitalTime)
})

function showDigitalTime(event) {
    const el = event.target
    const OUTPUT = document.querySelector(`#${el.id}_output`)
    OUTPUT.textContent = el.value + ' sec'
}
function setLocalStorage() {

    RANGES.forEach((range, i) => {
        localStorage.setItem('range' + i, range.value);
    })
    CHECKBOXS.forEach(checkbox => {

    })
}

function getAudio(i) {
    let audio = audios[i]
    audio.currentTime = 0
    audio.play()
}
function getLocalStorage() {

    RANGES.forEach((range, i) => {
        if (localStorage.getItem('range' + i)) {
            range.value = localStorage.getItem('range' + i);
            range.dispatchEvent(update)
        }
    })
}
export { showSetting, hideSetting, setLocalStorage, getLocalStorage, getAudio }