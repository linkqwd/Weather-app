import Component from '../../../Framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem';
import { AppState } from '../../../Services';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('WEEKLY-FORECAST', this.updateMySelf);
  }

  updateMySelf(state) {
    const newState = {
      tValue:
        'currentWeather' in state ? state.currentWeather.tValue : state.maxTemp,

      wSpeed:
        'currentWeather' in state
          ? state.currentWeather.wSpeed
          : state.maxWindSpeed,

      wDeg:
        'currentWeather' in state
          ? state.currentWeather.wDeg
          : state.data[0].wind.deg,

      pressure:
        'currentWeather' in state
          ? state.currentWeather.pressure
          : Math.round(state.data[0].main.pressure),

      humidity:
        'currentWeather' in state
          ? state.currentWeather.humidity
          : `${state.data[0].main.humidity}%`,

      dt:
        'currentWeather' in state
          ? state.currentWeather.dt
          : Component.getTimeFromEpoch(state.data[0].dt, { weekday: 'long' }),

      descr:
        'currentWeather' in state ? state.currentWeather.descr : state.descr,
      icon: 'currentWeather' in state ? state.currentWeather.icon : state.icon,

      sunrise: Component.getTimeFromEpoch(state.sunrise),
      sunset: Component.getTimeFromEpoch(state.sunset)
    };

    this.updateState(newState);
  }

  init() {
    ['updateMySelf'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    this.state = this.props;
  }

  render() {
    return [
      {
        tag: 'div',
        classList: ['current-weather'],
        children: [
          {
            tag: 'p',
            classList: 'current-weather__day',
            content: this.state.dt
          },
          {
            tag: 'p',
            classList: 'current-weather__weather-type',
            content: this.state.descr
          },
          {
            tag: 'div',
            classList: ['current-weather__weather-info'],
            children: [
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.state.tValue,
                  tUnit: this.state.tUnit,
                  icon: this.state.icon
                }
              },
              {
                tag: 'div',
                classList: ['wind-data', 'current-weather__weather-item'],
                children: [
                  {
                    tag: 'span',
                    classList: ['wind-data__icon']
                  },
                  {
                    tag: 'span',
                    classList: ['wind-data__arrow'],
                    attributes: [
                      {
                        name: 'style',
                        value: `transform: rotate(${this.state.wDeg - 190}deg)`
                      }
                    ]
                  },
                  {
                    tag: 'span',
                    content: ` ${this.state.wSpeed} ${this.state.wUnit}`,
                    classList: ['wind-data__value']
                  }
                ]
              },
              {
                tag: 'div',
                classList: [
                  'description-data',
                  'current-weather__weather-item'
                ],
                children: [
                  {
                    tag: 'p',
                    content: `Pressure: <span>${this.state.pressure}</span>`,
                    classList: [
                      'description-data__item',
                      'description-data__icon_pressure'
                    ]
                  },
                  {
                    tag: 'p',
                    content: `Humidity: <span>${this.state.humidity}</span>`,
                    classList: [
                      'description-data__item',
                      'description-data__icon_humidity'
                    ]
                  },
                  {
                    tag: 'p',
                    content: `Sunrise: <span>${this.state.sunrise}</span>`,
                    classList: [
                      'description-data__item',
                      'description-data__icon_sunrise'
                    ]
                  },
                  {
                    tag: 'p',
                    content: `Sunset: <span>${this.state.sunset}</span>`,
                    classList: [
                      'description-data__item',
                      'description-data__icon_sunset'
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
  }
}
