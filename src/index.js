const cityName = document.getElementById("cityName");
const currentTemperature = document.getElementById("currentTemperature");
const weatherDescription = document.getElementById("weatherDescription");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");

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
  cityName.innerHTML = data.name;
  currentTemperature.innerHTML = `${Math.round(data.main.temp)} ℃`;
  weatherDescription.innerHTML = data.weather[0].description;
  sunriseTime.innerHTML = formateTime(data).sunrise;
  sunsetTime.innerHTML = formateTime(data).sunset;
}

const fetchWeatherData = () => {
  const city = "stockholm"
  const units = "metric"
  const apiKey = "ad293c37c3b9054770dc9a8a4fe94536"
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayCityWeather(data)
    })
    .catch(error => console.log(error))
}

fetchWeatherData()