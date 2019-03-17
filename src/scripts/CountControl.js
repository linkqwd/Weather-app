import Component from './Framework/Component';
import AppState from './Framework/AppState';

export default class CountControls extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('COUNT', this.updateMySelf);
  }

  init() {
    ['increment', 'decrement', 'updateMySelf'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
    this.state = {
      value: 3,
      quant: 3
    };
  }

  updateMySelf(state) {
    // transform response if needed
    this.updateState(state);
  }

  increment() {
    console.log(this.state.value);
    console.log(this.state.quant);
    AppState.update('COUNT', {
      value: this.state.value * this.state.quant
    });
  }

  decrement() {
    AppState.update('COUNT', {
      value: this.state.value / this.state.quant
    });
  }

  render() {
    return [
      {
        tag: 'button',
        content: '-',
        eventHandler: [
          {
            eventType: 'click',
            handler: this.decrement
          }
        ]
      },
      {
        tag: 'button',
        content: '+',
        eventHandler: [
          {
            eventType: 'click',
            handler: this.increment
          }
        ]
      }
    ];
  }
}
