import Component from '../../Framework/Component';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecastDaily } from './WeatherForecastDaily';
import { WeatherForecastWeekly } from './WeatherForecastWeekly';
import { WeatherDataService } from '../../Services';

export default class Main extends Component {
  constructor(host, props) {
    super(host, props);
  }

  getDataBeforeRender() {
    const result = WeatherDataService.getCurrentWeather();
    console.log(result);
    this._render();
  }

  render() {
    return [
      {
        tag: 'main',
        classList: ['layout__main'],
        children: [
          {
            tag: SearchBar,
            props: {}
          },
          {
            tag: 'div',
            classList: 'layout__today-wrapper',
            children: [
              {
                tag: CurrentWeather,
                props: {
                  tValue: '17',
                  tUnit: '&#8451;',
                  wSpeed: '4.45',
                  wUnit: 'km/h',
                  pressure: '0.99 atm',
                  humidity: '11%',
                  sunrise: '06:42',
                  sunset: '18:01'
                }
              },
              {
                tag: WeatherForecastDaily,
                props: {}
              }
            ]
          },
          {
            tag: WeatherForecastWeekly,
            props: {}
          }
        ]
      }
    ];
  }
}
