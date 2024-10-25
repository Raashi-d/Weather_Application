class WeatherModel {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getWeatherDetails(cityName, lat, lon) {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    const response = await fetch(WEATHER_API_URL);
    const data = await response.json();

    // Filter the forecast to get only one forecast per day
    const uniqueForcastDay = [];
    const fiveDaysForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForcastDay.includes(forecastDate)) {
        uniqueForcastDay.push(forecastDate);
        return true;
      }
      return false;
    });

    return fiveDaysForecast;
  }

  async getCityCoordinates(cityName) {
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${this.apiKey}`;

    const response = await fetch(GEOCODING_API_URL);
    const data = await response.json();

    if (!data.length) {
      throw new Error(`No coordinates found for ${cityName}`);
    }

    const { name, lat, lon } = data[0];
    return { name, lat, lon };
  }

  async getUserCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          if (error.code === error.PERMISSION_DENIED) {
            reject(new Error("Geolocation request denied. Please reset location permission to grant access again."));
          } else {
            reject(error);
          }
        }
      );
    });
  }

  async getCityNameFromCoordinates(lat, lon) {
    const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;

    const response = await fetch(REVERSE_GEOCODING_URL);
    const data = await response.json();

    if (!data.length) {
      throw new Error("Unable to retrieve city name from coordinates.");
    }

    const { name } = data[0];
    return name;
  }
}