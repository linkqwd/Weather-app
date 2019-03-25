import Component from '../../../Framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem';
import { AppState } from '../../../Services';

export default class WeatherForecastDaily extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('WEEKLY-FORECAST', this.updateMySelf);
  }

  updateMySelf(state) {
    const newState = {
      fDayX: state.data
    };

    this.updateState(newState);
  }

  buildHtmlElements() {
    const dailyItemsArray = this.state.fDayX.map(item => {
      let graphicValue =
        Math.round(item.main.temp) * 2 + 40 >= 1
          ? Math.round(item.main.temp) * 2 + 40
          : 3;

      return {
        tag: 'div',
        classList: ['forecast-daily__item'],
        children: [
          {
            tag: WeatherForecastItem,
            props: {
              tValue: Math.round(item.main.temp),
              tUnit: '&deg;',
              icon: item.weather[0].icon,
              iconSmall: true,
              valueSmall: true
            }
          },
          {
            tag: 'p',
            classList: ['forecast-daily__time'],
            content: Component.getTimeFromEpoch(item.dt, {
              hour: 'numeric',
              minute: 'numeric'
            })
          },
          {
            tag: 'div',
            classList: [
              'forecast-daily__graphic',
              `forecast-daily__graphic_height_${graphicValue}`
            ]
          }
        ]
      };
    });

    return [...dailyItemsArray];
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
        classList: ['forecast-daily', 'layout__daily-forecast'],
        children: this.buildHtmlElements()
      }
    ];
  }
}
