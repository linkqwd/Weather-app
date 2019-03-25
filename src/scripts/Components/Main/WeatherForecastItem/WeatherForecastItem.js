import Component from '../../../Framework/Component';
import AppState from '../../../Services/AppState';

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('UNITS', this.updateMySelf);
  }

  calculateTofahrenheit(value) {
    return Math.round(value * (9 / 5) + 32);
  }

  updateMySelf(state) {
    window.localStorage.setItem('units', JSON.stringify(state.currentUnit));
    this.updateState(state);
  }

  handleUnitsToggle(e) {
    const currentElement = e.target;
    currentElement.classList.add('tempreture-data__unit-active');

    if (currentElement.classList.contains('tempreture-data__unit-f')) {
      const oldUnitElement = document.querySelector('.tempreture-data__unit-c');
      oldUnitElement.classList.remove('tempreture-data__unit-active');
      AppState.update('UNITS', {
        currentUnit: 'fahrenheit'
      });
    }

    if (currentElement.classList.contains('tempreture-data__unit-c')) {
      const oldUnitElement = document.querySelector('.tempreture-data__unit-f');
      oldUnitElement.classList.remove('tempreture-data__unit-active');
      AppState.update('UNITS', {
        currentUnit: 'celsius'
      });
    }
  }

  buildHtmlElement() {
    const visualClsIcon = ['tempreture-data__icon'];
    const visualClsValue = ['tempreture-data__value'];

    if (this.state.tUnitToggle) {
      const unitFar = `<span class="tempreture-data__unit-c ${
        this.state.currentUnit === 'celsius'
          ? 'tempreture-data__unit-active'
          : ''
      }">${this.state.tUnitCel}</span>`;
      const unitCel = `<span class="tempreture-data__unit-f ${
        this.state.currentUnit === 'fahrenheit'
          ? 'tempreture-data__unit-active'
          : ''
      }">${this.state.tUnitFar}</span>`;

      this.state.tUnit = `${unitFar} | ${unitCel}`;
    }

    if (this.state.valueSmall)
      visualClsValue.push('tempreture-data__value_size_small');

    if (this.state.iconSmall)
      visualClsIcon.push('tempreture-data__icon_size_small');

    const dataItem = {
      tag: 'div',
      classList: ['tempreture-data'],
      children: [
        {
          tag: 'span',
          classList: [...visualClsIcon, `weather-icon_${this.state.icon}`]
        },
        {
          tag: 'span',
          content: this.state[`${this.state.currentUnit}Temprature`],
          classList: [...visualClsValue]
        },
        {
          tag: 'span',
          content: `${this.state.tUnit}`,
          classList: ['tempreture-data__degrees'],
          eventHandler: [
            {
              eventType: 'click',
              handler: this.handleUnitsToggle
            }
          ]
        }
      ]
    };

    if (this.state.tValueMin !== undefined) {
      dataItem.children.push({
        tag: 'span',
        content: this.state[`${this.state.currentUnit}MinTemprature`],
        classList: [...visualClsValue, 'tempreture-data__value_type_min']
      });

      dataItem.children.push({
        tag: 'span',
        content: `${this.state.tUnit}`,
        classList: ['tempreture-data__degrees']
      });
    }

    return [dataItem];
  }

  init() {
    ['handleUnitsToggle', 'updateMySelf', 'calculateTofahrenheit'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
    this.state = this.props;
    this.state.celsiusTemprature = this.props.tValue + '';
    this.state.fahrenheitTemprature = this.calculateTofahrenheit(
      this.props.tValue
    );
    this.state.celsiusMinTemprature = this.props.tValueMin + '';
    this.state.fahrenheitMinTemprature = this.calculateTofahrenheit(
      this.props.tValueMin
    );

    this.state.tUnit = '&deg;';
    this.state.tUnitCel = '&#8451;';
    this.state.tUnitFar = '&#8457;';

    if (localStorage.getItem('units') !== null) {
      this.state.currentUnit = JSON.parse(localStorage.getItem('units'));
    } else {
      this.state.currentUnit = 'celsius';
    }
  }

  render() {
    return this.buildHtmlElement();
  }
}
