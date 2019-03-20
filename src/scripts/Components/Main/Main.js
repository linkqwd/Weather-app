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

  defineMaxValue(array, objectValue) {
    const decompose = objectValue.split('.');

    return array.reduce((stack, value) => {
      if (stack < value[decompose[0]][decompose[1]]) {
        return value[decompose[0]][decompose[1]];
      } else {
        return stack;
      }
    }, 0);
  }

  defineMinValue(array, objectValue) {
    const decompose = objectValue.split('.');

    return array.reduce((stack, value) => {
      if (stack > value[decompose[0]][decompose[1]]) {
        return value[decompose[0]][decompose[1]];
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
    const currentWeather = {
      city: `${state.currentWeather.name}, ${state.currentWeather.sys.country}`,
      dt: state.currentWeather.dt,
      tValue: Math.round(state.currentWeather.main.temp),
      tMinValue: Math.round(state.currentWeather.main.temp_min),
      tUnit: '&#8451',
      wSpeed: state.currentWeather.wind.speed,
      wUnit: 'mph',
      wDeg: state.currentWeather.wind.deg,
      pressure: Math.round(state.currentWeather.main.pressure),
      humidity: `${state.currentWeather.main.humidity}%`,
      sunrise: state.currentWeather.sys.sunrise,
      sunset: state.currentWeather.sys.sunset
    };

    const weeklyForecast = {
      fDay0: {
        currentWeather: currentWeather,
        dayOfWeek: this.relativeDayOfMonth(0),
        data: [],
        maxTemp: '',
        minTemp: '',
        maxWindSpeed: ''
      }
    };

    for (let i = 0, obj = 0; i < state.foreCast.list.length; i++) {
      let day = +Component.getTimeFromEpoch(state.foreCast.list[i].dt, {
        day: '2-digit'
      });

      if (weeklyForecast[`fDay${obj}`].dayOfWeek === day) {
        weeklyForecast[`fDay${obj}`].data.push(state.foreCast.list[i]);
      } else {
        if (weeklyForecast[`fDay${++obj}`] === undefined) {
          weeklyForecast[`fDay${obj}`] = {
            dayOfWeek: this.relativeDayOfMonth(obj),
            data: [],
            maxTemp: '',
            minTemp: ''
          };
        }

        weeklyForecast[`fDay${obj}`].data.push(state.foreCast.list[i]);
      }
    }

    for (let key in weeklyForecast) {
      weeklyForecast[key].maxTemp = Math.round(
        this.defineMaxValue(weeklyForecast[key].data, 'main.temp')
      );
      weeklyForecast[key].minTemp = Math.round(
        this.defineMinValue(weeklyForecast[key].data, 'main.temp')
      );
      weeklyForecast[key].maxWindSpeed = Math.round(
        this.defineMaxValue(weeklyForecast[key].data, 'wind.speed')
      );
    }

    const dailyForecast = {
      fDayX: weeklyForecast.fDay0.data
    };

    this.updateState({
      currentWeather: currentWeather,
      dailyForecast: dailyForecast,
      weeklyForecast: weeklyForecast
    });
  }

  init() {
    [
      'updateMySelf',
      'defineMinValue',
      'defineMaxValue',
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
                props: this.state.currentWeather
              },
              {
                tag: WeatherForecastDaily,
                props: this.state.dailyForecast
              }
            ]
          },
          {
            tag: WeatherForecastWeekly,
            props: this.state.weeklyForecast
          }
        ]
      }
    ];

    return foreCast;
  }
}
