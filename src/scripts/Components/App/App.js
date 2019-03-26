import Component from '../../Framework/Component';
import { Header } from '../Header';
import { Main } from '../Main';
import { SearchBar } from '../SearchBar';

export default class App extends Component {
  constructor(host) {
    super(host);
  }

  handleMenuOpenClose() {
    const body = document.getElementById('app');

    body.addEventListener('click', e => {
      const menu = document.getElementById('menu-option');

      if (e.target.matches('.city-search__burger')) {
        menu.classList.toggle('search-menu__opened');
      } else if (e.target.matches('.layout')) {
        menu.classList.remove('search-menu__opened');
      }
    });
  }

  render() {
    const application = [
      {
        tag: Header
      },
      {
        tag: SearchBar
      },
      {
        tag: Main
      }
    ];

    this.handleMenuOpenClose();

    return application;
  }
}
