const INPUTS = document.querySelectorAll('.blocks__setting')
const ICON = document.querySelector('.setting-icon')
const SETTING_BLOCK = document.querySelector('.setting')


function blockSetting(e) {
    const target = e.target.closest('.blocks__setting')
    const elem = document.querySelector(`.${target.dataset.block}`)
    if (target.value === '1') {
        elem.classList.add('hide')
    } else {
        elem.classList.remove('hide')
    }
}

function showSetting() {
    SETTING_BLOCK.classList.toggle('show')
}
function setLocalStorage() {
    localStorage.setItem('watch_v', INPUTS[0].value);
    localStorage.setItem('watch', document.querySelector(`.watch`).classList);
    localStorage.setItem('audio_v', INPUTS[1].value);
    localStorage.setItem('audio', document.querySelector(`.audio`).classList);
    localStorage.setItem('weather_v', INPUTS[2].value);
    localStorage.setItem('weather', document.querySelector(`.weather`).classList);
    localStorage.setItem('quote_v', INPUTS[3].value);
    localStorage.setItem('quote', document.querySelector(`.quote`).classList);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('watch')) {
        INPUTS[0].value = localStorage.getItem('watch_v');
        document.querySelector(`.watch`).classList = '' + localStorage.getItem('watch');
    }
    if (localStorage.getItem('audio')) {
        INPUTS[1].value = localStorage.getItem('audio_v');
        document.querySelector(`.audio`).classList = '' + localStorage.getItem('audio');
    }
    if (localStorage.getItem('weather')) {
        INPUTS[2].value = localStorage.getItem('weather_v');
        document.querySelector(`.weather`).classList = '' + localStorage.getItem('weather');
    }
    if (localStorage.getItem('quote')) {
        INPUTS[3].value = localStorage.getItem('quote_v');
        document.querySelector(`.quote`).classList = '' + localStorage.getItem('quote');
    }
}
window.addEventListener('load', getLocalStorage)

INPUTS.forEach((el) => {
    el.addEventListener('change', blockSetting)
})
ICON.addEventListener('click', showSetting)