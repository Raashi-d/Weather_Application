const API_KEY = "e998f9ff8d0a125d12bcadd92b92abb0";
const model = new WeatherModel(API_KEY);
const view = new WeatherView();
const controller = new WeatherController(model, view);