import Component from '../../Framework/Component';
import { FavouriteLocations } from './FavouriteLocations';
import { SearchHistory } from './SearchHistory';
import { WeatherDataService } from '../../Services';
import { AppState } from '../../Services';

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    ['handleMenuToggle', 'handleSearchClick', 'handleFormSubmit'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
  }

  handleSearchClick() {
    const searchInput = document.getElementById('search-input');
    WeatherDataService.getCurrentWeather(searchInput.value)
      .then(currentWeatherPromise => currentWeatherPromise)
      .then(currentWeatherPromise => {
        WeatherDataService.getWeatherForecast(searchInput.value).then(
          foreCastPromise => {
            AppState.update('SEARCH-RESULT', {
              currentWeather: currentWeatherPromise,
              foreCast: foreCastPromise
            });
          }
        );
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput.value) {
      this.handleSearchClick();
    } else {
      this.handleMenuToggle();
    }
  }

  handleMenuToggle() {
    const menu = document.getElementById('menu-option');
    menu.classList.toggle('search-menu__opened');
  }

  render() {
    return [
      {
        tag: 'form',
        classList: ['city-search'],
        eventHandler: [
          {
            eventType: 'submit',
            handler: this.handleFormSubmit
          }
        ],
        children: [
          {
            tag: 'div',
            classList: ['city-search__container'],
            children: [
              {
                tag: 'button',
                content: '&#9776;',
                classList: 'city-search__burger',
                attributes: [
                  {
                    name: 'type',
                    value: 'button'
                  }
                ],
                eventHandler: [
                  {
                    eventType: 'click',
                    handler: this.handleMenuToggle
                  }
                ]
              },
              {
                tag: 'input',
                classList: ['city-search__input'],
                attributes: [
                  {
                    name: 'placeholder',
                    value: 'Enter city name or coordinates'
                  },
                  {
                    name: 'name',
                    value: 'place-to-find'
                  },
                  {
                    name: 'type',
                    value: 'text'
                  },
                  {
                    name: 'id',
                    value: 'search-input'
                  },
                  {
                    name: 'value',
                    value: 'Kyiv, ua'
                  },
                  {
                    name: 'autocomplete',
                    value: 'off'
                  }
                ]
              },
              {
                tag: 'button',
                content: '',
                attributes: [
                  {
                    name: 'type',
                    value: 'button'
                  },
                  {
                    name: 'id',
                    value: 'search-submit'
                  }
                ],
                eventHandler: [
                  {
                    eventType: 'click',
                    handler: this.handleSearchClick
                  }
                ],
                classList: ['city-search__submit']
              }
            ]
          },
          {
            tag: 'div',
            classList: ['search-menu', 'city-search__menu', 'js-hidden'],
            attributes: [
              {
                name: 'id',
                value: 'menu-option'
              }
            ],
            children: [
              {
                tag: FavouriteLocations
              },
              {
                tag: SearchHistory
              }
            ]
          }
        ]
      }
    ];
  }
}
