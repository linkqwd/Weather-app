import Component from '../../../Framework/Component';
import { AppState } from '../../../Services';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('FAVOURITE', this.updateMySelf);
  }

  updateMySelf(state) {
    this.updateState(state);
  }

  chooseFavCity(e) {
    this.props.itemSearchCallById(e.target.id);
  }

  buildFavDomItems() {
    const domItems = Object.keys(this.state)
      .filter(item => {
        return this.state[item] !== null ? true : false;
      })
      .map(item => {
        return {
          tag: 'li',
          classList: ['favorite-cities__item'],
          children: [
            {
              tag: 'a',
              classList: ['favorite-cities__link'],
              content: this.state[item].cityName,
              attributes: [
                {
                  name: 'id',
                  value: this.state[item].id
                },
                {
                  name: 'href',
                  value: '#'
                }
              ],
              eventHandler: [
                {
                  eventType: 'click',
                  handler: this.chooseFavCity
                }
              ]
            }
          ]
        };
      });

    return [...domItems];
  }

  init() {
    ['updateMySelf', 'chooseFavCity'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    if (localStorage.getItem('favourite') !== null) {
      this.state = JSON.parse(localStorage.getItem('favourite'));
    }
  }

  render() {
    if (this.state === undefined || this.state === null) {
      return [
        {
          tag: 'section',
          classList: ['favorite-cities'],
          children: [
            {
              tag: 'h3',
              content: 'Favourite Cities',
              classList: ['search-history__header']
            },
            {
              tag: 'p',
              content: '<i>Favourite list is empty</i>'
            }
          ]
        }
      ];
    }

    return [
      {
        tag: 'section',
        classList: ['favorite-cities'],
        children: [
          {
            tag: 'h3',
            content: 'Favourite Cities',
            classList: ['favorite-cities__header']
          },
          {
            tag: 'ul',
            classList: ['favorite-cities__list'],
            children: this.buildFavDomItems()
          }
        ]
      }
    ];
  }
}
