const WATCH = document.querySelector('.watch')
const INPUT_NAME = document.getElementById('input_name')
const HOURS = WATCH.querySelector('.watch__hours')
const MINUTES = WATCH.querySelector('.watch__minuts')
const SECONDS = WATCH.querySelector('.watch__seconds')
const DAYS = WATCH.querySelector('.watch__day')
const MONTH = WATCH.querySelector('.watch__month')
const WATCH_ROW = WATCH.querySelector('.watch__dateRow')
const DATE_ELEMENT = WATCH.querySelector('.watch__date')
const GREETING_ELEMENT = WATCH.querySelector('.watch__greeting_text')
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dayNames_RU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
const monthNames_RU = [' Января ', ' Февраля ', ' Марта ', ' Апреля ', ' Мая ', ' Июня ', ' Июля ', ' Августа ', ' Сентября ', ' Октября ', ' Ноября ', ' Декабря ',]
const greetingList = ['night', 'morning', 'afternoon', 'evening',]
const greetingListRU = ['Доброй ночи', 'Доброго утра', 'Доброго дня', 'Доброго вечера',]
const LANG = document.querySelectorAll("input[name='lang']")

function getTime() {
    let DATE = new Date()
    const hours = DATE.getHours() < 10 ? '0' + DATE.getHours() : DATE.getHours()
    const minutes = DATE.getMinutes() < 10 ? '0' + DATE.getMinutes() : DATE.getMinutes()
    const seconds = DATE.getSeconds() < 10 ? '0' + DATE.getSeconds() : DATE.getSeconds()
    HOURS.textContent = hours
    MINUTES.textContent = minutes
    SECONDS.textContent = seconds
    getDate(DATE)
    greeting(hours)

}
function getDate(DATE) {
    let day = DATE.getDay()
    let month = DATE.getMonth()
    let date = DATE.getDate()
    DAYS.textContent = LANG[0].checked === true ? dayNames[day] : dayNames_RU[day]
    MONTH.textContent = LANG[0].checked === true ? monthNames[month] : monthNames_RU[month]
    DATE_ELEMENT.textContent = ' ' + date
    if (LANG[0].checked === true) {
        WATCH_ROW.append(DATE_ELEMENT)
    } else {
        WATCH_ROW.append(MONTH)
    }

}
function greeting(hours) {
    let current = greetingList[Math.floor(hours / 6)]
    if (LANG[0].checked === true) {
        current = greetingList[Math.floor(hours / 6)]
        GREETING_ELEMENT.textContent = `Good ${current},`
        INPUT_NAME.placeholder = 'enter name'
    } else {
        current = greetingListRU[Math.floor(hours / 6)]
        GREETING_ELEMENT.textContent = `${current},`
        INPUT_NAME.placeholder = 'Введите имя'
    }
}



function refreshTime() {
    setInterval(() => getTime(), 1000)
}

function setLocalStorageWatch() {
    localStorage.setItem('name', INPUT_NAME.value);
    if (LANG[0].checked === true) {
        localStorage.setItem('langWatch', 'en');
    } else {
        localStorage.setItem('langWatch', 'ru');
    }
}
window.addEventListener('beforeunload', setLocalStorageWatch)

function getLocalStorageWatch() {
    if (localStorage.getItem('name')) {
        INPUT_NAME.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('langWatch') === 'en') {
        LANG[0].checked = true;
    } else {
        LANG[1].checked = true
        refreshTime()
    }
}
window.addEventListener('load', getLocalStorageWatch)
export { greetingList, refreshTime }
