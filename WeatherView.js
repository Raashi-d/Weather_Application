class WeatherView {
  constructor() {
    this.cityInput = document.querySelector(".city-input");
    this.searchButton = document.querySelector(".search-btn");
    this.locationButton = document.querySelector(".location-btn");
    this.currentWeatherDiv = document.querySelector(".current-weather");
    this.weatherCardsDiv = document.querySelector(".weather-cards");
  }

  createWeatherCard(cityName, weatherItem, index) {
    if (index === 0) {
      // HTML for main weather card
      return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="Weather Icon">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>`;
    } else {
      // HTML for the other five day forecast cards
      return `<li class="card"> 
                <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="Weather Icon">
                <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </li>`;
    }
  }

  renderWeatherData(cityName, weatherData) {
    this.clearWeatherData();

    // Creating weather cards and adding them to the DOM
    weatherData.forEach((weatherItem, index) => {
      const weatherCard = this.createWeatherCard(cityName, weatherItem, index);
      if (index === 0) {
        this.currentWeatherDiv.insertAdjacentHTML("beforeend", weatherCard);
      } else {
        this.weatherCardsDiv.insertAdjacentHTML("beforeend", weatherCard);
      }
    });
  }

  //clear previous weather data
  clearWeatherData() {
    this.cityInput.value = "";
    this.weatherCardsDiv.innerHTML = "";
    this.currentWeatherDiv.innerHTML = "";
  }

  bindSearchEvent(handler) {
    this.searchButton.addEventListener("click", handler);
    this.cityInput.addEventListener("keyup", (e) =>
      e.key === "Enter" && handler()
    );
  }

  bindLocationEvent(handler) {
    this.locationButton.addEventListener("click", handler);
  }
}