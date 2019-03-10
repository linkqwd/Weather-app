import Component from '../../../../Framework/Component';

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
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
            children: [
              {
                tag: 'li',
                content: 'Odessa',
                classList: ['search-history__item']
              },
              {
                tag: 'li',
                content: 'Gamburg',
                classList: ['search-history__item']
              }
            ]
          }
        ]
      }
    ];
  }
}
