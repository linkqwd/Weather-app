export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.getDataBeforeRender();
    this.bindBeforeRender();
    this._render();
  }

  _render() {
    this.host.innerHTML = '';
    const content = this.render();

    if (typeof content === 'string') {
      this.host.innerHTML = content;
    } else {
      console.log(content);
      content
        .map(item => this._vDomPrototypeElementToHtmlElement(item))
        .forEach(htmlElement => this.host.appendChild(htmlElement));
    }
  }

  _vDomPrototypeElementToHtmlElement(element) {
    if (typeof element === 'string') {
      const htmlElement = document.createDocumentFragment();
      htmlElement.innerHTML = element;
      return htmlElement;
    } else {
      if (element.tag) {
        if (typeof element.tag === 'function') {
          const container = document.createDocumentFragment();
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
              console.log('item', item);
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
  }
  bindBeforeRender() {}
  getDataBeforeRender() {}
}
