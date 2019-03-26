class WeatherDataService {
  async getCurrentWeather(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3688267edbac491005d0dff07f9cbf22`
    );
    return await response.json()
  }

  async getWeatherForecast(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=3688267edbac491005d0dff07f9cbf22`
    );
    return await response.json()
  }

  async getCurrentWeatherById(id) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=3688267edbac491005d0dff07f9cbf22`
    );
    return await response.json()
  }

  async getWeatherForecastById(id) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=3688267edbac491005d0dff07f9cbf22`
    );
    return await response.json()
  }
}
export default new WeatherDataService();
