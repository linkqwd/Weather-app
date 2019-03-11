import Component from '../../Framework/Component';
import { Header } from '../Header';
import { Main } from '../Main';
import { SearchBar } from '../SearchBar';

export default class App extends Component {
  constructor(host) {
    super(host);
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
        tag: Main,
        props: {
          tValue: 7
        }
      }
    ];

    return application;
  }
}
