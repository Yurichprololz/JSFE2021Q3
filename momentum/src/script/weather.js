const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const CITY_INPUT = document.querySelector('.сity')
const HUMIDITY = document.querySelector('.humidity')
const WIND_SPEED = document.querySelector('.wind_speed')
const LANG = document.querySelectorAll("input[name='lang']")
let lang = 'en'

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_INPUT.value}&lang=${lang}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.message) {
        alert(data.message)
    }
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    changeLang(data)

}
function changeLang(d) {
    if (LANG[0].checked === true) {
        lang = 'ru'
        switchToEn(d)
    } else {
        lang = 'en'
        switchToRu(d)
    }
}
function switchToEn(data) {
    weatherDescription.textContent = data.weather[0].description;
    HUMIDITY.textContent = `humidity: ${data.main.humidity}%`
    WIND_SPEED.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
}
function switchToRu(data) {
    weatherDescription.textContent = data.weather[0].description;
    HUMIDITY.textContent = `Влажность: ${data.main.humidity}%`
    WIND_SPEED.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`
}

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        CITY_INPUT.value = localStorage.getItem('city');
    }
    if (localStorage.getItem('lang') === 'en') {
        LANG[0].checked = true;
    } else {
        LANG[1].checked = true
        getWeather()
    }
}
function setLocalStorage() {
    localStorage.setItem('city', CITY_INPUT.value);
    if (LANG[0].checked === true) {
        localStorage.setItem('lang', 'en');
    } else {
        localStorage.setItem('lang', 'ru');
    }
}
getWeather()

CITY_INPUT.addEventListener('change', getWeather)


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)
LANG.forEach((el) => {
    el.addEventListener('click', getWeather)
})
