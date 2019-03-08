import Component from '../../../Framework/Component';
import { FavouriteLocations } from '../FavouriteLocations';
import { SearchHistory } from '../SearchHistory';

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
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
                    handler: this.handleClick
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
