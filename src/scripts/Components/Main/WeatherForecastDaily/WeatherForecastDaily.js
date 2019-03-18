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
                content: this.props.time1
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.tValue1,
                  tUnit: '&deg;',
                  iconSmall: true,
                  valueSmall: true
                }
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
                content: this.props.time2
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.tValue2,
                  tUnit: '&deg;',
                  iconSmall: true,
                  valueSmall: true
                }
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
                content: this.props.time3
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.tValue3,
                  tUnit: '&deg;',
                  iconSmall: true,
                  valueSmall: true
                }
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
                content: this.props.time4
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.tValue4,
                  tUnit: '&deg;',
                  iconSmall: true,
                  valueSmall: true
                }
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
                content: this.props.time5
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.tValue5,
                  tUnit: '&deg;',
                  iconSmall: true,
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
