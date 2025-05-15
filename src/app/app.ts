import './app.scss';

import BaseComponent from "./components/base-component";
import Router from './router/router';
import { LoginPage } from "./views/login/login-page";
import { PAGES } from './router/pages';
import { StartPage } from './views/start/start-page';
import HeaderComponent from './components/header/header';
import { GamePage } from './views/game/game-page';
import { user } from './store/user-store/user-store';

export default class App {
  private readonly appContainer: BaseComponent;
  public router: Router;
  public header: HeaderComponent;

  constructor() {
    const body = document.body;
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.header = new HeaderComponent(this.router);
    this.appContainer = new BaseComponent({ tagName: 'div', classNames: ['app'] });
    body.appendChild(this.header.getElement());

  }

  run() {
    const body = document.body;
    body.appendChild(this.header.getElement());
    body.appendChild(this.appContainer.getElement());

    if (user.isEmpty()) {
      this.router.navigate(PAGES.login);
    } else {
      this.router.navigate(PAGES.game);
      this.header.showLogoutBtn();
    }
  }

  createRoutes() {
    return [
      {
        path: '',
        callback: () => {
          this.setContent(new LoginPage(this.router));
        },
      },
      {
        path: PAGES.login,
        callback: () => {
          this.setContent(new LoginPage(this.router));
        },
      },
      {
        path: PAGES.start,
        callback: () => {
          this.setContent(new StartPage(this.router, this.header));
        },
      },
      {
        path: PAGES.game,
        callback: () => {
          this.setContent(new GamePage(this.router));
        },
      },
      {
        path: PAGES.notFound,
        callback: () => { },
        // component: async () => {
        //         return returnStartOrLoginPage(router);
        //      },
      },
    ];
  }

  private setContent(content: BaseComponent) {
    this.appContainer.getElement().innerHTML = '';
    this.appContainer.append(content);
  }
}


// const returnStartOrLoginPage = async (router: IRouter) => {
//   if (localStorageService.getData('userFullName')) {
//     const { Start } = await import('../pages/start-page/start');
//     return new Start(router);
//   }
//   const { Login } = await import('../pages/login-page/login');
//   return new Login(router);
// };

// // eslint-disable-next-line max-lines-per-function
// export function createRoutes(router: IRouter) {
//   return [
//     {
//       path: '',
//       component: async () => {
//         return returnStartOrLoginPage(router);
//       },
//     },
//     {
//       path: AppRoute.Login,
//       component: async () => {
//         return returnStartOrLoginPage(router);
//       },
//     },
//     {
//       path: AppRoute.Start,
//       component: async () => {
//         return returnStartOrLoginPage(router);
//       },
//     },
//     {
//       path: AppRoute.Game,
//       component: async () => {
//         const { Game } = await import('../pages/game-page/game');
//         return new Game(router);
//       },
//     },
//     {
//       path: AppRoute.Results,
//       component: async () => {
//         const { Results } = await import('../pages/results-page/results-page');
//         return new Results(router);
//       },
//     },
//     {
//       path: AppRoute.NotFound,
//       component: async () => {
//         const { NotFound } = await import('../pages/not-found-page/not-found');
//         return new NotFound(router);
//       },
//     },
//   ];
// }




