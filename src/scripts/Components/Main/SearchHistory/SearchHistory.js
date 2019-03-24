import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('HISTORY', this.updateMySelf);
  }

  updateMySelf(state) {
    this.updateState(state);
    console.log(this.state);
    window.localStorage.setItem('History', JSON.stringify(this.state));
  }

  buildDomELements() {
    const domItems = Object.keys(this.state).map(item => {
      console.log(item);
      return {
        tag: 'li',
        classList: ['search-history__item'],
        eventHandler: [
          {
            eventType: 'click',
            handler: this.chooseFavCity
          }
        ],
        attributes: [
          {
            name: 'id',
            value: item
          }
        ],
        children: [
          {
            tag: 'a',
            classList: ['search-history__link'],
            content: this.state[item].cityName
          }
        ]
      };
    });

    return [...domItems];
  }

  chooseFavCity(e) {
    this.props.itemSearchCallById(e.target.closest('.search-history__item').id);
  }

  init() {
    ['updateMySelf', 'chooseFavCity'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    this.state = JSON.parse(localStorage.getItem('History'));
  }

  render() {
    if (this.state === undefined) return [];

    return [
      {
        tag: 'section',
        classList: ['search-history'],
        children: [
          {
            tag: 'h3',
            content: 'Search history',
            classList: ['search-history__header']
          },
          {
            tag: 'ul',
            classList: ['search-history__list'],
            children: this.buildDomELements()
          }
        ]
      }
    ];
  }
}
