import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('FAVOURITE', this.updateMySelf);
  }

  updateMySelf(state) {
    this.updateState(state);
  }

  chooseFavCity(e) {
    this.props.itemSearchCallById(
      e.target.closest('.favorite-cities__item').id
    );
  }

  buildFavDomItems() {
    const domItems = Object.keys(this.state)
      .filter(item => {
        return this.state[item] !== null ? true : false;
      })
      .map(item => {
        return {
          tag: 'li',
          classList: ['favorite-cities__item'],
          eventHandler: [
            {
              eventType: 'click',
              handler: this.chooseFavCity
            }
          ],
          attributes: [
            {
              name: 'id',
              value: this.state[item].id
            }
          ],
          children: [
            {
              tag: 'a',
              classList: ['favorite-cities__link'],
              content: this.state[item].cityName
            }
          ]
        };
      });

    return [...domItems];
  }

  init() {
    ['updateMySelf', 'chooseFavCity'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    const favListFromLocalStorage = {};
    for (var key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        favListFromLocalStorage[key.slice(1, -1)] = JSON.parse(
          window.localStorage[key]
        );
      }
    }

    this.state = favListFromLocalStorage;
  }

  render() {
    if (
      Object.keys(this.state).length === 0 &&
      this.state.constructor === Object
    ) {
      return [];
    }

    return [
      {
        tag: 'section',
        classList: ['favorite-cities'],
        children: [
          {
            tag: 'h3',
            content: 'Favourite Cities',
            classList: ['favorite-cities__header']
          },
          {
            tag: 'ul',
            classList: ['favorite-cities__list'],
            children: this.buildFavDomItems()
          }
        ]
      }
    ];
  }
}
