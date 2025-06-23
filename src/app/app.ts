import './app.scss';

import BaseComponent from "./components/base-component";

export default class App {
  private readonly appContainer: BaseComponent;
  
  constructor() {
    this.appContainer = new BaseComponent({ tagName: 'div', classNames: ['app'] });
  }

  run() {
    const body = document.body;
    body.appendChild(this.appContainer.getElement());
  }

}
