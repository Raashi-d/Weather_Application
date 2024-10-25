class WeatherController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindSearchEvent(this.handleSearchEvent.bind(this));
    this.view.bindLocationEvent(this.handleLocationEvent.bind(this));
  }

  async handleSearchEvent() {
    const cityName = this.view.cityInput.value.trim();
    if (!cityName) return;

    try {
      const coordinates = await this.model.getCityCoordinates(cityName);
      const weatherData = await this.model.getWeatherDetails(
        cityName,
        coordinates.lat,
        coordinates.lon
      );
      this.view.renderWeatherData(cityName, weatherData);
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching the weather data.");
    }
  }

  async handleLocationEvent() {
    try {
      const coordinates = await this.model.getUserCoordinates();
      const cityName = await this.model.getCityNameFromCoordinates(
        coordinates.latitude,
        coordinates.longitude
      );
      const weatherData = await this.model.getWeatherDetails(
        cityName,
        coordinates.latitude,
        coordinates.longitude
      );
      this.view.renderWeatherData(cityName, weatherData);
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching the weather data.");
    }
  }
}