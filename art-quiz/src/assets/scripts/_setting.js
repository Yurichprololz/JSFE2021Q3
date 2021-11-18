
const POPUP = document.querySelector('.popup')
const CHECKBOXS = POPUP.querySelectorAll('input[type="checkbox"]')
const RANGES = POPUP.querySelectorAll('.setting__range')
const update = new Event('input')
const AUDIOS = document.querySelectorAll('audio')


const showSetting = () => {
    POPUP.classList.add('popup__setting_active')
}

const hideSetting = () => {
    POPUP.classList.remove('popup__setting_active')
}
CHECKBOXS.forEach(el => {
    el.addEventListener('change', (e) => {
        const range = document.getElementById(`${e.target.id.split('-')[0]}`)
        if (e.target.checked === false) {
            range.value = 0
        } else {
            range.value = localStorage.getItem(`${range.id}`)
        }
        range.dispatchEvent(update)
    })
})
RANGES.forEach(input => {
    input.addEventListener('input', showDigital)
    input.addEventListener('change', (e) => {
        const range = e.target
        localStorage.setItem(`${range.id}`, range.value);

    })
})
const cheinRangeWithCheck = INPUT => {
    const check = document.getElementById(`${INPUT.id}-check`)
    if (INPUT.value > 0) {
        check.checked = true
    } else {
        check.checked = false
    }

}

function showDigital(event) {
    const INPUT = event.target
    const OUTPUT = document.getElementById(`${INPUT.id}_output`)

    if (INPUT.id == 'time_for_round') {
        OUTPUT.innerHTML = INPUT.value < 10 ? '0' + INPUT.value + ' sec' : INPUT.value + ' sec'
    } else {
        OUTPUT.innerHTML = INPUT.value < 10 ? '0' + INPUT.value + ' per' : INPUT.value + ' per'
    }

    cheinRangeWithCheck(INPUT)
}

function setLocalStorage() {

    RANGES.forEach((range, i) => {
        localStorage.setItem(`${range.id}`, range.value);
    })
    CHECKBOXS.forEach(checkbox => {

    })
}

function getAudio(i) {
    const volume = document.getElementById('system_sounds').value
    let audio = AUDIOS[i]
    audio.volume = volume / 100
    audio.currentTime = 0
    audio.play()
}
function getLocalStorage() {

    RANGES.forEach((range, i) => {
        if (localStorage.getItem(`${range.id}`)) {
            range.value = localStorage.getItem(`${range.id}`);
            range.dispatchEvent(update)
        }
    })
}

// document.getElementById('time_for_round').addEventListener('input', showDigital)

export { showSetting, hideSetting, setLocalStorage, getLocalStorage, getAudio }