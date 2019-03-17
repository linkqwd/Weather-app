import Component from './Framework/Component';
import CountControls from './CountControl';
import PreattyNumber from './PreattyNumber';

export default class App extends Component {
  constructor(host) {
    super(host);
  }

  init() {}

  render() {
    const application = [
      {
        tag: CountControls
      },
      {
        tag: PreattyNumber
      }
    ];

    return application;
  }
}
