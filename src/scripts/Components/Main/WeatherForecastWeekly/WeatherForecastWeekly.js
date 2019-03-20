import Component from '../../../Framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem';
import { AppState } from '../../../Services';

export default class WeatherForecastWeekly extends Component {
  constructor(host, props) {
    super(host, props);
  }

  chooseWeatherDay(e) {
    const element = e.target.closest('.forecast-weekly__item');
    const elementValue = element.id;

    AppState.update('WEEKLY-FORECAST', this.props[`${elementValue}`]);
  }

  init() {
    ['chooseWeatherDay'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
  }

  render() {
    console.log(this.props);
    return [
      {
        tag: 'div',
        classList: ['forecast-weekly', 'layout__weekly-forecast'],
        children: [
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            eventHandler: [
              {
                eventType: 'click',
                handler: this.chooseWeatherDay
              }
            ],
            attributes: [
              {
                name: 'id',
                value: 'fDay0'
              }
            ],
            children: [
              {
                tag: 'p',
                content: `<i>Today: </i> ${Component.getTimeFromEpoch(
                  this.props.fDay0.currentWeather.dt,
                  {
                    weekday: 'long'
                  }
                )}`,
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.fDay0.currentWeather.tValue + '',
                  tValueMin: this.props.fDay0.currentWeather.tMinValue + '',
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            eventHandler: [
              {
                eventType: 'click',
                handler: this.chooseWeatherDay
              }
            ],
            attributes: [
              {
                name: 'id',
                value: 'fDay1'
              }
            ],
            children: [
              {
                tag: 'p',
                content: Component.getTimeFromEpoch(
                  this.props.fDay1.data[0].dt,
                  {
                    weekday: 'long'
                  }
                ),
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.fDay1.maxTemp + '',
                  tValueMin: this.props.fDay1.minTemp + '',
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            eventHandler: [
              {
                eventType: 'click',
                handler: this.chooseWeatherDay
              }
            ],
            attributes: [
              {
                name: 'id',
                value: 'fDay2'
              }
            ],
            children: [
              {
                tag: 'p',
                content: Component.getTimeFromEpoch(
                  this.props.fDay2.data[0].dt,
                  {
                    weekday: 'long'
                  }
                ),
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.fDay2.maxTemp + '',
                  tValueMin: this.props.fDay2.minTemp + '',
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            eventHandler: [
              {
                eventType: 'click',
                handler: this.chooseWeatherDay
              }
            ],
            attributes: [
              {
                name: 'id',
                value: 'fDay3'
              }
            ],
            children: [
              {
                tag: 'p',
                content: Component.getTimeFromEpoch(
                  this.props.fDay3.data[0].dt,
                  {
                    weekday: 'long'
                  }
                ),
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.fDay3.maxTemp + '',
                  tValueMin: this.props.fDay3.minTemp + '',
                  tUnit: '&deg;',
                  valueSmall: true
                }
              }
            ]
          },
          {
            tag: 'div',
            classList: 'forecast-weekly__item',
            eventHandler: [
              {
                eventType: 'click',
                handler: this.chooseWeatherDay
              }
            ],
            attributes: [
              {
                name: 'id',
                value: 'fDay4'
              }
            ],
            children: [
              {
                tag: 'p',
                content: Component.getTimeFromEpoch(
                  this.props.fDay4.data[0].dt,
                  {
                    weekday: 'long'
                  }
                ),
                classList: ['forecast-weekly__date']
              },
              {
                tag: WeatherForecastItem,
                props: {
                  tValue: this.props.fDay4.maxTemp + '',
                  tValueMin: this.props.fDay4.minTemp + '',
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
