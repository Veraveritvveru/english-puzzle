import BaseComponent from "../../components/base-component";

const TEXT_NOT_FOUND = 'Error. Not found'

export class NotFoundPage extends BaseComponent {
  constructor() {
    super({ tagName: 'section', classNames: ['not-found'] });
    const text = new BaseComponent({ tagName: 'div', classNames: ['not-found'], textContent: TEXT_NOT_FOUND });
    this.append(text);
  }
}