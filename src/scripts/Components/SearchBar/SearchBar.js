import Component from '../../Framework/Component';
import { FavouriteLocations } from '../main/FavouriteLocations';
import { SearchHistory } from '../main/SearchHistory';
import { WeatherDataService } from '../../Services';

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
  }

  bindBeforeRender() {
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit() {
    const searchInput = document.getElementById('search-input');
    const searchSubmitBtn = document.getElementById('search-submit');
    const searchResult = WeatherDataService.getCurrentWeather(
      searchInput.value
    );
  }

  handleMenuToggle(e) {
    const menu = document.getElementById('menu-option');
    menu.classList.toggle('search-menu__opened');
  }

  render() {
    return [
      {
        tag: 'form',
        classList: ['city-search'],
        attributes: [
          {
            name: 'method',
            value: 'GET'
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
                eventHandler: [
                  {
                    eventType: 'click',
                    handler: this.handleMenuToggle
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
                  }
                ]
              },
              {
                tag: 'button',
                content: '&#x1F50D;',
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
                    handler: this.handleSearchSubmit
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
