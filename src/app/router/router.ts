import { Route } from "../utils/types";

export default class Router {
  routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;

    window.addEventListener('hashchange', () => {
      this.navigate(window.location.hash.slice(1));
    });

  }

  navigate(url: string | HashChangeEvent) {
    if (typeof url === 'string') {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${url}`;
    }

    const hash = window.location.hash.slice(1);

    const route = this.routes.find((item) => item.path === hash);

    if (!route) {
      throw new Error('not found');
    }
    route.callback();
  }
}