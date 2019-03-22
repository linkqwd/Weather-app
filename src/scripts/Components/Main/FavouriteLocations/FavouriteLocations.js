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
    this.props.favItemSearchCall(e.target.id);
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
    )
      return [];

    const domItems = [];

    Object.keys(this.state).forEach(item => {
      domItems.push({
        tag: 'li',
        content: this.state[item].cityName,
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
        ]
      });
    });

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
            children: [...domItems]
          }
        ]
      }
    ];
  }
}
