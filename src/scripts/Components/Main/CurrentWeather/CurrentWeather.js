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
          : `${state.data[0].main.humidity}%`
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
    console.log(this.state);

    return [
      {
        tag: 'div',
        classList: ['current-weather'],
        children: [
          {
            tag: 'div',
            classList: 'current-weather__head-wrap',
            children: [
              {
                tag: 'h2',
                classList: 'current-weather__header',
                content: this.state.city
              },
              {
                tag: 'button',
                content: '&#9734;',
                classList: 'current-weather__favorite-btn',
                attributes: [
                  {
                    name: 'type',
                    value: 'button'
                  }
                ]
              }
            ]
          },
          {
            tag: 'p',
            classList: 'current-weather__day',
            content: 'Today'
          },
          {
            tag: 'p',
            classList: 'current-weather__weather-type',
            content: 'Light snow'
          },
          {
            tag: 'div',
            classList: ['current-weather__weather-info'],
            children: [
              {
                tag: WeatherForecastItem,
                props: { tValue: this.state.tValue, tUnit: this.state.tUnit }
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
                        value: `transform: rotate(${this.state.wDeg - 45}deg)`
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
                    classList: ['description-data__item']
                  },
                  {
                    tag: 'p',
                    content: `Humidity: <span>${this.state.humidity}</span>`,
                    classList: ['description-data__item']
                  },
                  {
                    tag: 'p',
                    content: `Sunrise: <span>${Component.getTimeFromEpoch(
                      this.state.sunrise,
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                      }
                    )}</span>`,
                    classList: ['description-data__item']
                  },
                  {
                    tag: 'p',
                    content: `Sunset: <span>${Component.getTimeFromEpoch(
                      this.state.sunset,
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                      }
                    )}</span>`,
                    classList: ['description-data__item']
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
