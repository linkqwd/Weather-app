import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class FavouriteBtn extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('FAVOURITE', this.updateMySelf);
  }

  checkIfCityIsfav() {
    const currentCity = document.querySelector('.current-weather__header');

    const itemsInLocalStorage = window.localStorage.getItem('favourite');

    const parsedItemsFromLocalStorage = JSON.parse(itemsInLocalStorage);

    if (
      parsedItemsFromLocalStorage === null ||
      parsedItemsFromLocalStorage[currentCity.id] === null ||
      parsedItemsFromLocalStorage[currentCity.id] === undefined
    ) {
      return;
    } else {
      const favBtn = document.querySelector('.favorite-btn');
      favBtn.classList.add('favorite-btn_active');
    }
  }

  updateMySelf(state) {
    this.state = Object.assign({}, this.state, state);
  }

  handleFavAction(e) {
    const currentCityName = document.querySelector('.current-weather__header');

    let result = {
      [currentCityName.id]: {
        cityName: currentCityName.innerHTML,
        id: currentCityName.id
      }
    };

    if (e.target.classList.contains('favorite-btn_active')) {
      e.target.classList.remove('favorite-btn_active');
      result = { [currentCityName.id]: null };
    } else {
      e.target.classList.add('favorite-btn_active');
    }

    AppState.update('FAVOURITE', result);
    window.localStorage.setItem('favourite', JSON.stringify(this.state));
  }

  init() {
    ['checkIfCityIsfav', 'updateMySelf', 'handleFavAction'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    if (localStorage.getItem('favourite') !== null) {
      this.state = JSON.parse(localStorage.getItem('favourite'));
    }
  }

  render() {
    return [
      {
        tag: 'button',
        classList: ['current-weather__favorite-btn', 'favorite-btn'],
        eventHandler: [
          {
            eventType: 'click',
            handler: this.handleFavAction
          }
        ],
        attributes: [
          {
            name: 'type',
            value: 'button'
          }
        ]
      }
    ];
  }
}
