import Component from '../../Framework/Component';
import { FavouriteLocations } from '../Main/FavouriteLocations';
import { SearchHistory } from '../Main/SearchHistory';
import { WeatherDataService } from '../../Services';
import { AppState } from '../../Services';

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
  }

  handleSearchClick() {
    const searchInput = document.getElementById('search-input');

    WeatherDataService.getCurrentWeather(searchInput.value).then(
      currentWeatherPromise => {
        WeatherDataService.getWeatherForecast(searchInput.value)
          .then(foreCastPromise => {
            if (foreCastPromise.cod === '404') {
              throw `Error: ${foreCastPromise.cod}, city <strong>${
                searchInput.value
              }</strong> not found`;
            } else {
              const errPopUp = document.getElementById('error-pop-up');
              errPopUp.classList.remove('city-search__error-pop-up_active');
            }

            AppState.update('SEARCH-RESULT', {
              currentWeather: currentWeatherPromise,
              foreCast: foreCastPromise
            });

            AppState.update('HISTORY', {
              [currentWeatherPromise.id]: {
                cityName: `${currentWeatherPromise.name}, ${
                  currentWeatherPromise.sys.country
                }`,
                cityId: currentWeatherPromise.id
              }
            });
          })
          .catch(error => {
            const errPopUp = document.getElementById('error-pop-up');
            errPopUp.classList.add('city-search__error-pop-up_active');
            errPopUp.innerHTML = error;

            setTimeout(() => {
              errPopUp.classList.remove('city-search__error-pop-up_active');
            }, 5500);
          });
      }
    );
  }

  itemSearchCallById(id) {
    WeatherDataService.getCurrentWeatherById(id)
      .then(currentWeatherPromise => {
        WeatherDataService.getWeatherForecastById(id).then(foreCastPromise => {
          if (foreCastPromise.cod === '404') {
            throw `Error: ${foreCastPromise.cod}, city <strong>${
              searchInput.value
            }</strong> not found`;
          } else {
            const errPopUp = document.getElementById('error-pop-up');
            errPopUp.classList.remove('city-search__error-pop-up_active');
          }

          AppState.update('SEARCH-RESULT', {
            currentWeather: currentWeatherPromise,
            foreCast: foreCastPromise
          });
        });
      })
      .catch(error => {
        const errPopUp = document.getElementById('error-pop-up');
        errPopUp.classList.add('city-search__error-pop-up_active');
        errPopUp.innerHTML = error;
      });
    this.handleMenuToggle();
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
    const milk = document.querySelector('.city-search__milk');
    milk.classList.toggle('city-search__milk_clickable');
    menu.classList.toggle('search-menu__opened');
  }

  handleMenuClick() {
    this.handleMenuToggle();
  }

  handleMilkClick() {
    this.handleMenuToggle();
  }

  init() {
    [
      'handleSearchClick',
      'handleFormSubmit',
      'itemSearchCallById',
      'handleMenuClick',
      'handleMilkClick'
    ].forEach(methodName => (this[methodName] = this[methodName].bind(this)));
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
            classList: ['city-search__milk'],
            eventHandler: [
              {
                eventType: 'click',
                handler: this.handleMilkClick
              }
            ]
          },
          {
            tag: 'div',
            classList: ['city-search__error-pop-up'],
            attributes: [
              {
                name: 'id',
                value: 'error-pop-up'
              }
            ]
          },
          {
            tag: 'div',
            classList: ['city-search__container'],
            children: [
              {
                tag: 'button',
                content: '&#9776;',
                classList: 'city-search__burger',
                eventHandler: [
                  {
                    eventType: 'click',
                    handler: this.handleMenuClick
                  }
                ],
                attributes: [
                  {
                    name: 'type',
                    value: 'button'
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
                    value: 'Kiev'
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
                tag: FavouriteLocations,
                props: { itemSearchCallById: this.itemSearchCallById }
              },
              {
                tag: SearchHistory,
                props: { itemSearchCallById: this.itemSearchCallById }
              }
            ]
          }
        ]
      }
    ];
  }
}
