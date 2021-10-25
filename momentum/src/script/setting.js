const INPUTS = document.querySelectorAll('.blocks__setting')
const ICON = document.querySelector('.setting-icon')
const SETTING_BLOCK = document.querySelector('.setting')
const BLOCK_TITLE = document.querySelector('.blocks_title')
const COLL_TITLE = document.querySelector('.blocks_collection')
const BLOCK_WATCH = document.querySelector('.blocks__watch_text')
const BLOCK_AUDIO = document.querySelector('.blocks__audio_text')
const BLOCK_WEATHER = document.querySelector('.blocks__weather_text')
const BLOCK_QUOTE = document.querySelector('.blocks__quote_text')
const LANG_TITLE = document.querySelector('.lang_title')
const LANG = document.querySelectorAll("input[name='lang']")
const LANG_EN = document.querySelector('.lang_EN')
const LANG_RU = document.querySelector('.lang_RU')
const TAGS = document.querySelector('.tags')
function changeLang() {
    if (LANG[0].checked === true) {
        switchToEn()
    } else {
        switchToRu()

    }
}
function switchToEn() {
    BLOCK_TITLE.textContent = "Block's visibility"
    BLOCK_WATCH.textContent = 'Watch'
    BLOCK_AUDIO.textContent = 'Audio'
    BLOCK_WEATHER.textContent = 'Weather'
    BLOCK_QUOTE.textContent = 'Quote'
    COLL_TITLE.textContent = "Image's collection"
    LANG_TITLE.textContent = 'Application language'
    LANG_EN.textContent = 'English'
    LANG_RU.textContent = 'Russian'
    TAGS.placeholder = 'Tags'
}
function switchToRu() {
    BLOCK_TITLE.textContent = "Видимость блоков"
    BLOCK_WATCH.textContent = 'Часы'
    BLOCK_AUDIO.textContent = 'Проигрыватель'
    BLOCK_WEATHER.textContent = 'Погода'
    BLOCK_QUOTE.textContent = 'Цитаты'
    COLL_TITLE.textContent = "Коллекция изображений"
    LANG_TITLE.textContent = 'Язык приложения'
    LANG_EN.textContent = 'Английский'
    LANG_RU.textContent = 'Русский'
    TAGS.placeholder = 'Теги картинок'

}

function blockSetting(e) {
    const target = e.target.closest('.blocks__setting')
    const elem = document.querySelector(`.${target.dataset.block}`)
    if (target.value === '1') {
        elem.classList.add('hide')
    } else {
        elem.classList.remove('hide')
    }
}
function setLang() {
    if (LANG[0].checked === true) {
        localStorage.setItem('lang', 'en');
    } else {
        localStorage.setItem('lang', 'ru');

    }
}

function getLang() {
    if (localStorage.getItem('lang') === 'en') {
        LANG[0].checked = true;
    } else {
        LANG[1].checked = true
        changeLang()
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
    setLang()
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
    getLang()
}
window.addEventListener('load', getLocalStorage)

INPUTS.forEach((el) => {
    el.addEventListener('change', blockSetting)
})
ICON.addEventListener('click', showSetting)
LANG.forEach((el) => {
    el.addEventListener('click', changeLang)
})