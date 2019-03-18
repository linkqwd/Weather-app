import Component from '../../Framework/Component';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecastDaily } from './WeatherForecastDaily';
import { WeatherForecastWeekly } from './WeatherForecastWeekly';
import { AppState } from '../../Services';

export default class Main extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('SEARCH-RESULT', this.updateMySelf);
  }

  dayOfmonth(dt) {
    return new Date(dt * 1000).getDate();
  }

  defineMaxTemp(array) {
    return array.reduce((stack, value) => {
      if (stack < value.main.temp_min) {
        return value.main.temp_min;
      } else {
        return stack;
      }
    }, 0);
  }

  defineMinTemp(array) {
    return array.reduce((stack, value) => {
      if (stack > value.main.temp_min) {
        return value.main.temp_min;
      } else {
        return stack;
      }
    }, 9999);
  }

  relativeDayOfMonth(arg = 0) {
    const date = new Date();
    return date.getDate() + arg;
  }

  updateMySelf(state) {
    const newState = {
      // Current weather
      tValue: state.currentWeather.main.temp,
      tUnit: '&#8451',
      city: `${state.currentWeather.name}, ${state.currentWeather.sys.country}`,
      wSpeed: state.currentWeather.wind.speed,
      wUnit: 'mph',
      wDeg: state.currentWeather.wind.deg,
      pressure: state.currentWeather.main.pressure,
      humidity: `${state.currentWeather.main.humidity}%`,
      sunrise: state.currentWeather.sys.sunrise,
      sunset: state.currentWeather.sys.sunset,

      // Daily forecast
      time1: state.foreCast.list[1].dt_txt,
      time2: state.foreCast.list[2].dt_txt,
      time3: state.foreCast.list[3].dt_txt,
      time4: state.foreCast.list[4].dt_txt,
      time5: state.foreCast.list[5].dt_txt,

      tValue1: state.foreCast.list[1].main.temp,
      tValue2: state.foreCast.list[2].main.temp,
      tValue3: state.foreCast.list[3].main.temp,
      tValue4: state.foreCast.list[4].main.temp,
      tValue5: state.foreCast.list[5].main.temp,

      // Weekly forecast
      fDay0: {
        dayOfWeek: this.relativeDayOfMonth(0),
        data: [],
        maxTemp: '',
        minTemp: ''
      }
    };

    for (let i = 0, obj = 0; i < state.foreCast.list.length; i++) {
      let day = this.dayOfmonth(state.foreCast.list[i].dt);

      if (newState[`fDay${obj}`].dayOfWeek === day) {
        newState[`fDay${obj}`].data.push(state.foreCast.list[i]);
      } else {
        if (newState[`fDay${++obj}`] === undefined) {
          newState[`fDay${obj}`] = {
            dayOfWeek: this.relativeDayOfMonth(obj),
            data: [],
            maxTemp: '',
            minTemp: ''
          };
        }

        newState[`fDay${obj}`].data.push(state.foreCast.list[i]);
        newState[`fDay${obj}`].maxTemp = this.defineMaxTemp(
          newState[`fDay${obj}`].data
        );
        newState[`fDay${obj}`].minTemp = this.defineMinTemp(
          newState[`fDay${obj}`].data
        );
      }
    }

    console.log(newState);

    this.updateState(newState);
  }

  init() {
    [
      'updateMySelf',
      'defineMinTemp',
      'defineMaxTemp',
      'dayOfmonth',
      'relativeDayOfMonth'
    ].forEach(methodName => (this[methodName] = this[methodName].bind(this)));
  }

  render() {
    if (this.state === undefined) return [];

    const foreCast = [
      {
        tag: 'main',
        classList: ['layout__main'],
        children: [
          {
            tag: 'div',
            classList: 'layout__today-wrapper',
            children: [
              {
                tag: CurrentWeather,
                props: this.state
              },
              {
                tag: WeatherForecastDaily,
                props: this.state
              }
            ]
          },
          {
            tag: WeatherForecastWeekly,
            props: this.state
          }
        ]
      }
    ];

    return foreCast;
  }
}
