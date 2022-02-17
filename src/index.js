const cityName = document.getElementById("cityName");
const currentTemperature = document.getElementById("currentTemperature");
const weatherDescription = document.getElementById("weatherDescription");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");
const dayOfWeek = document.querySelectorAll("#dayOfWeek");
const forecastWrapper = document.getElementById("forecast");
const themeWrapper = document.getElementById("themeWrapper");
const mainIcon = document.getElementById("mainIcon");
const citySearchForm = document.getElementById("citySearchForm");
const citySearch = document.getElementById("citySearch");

const formateTime = (data) => {
  const sunriseUnit = data.sys.sunrise;
  const sunsetUnit = data.sys.sunset;
  let sunriseConverted = new Date(sunriseUnit * 1000)
  let sunsetConverted = new Date(sunsetUnit * 1000)

  let sunriseHours = sunriseConverted.getHours();
  if (sunriseHours < 10) {
    sunriseHours = `0${sunriseHours}`
  }
  let sunriseMinutes = sunriseConverted.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`
  }
  let sunsetHours = sunsetConverted.getHours();
  if (sunsetHours < 10) {
    sunsetHours = `0${sunsetHours}`
  }
  let sunsetMinutes = sunsetConverted.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`
  }

  return {
    sunrise: `${sunriseHours}:${sunriseMinutes}`,
    sunset: `${sunsetHours}:${sunsetMinutes}`
  }
}

const displayCityWeather = (data) => {
  const iconID = data.weather[0].icon;
  const displayIcon = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
  const lat = data.coord.lat;
  const lon = data.coord.lon;

  cityName.innerHTML = data.name;
  currentTemperature.innerHTML = `${Math.round(data.main.temp)} <span class="degree">℃</span>`;
  weatherDescription.innerHTML = data.weather[0].description;
  sunriseTime.innerHTML = formateTime(data).sunrise;
  sunsetTime.innerHTML = formateTime(data).sunset;
  mainIcon.src = displayIcon;

  if (iconID.includes("d")) {
    themeWrapper.style.backgroundImage = "url('./images/day-sky.jpg')"
  } else {
    themeWrapper.style.backgroundImage = "url('./images/night-sky.jpg')"
  }

  fetchWeatherForecast(lat, lon)
}

const displayCityForecast = (data) => {
  const forecastDays = data.daily;
  for (let index = 1; index < forecastDays.length; index++) {
    const daysOfWeek = new Date(forecastDays[index].dt * 1000);
    const days = daysOfWeek.getDay();
    const day = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ]

    const dayNames = day[days];
    const iconID = forecastDays[index].weather[0].icon;
    const displayIcon = `https://openweathermap.org/img/wn/${iconID}.png`
    const maxTemp = Math.round(forecastDays[index].temp.max);
    const minTemp = Math.round(forecastDays[index].temp.min);

    forecastWrapper.innerHTML += `<div class="forecast-wrapper">
      <span><h3 class="forecast-days">${dayNames}</h3></span>
      <span class="justify-center"><img class="forecast-icon" src="${displayIcon}" alt="forecast icon"></span>
      <span class="justify-end"><p class="max-min-temp">${maxTemp}° / ${minTemp}°</p></span>
      </div>`
  }
}

const handleCitySearch = (event) => {
  event.preventDefault()
  fetchWeatherData(citySearch.value)
  forecastWrapper.innerHTML = ""
}

const fetchWeatherData = (city) => {
  const units = "metric"
  const apiKey = "ad293c37c3b9054770dc9a8a4fe94536"
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      displayCityWeather(data)
    })
    .catch(error => console.log(error))
}

const fetchWeatherForecast = (lat, lon) => {
  const units = "metric";
  const exclude = "current,hourly,minutely,alerts"
  const apiKey = "ad293c37c3b9054770dc9a8a4fe94536";
  const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${apiKey}`;

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      displayCityForecast(data)
    })
    .catch(error => console.log(error))
}

fetchWeatherData("stockholm")

citySearchForm.addEventListener("submit", handleCitySearch)