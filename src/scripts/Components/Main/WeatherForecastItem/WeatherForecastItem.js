import Component from '../../../Framework/Component';

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    const visualClsIcon = ['tempreture-data__icon'];
    const visualClsValue = ['tempreture-data__value'];

    if (this.props.small) {
      visualClsIcon.push('tempreture-data__icon_size_small');
      visualClsValue.push('tempreture-data__value_size_small');
    }

    const dataItem = {
      tag: 'div',
      classList: ['tempreture-data'],
      children: [
        {
          tag: 'span',
          classList: [...visualClsIcon]
        },
        {
          tag: 'span',
          content: `${this.props.tValue}`,
          classList: [...visualClsValue]
        },
        {
          tag: 'span',
          content: `${this.props.tUnit}`,
          classList: ['tempreture-data__degrees']
        }
      ]
    };

    if (this.props.tValueMin) {
      dataItem.children.push({
        tag: 'span',
        content: this.props.tValueMin,
        classList: [...visualClsValue]
      });

      dataItem.children.push({
        tag: 'span',
        content: `${this.props.tUnit}`,
        classList: ['tempreture-data__degrees']
      });
    }

    return [dataItem];
  }
}
