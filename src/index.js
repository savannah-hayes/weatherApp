const cityName = document.getElementById("cityName");
const currentTemperature = document.getElementById("currentTemperature");
const weatherDescription = document.getElementById("weatherDescription");

const displayCityWeather = (data) => {
  cityName.innerHTML = data.name;
  currentTemperature.innerHTML = `${Math.round(data.main.temp)} ℃`;
  weatherDescription.innerHTML = data.weather[0].main;
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