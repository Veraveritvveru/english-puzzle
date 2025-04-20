import './app.scss';

import BaseComponent from "./components/base-component";
import Router from './router/router';
import { LoginPage } from "./views/login/login-page";
import { PAGES } from './router/pages';
import { StartPage } from './views/start/start-page';

export default class App {
  private readonly appContainer: BaseComponent;
  public router: Router;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.appContainer = new BaseComponent({tagName: 'div', classNames: ['app']});
    
  }

  run() {
    const body = document.body;
    this.appContainer.appendToParent(body);

    // if (userData) {
    //   this.router.navigate('start-page')
    // } else {
    //   this.router.navigate('login-page')
    // }
    // const header = new HeaderComponent();

    // const login = new LoginPage(this.router);
    // this.appContainer.append(login);
    this.router.navigate('login-page');
  }

createRoutes() {
  return [
    {
      path: '',
      callback: () => {
        this.setContent(new LoginPage(this.router))
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
        this.setContent(new StartPage(this.router));
      },
    },
    {
      path: PAGES.game,
      callback: () => { },
    },
    {
      path: PAGES.notFound,
      callback: () => { },
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




