class WeatherDataService {
  async getCurrentWeather(city) {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3688267edbac491005d0dff07f9cbf22`
    );
    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  }

  getWeatherForecast() {}
}

export default new WeatherDataService();
