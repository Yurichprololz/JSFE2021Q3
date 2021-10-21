const BTN = document.querySelector('.quote__btn')
const TEXT = document.querySelector('.quote__text')
const AUTHOR = document.querySelector('.quote__author')
async function getQuotes() {
    debugger
    const quotes = './script/quote.json';
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