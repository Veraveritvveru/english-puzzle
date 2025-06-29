import './app.scss';

import BaseComponent from "./components/base-component";
import { PAGES } from './router/pages';
import Router from './router/router';
import { user } from './store/user-store';
import { Route } from './utils/types';
import LoginPage from './views/login/login-page';
import HeaderComponent from './components/header/header';
import StartPage from './views/start/start-page';
import GamePage from './views/game/game-page';

export default class App {
  private readonly appContainer: BaseComponent;
  public header: HeaderComponent;
  public router: Router;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.appContainer = new BaseComponent({ tagName: 'div', classNames: ['app'] });
    this.header = new HeaderComponent(this.router);
  }

  public run(): void {
    const body = document.body;
    body.appendChild(this.header.getElement());
    body.appendChild(this.appContainer.getElement());

    if (user.isEmpty()) {
      this.router.navigate(PAGES.login);
    } else {
      this.router.navigate(PAGES.start);
      this.header.showLogoutBtn();
    }
  }

  private createRoutes(): Route[] {
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
      {
        path: PAGES.start,
        callback: async () => {
          this.setContent(new StartPage(this.router, this.header));
        },
      },
      {
        path: PAGES.game,
        callback: async () => {
          this.setContent(new GamePage(this.router));
        },
      },
      // {
      //   path: PAGES.notFound,
      //   callback: () => { },
      // },
    ];
  }

  private setContent(content: BaseComponent): void {
    this.appContainer.getElement().innerHTML = '';
    this.appContainer.append(content);
  }
}
