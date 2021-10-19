const WATCH = document.querySelector('.watch')
const HOURS = WATCH.querySelector('.watch__hours')
const MINUTES = WATCH.querySelector('.watch__minuts')
const SECONDS = WATCH.querySelector('.watch__seconds')
const DAYS = WATCH.querySelector('.watch__day')
const MONTH = WATCH.querySelector('.watch__month')
const DATE_ELEMENT = WATCH.querySelector('.watch__date')
const GREETING_ELEMENT = WATCH.querySelector('.watch__greeting_text')
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
const greetingList = ['Good night', 'Good morning', 'Good afternoon', 'Good evening',]
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
    GREETING_ELEMENT.textContent = greetingList[Math.floor(hours / 6)]

}
const refreshTime = () => {
    setInterval(() => getTime(), 1000)
}
refreshTime()