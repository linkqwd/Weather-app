import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class FavouriteBtn extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('FAVOURITE', this.updateMySelf);
  }

  checkIfCityIsfav() {
    setTimeout(() => {
      const currentCity = document.querySelector('.current-weather__header');

      const currentItemInLocalStorage = window.localStorage.getItem(
        JSON.stringify(currentCity.id)
      );

      if (currentItemInLocalStorage === null) return;

      if (JSON.parse(currentItemInLocalStorage).id === currentCity.id) {
        const favBtn = document.querySelector('.favorite-btn');
        favBtn.classList.add('favorite-btn_active');
      }
    }, 0);
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
      window.localStorage.removeItem(JSON.stringify(currentCityName.id));

      result = {
        [currentCityName.id]: null
      };
    } else {
      e.target.classList.add('favorite-btn_active');
      window.localStorage.setItem(
        JSON.stringify(currentCityName.id),
        JSON.stringify({
          cityName: currentCityName.innerHTML,
          id: currentCityName.id
        })
      );
    }

    AppState.update('FAVOURITE', result);
  }

  init() {
    ['checkIfCityIsfav', 'updateMySelf'].forEach(
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
    this.checkIfCityIsfav();
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
