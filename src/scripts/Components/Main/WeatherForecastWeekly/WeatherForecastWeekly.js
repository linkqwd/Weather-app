import Component from '../../../Framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem';

export default class WeatherForecastWeekly extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      {
        tag: 'div',
        classList: ['forecast-weekly', 'layout__weekly-forecast'],
        children: [
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            children: [
              {
                tag: 'p',
                content: 'Tomorrow',
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: 1,
                  tValueMin: -2,
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            children: [
              {
                tag: 'p',
                content: 'Tuesday',
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: 4,
                  tValueMin: -2,
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            children: [
              {
                tag: 'p',
                content: 'Wednesday',
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: 1,
                  tValueMin: -2,
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            children: [
              {
                tag: 'p',
                content: 'Thursday',
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: 1,
                  tValueMin: -2,
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            children: [
              {
                tag: 'p',
                content: 'Friday',
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: 1,
                  tValueMin: -2,
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          }
        ]
      }
    ];
  }
}
