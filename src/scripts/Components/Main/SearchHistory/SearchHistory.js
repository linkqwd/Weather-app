import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('HISTORY', this.updateMySelf);
  }

  updateMySelf(state) {
    this.updateState(state);
    window.localStorage.setItem('history', JSON.stringify(this.state));
  }

  buildDomELements() {
    const domItems = Object.keys(this.state).map(item => {
      return {
        tag: 'li',
        classList: ['search-history__item'],

        children: [
          {
            tag: 'a',
            classList: ['search-history__link'],
            content: this.state[item].cityName,
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
            ]
          }
        ]
      };
    });

    return [...domItems];
  }

  chooseFavCity(e) {
    this.props.itemSearchCallById(e.target.id);
  }

  init() {
    ['updateMySelf', 'chooseFavCity'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    if (localStorage.getItem('history') !== null) {
      this.state = JSON.parse(localStorage.getItem('history'));
    }
  }

  render() {
    if (this.state === undefined || this.state === null)
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
              tag: 'p',
              content: '<i>Search history is empty</i>'
            }
          ]
        }
      ];

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
