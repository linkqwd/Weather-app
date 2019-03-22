import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class FavouriteBtn extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('FAVOURITE', this.updateMySelf);
  }

  checkIfCityIsfav() {
    setTimeout(() => {
      const currentCityName = document.querySelector(
        '.current-weather__header'
      );

      console.log(this.state[currentCityName.id]);
    }, 100);
  }

  updateMySelf(state) {
    this.updateState(state);
  }

  handleFavAdd(e) {
    console.log(e);
    e.target.classList.toggle('favorite-btn_active');
    const currentCityName = document.querySelector('.current-weather__header');

    const result = {
      [currentCityName.id]: {
        cityName: currentCityName.innerHTML,
        id: currentCityName.id
      }
    };

    window.localStorage.setItem(
      JSON.stringify(currentCityName.id),
      JSON.stringify({
        cityName: currentCityName.innerHTML,
        id: currentCityName.id
      })
    );

    AppState.update('FAVOURITE', result);
  }

  init() {
    ['handleFavAdd', 'checkIfCityIsfav', 'updateMySelf'].forEach(
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
            handler: this.handleFavAdd
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
