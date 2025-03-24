import './header.scss';

import BaseComponent from "../base-component";

export class HeaderComponent extends BaseComponent {
  constructor() {
    super({ tagName: 'header', classNames: ['header'] });
    this.drawLogo();
  }

  drawLogo() {
    //TODO - добавить лого - паззл иконку 
    const title = new BaseComponent({ tagName: 'h1', classNames: ['title'], textContent: 'English Puzzle' });
    this.append(title);
  }
}