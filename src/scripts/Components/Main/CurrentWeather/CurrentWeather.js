import Component from '../../../Framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
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
                content: 'London'
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
                props: { tValue: this.props.tValue, tUnit: this.props.tUnit }
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
                    classList: ['wind-data__arrow']
                  },
                  {
                    tag: 'span',
                    content: ` ${this.props.wSpeed} ${this.props.wUnit}`,
                    classList: ['wind-data__value']
                  }
                ]
              },
              {
                tag: 'div',
                classList: ['description-data', 'current-weather__weather-item'],
                children: [
                  {
                    tag: 'p',
                    content: `Pressure: <span>${this.props.pressure}</span>`,
                    classList: ['description-data__item']
                  },
                  {
                    tag: 'p',
                    content: `Humidity: <span>${this.props.humidity}</span>`,
                    classList: ['description-data__item']
                  },
                  {
                    tag: 'p',
                    content: `Sunrise: <span>${this.props.sunrise}</span>`,
                    classList: ['description-data__item']
                  },
                  {
                    tag: 'p',
                    content: `Sunset: <span>${this.props.sunset}</span>`,
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
