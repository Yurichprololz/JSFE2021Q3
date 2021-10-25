const BTN = document.querySelector('.quote__btn')
const TEXT = document.querySelector('.quote__text')
const AUTHOR = document.querySelector('.quote__author')
const LANG = document.querySelectorAll("input[name='lang']")


async function getQuotes() {
    const quotes = LANG[0].checked === true ? './script/quote.json' : './script/quote_RU.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const i = getRandom(data)
    TEXT.textContent = data[i].text
    AUTHOR.textContent = data[i].author
}
getQuotes();

function getRandom(data) {
    return Math.floor(Math.random() * (data.length))
}
BTN.addEventListener('click', getQuotes)
LANG.forEach(el => el.addEventListener('change', getQuotes))

function setLocalStorage() {
    if (LANG[0].checked === true) {
        localStorage.setItem('lang', 'en');
    } else {
        localStorage.setItem('lang', 'ru');

    }
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('lang') === 'en') {
        LANG[0].checked = true;
    } else {
        LANG[1].checked = true
        getQuotes()
    }
}
window.addEventListener('load', getLocalStorage)
