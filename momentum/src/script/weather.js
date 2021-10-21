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

const JSON = {
    "coord": { "lon": 27.5667, "lat": 53.9 },
    "weather": [{ "id": 500, "main": "Rain", "description": "небольшой дождь", "icon": "10n" }],
    "base": "stations",
    "main": { "temp": 13.86, "feels_like": 13, "temp_min": 13.74, "temp_max": 13.86, "pressure": 995, "humidity": 65, "sea_level": 995, "grnd_level": 969 },
    "visibility": 10000,
    "wind": { "speed": 9.43, "deg": 222, "gust": 17.69 }, "rain": { "1h": 0.11 }, "clouds": { "all": 100 }, "dt": 1634830660, "sys": { "type": 1, "id": 8939, "country": "BY", "sunrise": 1634791714, "sunset": 1634828389 }, "timezone": 10800, "id": 625144, "name": "Минск", "cod": 200
}