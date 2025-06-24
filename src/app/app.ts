import './app.scss';

import BaseComponent from "./components/base-component";
import { PAGES } from './router/pages';
import LoginPage from './views/login/login-page';
import Router from './router/router';

export default class App {
  private readonly appContainer: BaseComponent;
  public router: Router;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.appContainer = new BaseComponent({ tagName: 'div', classNames: ['app'] });

  }

  run() {
    const body = document.body;
    body.appendChild(this.appContainer.getElement());

    this.router.navigate(PAGES.login);
  }

  createRoutes() {
    return [
      {
        path: '',
        callback: async () => {
          this.setContent(new LoginPage(this.router));
        },
      },
      {
        path: PAGES.login,
        callback: async () => {
          this.setContent(new LoginPage(this.router));
        },
      },
      // {
      //   path: PAGES.start,
      //   callback: async () => {
      //     this.setContent(new StartPage(this.router, this.header));
      //   },
      // },
      // {
      //   path: PAGES.game,
      //   callback: () => {
      //     this.setContent(new GamePage(this.router));
      //   },
      // },
      // {
      //   path: PAGES.notFound,
      //   callback: () => { },
      // },
    ];
  }

  private setContent(content: BaseComponent) {
    this.appContainer.getElement().innerHTML = '';
    this.appContainer.append(content);
  }

}
