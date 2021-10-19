const WATCH = document.querySelector('.watch')
const INPUT_NAME = document.getElementById('input_name')
const HOURS = WATCH.querySelector('.watch__hours')
const MINUTES = WATCH.querySelector('.watch__minuts')
const SECONDS = WATCH.querySelector('.watch__seconds')
const DAYS = WATCH.querySelector('.watch__day')
const MONTH = WATCH.querySelector('.watch__month')
const DATE_ELEMENT = WATCH.querySelector('.watch__date')
const GREETING_ELEMENT = WATCH.querySelector('.watch__greeting_text')
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
const greetingList = ['night', 'morning', 'afternoon', 'evening',]

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
    DAYS.textContent = dayNames[day]
    MONTH.textContent = monthNames[month]
    DATE_ELEMENT.textContent = date
}
function greeting(hours) {
    let current = greetingList[Math.floor(hours / 6)]
    GREETING_ELEMENT.textContent = `Good ${current},`
}



function refreshTime() {
    setInterval(() => getTime(), 1000)
}

function setLocalStorage() {
    localStorage.setItem('name', INPUT_NAME.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        INPUT_NAME.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)
export { greetingList, refreshTime }
