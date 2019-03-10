class WeatherDataService {
  getCurrentWeather() {
    const friendsData = async function buildFriendsList() {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=New%20york,us&units=metric&appid=3688267edbac491005d0dff07f9cbf22`
      );
      const responseData = await response.json();

      console.log(responseData.main.temp);

      return responseData.main.temp;
    };

    return friendsData();
  }

  getWeatherForecast() {}
}

export default new WeatherDataService();
