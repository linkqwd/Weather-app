import Component from '../../Framework/Component';
import { Header } from '../Header';
import { Main } from '../Main';
import { SearchBar } from '../SearchBar';

export default class App extends Component {
  constructor(host) {
    super(host);
  }

  render() {
    return [
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
  }
}
