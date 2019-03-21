import Component from '../../Framework/Component';
import logoImg from '../../../assets/logo.png';

export default class Header extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      {
        tag: 'header',
        classList: ['head', 'layout__header'],
        children: [
          {
            tag: 'a',
            classList: ['logo', 'head__logo'],
            children: [
              {
                tag: 'img',
                classList: ['logo__image'],
                attributes: [
                  {
                    name: 'src',
                    value: `${logoImg}`
                  },
                  {
                    name: 'alt',
                    value: 'logo'
                  }
                ]
              }
            ],
            attributes: [
              {
                name: 'href',
                value: '/'
              }
            ]
          },
          {
            tag: 'a',
            content: '<h1>Linky Weather</h1>',
            classList: 'head__title',
            attributes: [
              {
                name: 'href',
                value: '/'
              }
            ]
          },
          {
            tag: 'div',
            classList: ['current-date', 'head__date-wrapper'],
            children: [
              {
                tag: 'span',
                classList: ['current-date__dddd'],
                content: Component.getTimeFromEpoch(Date.now() / 1000, {
                  weekday: 'long'
                })
              },
              {
                tag: 'span',
                classList: ['current-date__dd'],
                content: Component.getTimeFromEpoch(Date.now() / 1000, {
                  day: 'numeric'
                })
              },
              {
                tag: 'span',
                classList: ['current-date__mmmm'],
                content: Component.getTimeFromEpoch(Date.now() / 1000, {
                  month: 'long'
                })
              }
            ]
          }
        ]
      }
    ];
  }
}
