import Component from './Framework/Component';
import AppState from './Framework/AppState';

export default class PreattyNumber extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('COUNT', this.updateMySelf);
  }

  init() {
    this.updateMySelf = this.updateMySelf.bind(this);
    this.state = {
      value: 3,
      quant: 3
    };
  }

  updateMySelf(state) {
    // transform response if needed
    this.updateState(state);
  }

  render() {
    return [
      {
        tag: 'span',
        content: this.state.value
      }
    ];
  }
}
