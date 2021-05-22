/* eslint-disable */

interface IRoute {
  [key: string]: string;
}

export class Router {
  routes: IRoute[];

  constructor(routes: IRoute[]) {
    this.routes = routes;
    this.loadInitialRoute();
  }

  loadRoute(urlSegments: string) {
    const matchedRoute = this.matchUrlToRoute(urlSegments);
    const url = `/${urlSegments}`;
    history.pushState({}, '', url);

    const routerOutletElement = document.querySelectorAll(
      '[data-router-outlet]',
    )[0];
    if (typeof matchedRoute === 'undefined') {
      throw new Error('error');
    }
    routerOutletElement.innerHTML = matchedRoute.template;
  }

  matchUrlToRoute(urlSegments: string) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.slice(1);

      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }
      return true;
    });
    return matchedRoute;
  }

  loadInitialRoute() {
    const pathnameSplit = window.location.pathname;
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this.loadRoute(pathSegments);
  }
}
