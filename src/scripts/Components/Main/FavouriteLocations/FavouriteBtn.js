import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class FavouriteBtn extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('FAVOURITE', this.updateMySelf);
  }

  init() {
    ['updateMySelf', 'handleFavAction'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    if (localStorage.getItem('favourite') !== null) {
      this.state = JSON.parse(localStorage.getItem('favourite'));
    }
  }

  updateMySelf(state) {
    console.log('fav updating');
    this.updateState(state);
  }

  handleFavAction(e) {
    const currentCity = document.querySelector('.current-weather__header');
    const favButton = e.target;

    let result = {
      [currentCity.id]: {
        cityName: currentCity.innerHTML,
        id: currentCity.id
      }
    };

    if (favButton.classList.contains('favorite-btn_active')) {
      favButton.classList.remove('favorite-btn_active');
      result = { [currentCity.id]: null };
    } else {
      favButton.classList.add('favorite-btn_active');
    }

    AppState.update('FAVOURITE', result);
    window.localStorage.setItem('favourite', JSON.stringify(this.state));
  }

  checkIfCityIsFavourite() {
    const renderedCity = document.querySelector('.current-weather__header');

    const favItemsFromLocalStorage = JSON.parse(
      window.localStorage.getItem('favourite')
    );

    if (favItemsFromLocalStorage[renderedCity.id]) {
      const favBtn = document.querySelector('.favorite-btn');
      favBtn.classList.add('favorite-btn_active');
    }
  }

  componentHasRendered() {
    setTimeout(() => {
      this.checkIfCityIsFavourite();
    }, 0);
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
