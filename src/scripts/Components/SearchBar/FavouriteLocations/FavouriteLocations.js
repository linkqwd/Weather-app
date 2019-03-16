import Component from '../../../Framework/Component';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
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
            children: [
              {
                tag: 'li',
                content: 'London',
                classList: ['favorite-cities__item']
              },
              {
                tag: 'li',
                content: 'Kiev',
                classList: ['favorite-cities__item']
              }
            ]
          }
        ]
      }
    ];
  }
}
