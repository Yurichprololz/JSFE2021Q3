const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const CITY_INPUT = document.querySelector('.сity')
const HUMIDITY = document.querySelector('.humidity')
const WIND_SPEED = document.querySelector('.wind_speed')

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_INPUT.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.message) {
        alert(data.message)
    }
    weatherIcon.className = 'weather-icon owf';

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    HUMIDITY.textContent = `humidity: ${data.main.humidity}%`
    WIND_SPEED.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
}
function getLocalStorage() {
    if (localStorage.getItem('city')) {
        CITY_INPUT.value = localStorage.getItem('city');
    }
}
function setLocalStorage() {
    localStorage.setItem('city', CITY_INPUT.value);
}
getWeather()

CITY_INPUT.addEventListener('change', getWeather)


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

