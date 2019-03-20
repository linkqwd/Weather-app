export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.init();
    this._render();
  }

  static getTimeFromEpoch(arg, params) {
    var date = new Date(arg * 1000);
    return date.toLocaleString('en-GB', params);
  }

  updateState(state) {
    this.state = Object.assign({}, this.state, state);
    this._render();
  }

  _render() {
    this.host.innerHTML = '';
    const content = this.render();

    if (!Array.isArray(content)) content = [content];

    content
      .map(item => this._vDomPrototypeElementToHtmlElement(item))
      .forEach(htmlElement => this.host.appendChild(htmlElement));
  }

  _vDomPrototypeElementToHtmlElement(element) {
    if (element.tag) {
      if (typeof element.tag === 'function') {
        const container = document.createElement('div');
        new element.tag(container, element.props);
        return container;
      } else {
        const container = document.createElement(element.tag);
        if (element.content) container.innerHTML = element.content;

        ['classList', 'attributes', 'children', 'eventHandler'].forEach(
          item => {
            if (element[item] && !Array.isArray(element[item]))
              element[item] = [element[item]];
          }
        );

        if (element.classList) container.classList.add(...element.classList);

        if (element.attributes)
          element.attributes.forEach(attr =>
            container.setAttribute(attr.name, attr.value)
          );

        if (element.eventHandler) {
          element.eventHandler.forEach(item => {
            container.addEventListener(item.eventType, item.handler);
          });
        }

        if (element.children) {
          element.children.forEach(el => {
            const htmlElement = this._vDomPrototypeElementToHtmlElement(el);
            container.appendChild(htmlElement);
          });
        }

        return container;
      }
    }
    return element;
  }

  init() {}
}
