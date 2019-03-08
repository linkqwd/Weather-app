import Component from '../../Framework/Component';
import { Header } from '../Header';
import { Main } from '../Main';

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
        tag: Main
      }
    ];
  }
}
