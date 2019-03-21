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

    const domElements = Object.keys(this.props).map(item => {
      if (item === 'fDay0')
        return {
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
              value: `${[item]}`
            }
          ],
          children: [
            {
              tag: 'p',
              content: this.props.fDay0.currentWeather.dt,
              classList: ['forecast-weekly__date']
            },
            {
              tag: WeatherForecastItem,
              props: {
                tValue: this.props.fDay0.currentWeather.tValue + '',
                tValueMin: this.props.fDay0.currentWeather.tValue + '',
                icon: this.props.fDay0.currentWeather.icon,
                tUnit: '&deg;',
                valueSmall: true
              }
            }
          ]
        };

      return {
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
            value: `${[item]}`
          }
        ],
        children: [
          {
            tag: 'p',
            content: Component.getTimeFromEpoch(this.props[item].data[0].dt, {
              weekday: 'long'
            }),
            classList: ['forecast-weekly__date']
          },
          {
            tag: WeatherForecastItem,
            props: {
              tValue: this.props[item].maxTemp + '',
              tValueMin: this.props[item].minTemp + '',
              icon: this.props[item].data[5].weather[0].icon,
              tUnit: '&deg;',
              valueSmall: true
            }
          }
        ]
      };
    });

    return [
      {
        tag: 'div',
        classList: ['forecast-weekly', 'layout__weekly-forecast'],
        children: [...domElements]
      }
    ];
  }
}
