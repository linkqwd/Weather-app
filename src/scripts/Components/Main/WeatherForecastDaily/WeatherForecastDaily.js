import Component from '../../../Framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem';

export default class WeatherForecastDaily extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      {
        tag: 'div',
        classList: ['forecast-daily', 'layout__daily-forecast'],
        children: [
          {
            tag: 'div',
            classList: ['forecast-daily__item'],
            children: [
              {
                tag: 'p',
                classList: ['forecast-daily__time'],
                content: '15:00'
              },
              {
                tag: WeatherForecastItem,
                props: { tValue: '1', tUnit: '&deg;', small: true }
              }
            ]
          },
          {
            tag: 'div',
            classList: ['forecast-daily__item'],
            children: [
              {
                tag: 'p',
                classList: ['forecast-daily__time'],
                content: '21:00'
              },
              {
                tag: WeatherForecastItem,
                props: { tValue: '1', tUnit: '&deg;', small: true }
              }
            ]
          },
          {
            tag: 'div',
            classList: ['forecast-daily__item'],
            children: [
              {
                tag: 'p',
                classList: ['forecast-daily__time'],
                content: '00:00'
              },
              {
                tag: WeatherForecastItem,
                props: { tValue: '1', tUnit: '&deg;', small: true }
              }
            ]
          },
          {
            tag: 'div',
            classList: ['forecast-daily__item'],
            children: [
              {
                tag: 'p',
                classList: ['forecast-daily__time'],
                content: '03:00'
              },
              {
                tag: WeatherForecastItem,
                props: { tValue: '1', tUnit: '&deg;', small: true }
              }
            ]
          }
        ]
      }
    ];
  }
}
