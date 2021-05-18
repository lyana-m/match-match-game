// export interface IRoute {
//   path: string;
//   name: string;
// }

// export const routeArr = [{
//   path: "/about",
//   name: "About"
// },
// {
//   path: '/score',
//   name: "Score"
// },
// {
//   path: '/settins',
//   name: "Settins"
// }
// ];

// export navigate(e: EventListener) {
//   let route = e.target.attributes[0].value;

//   // redirect to the router instance
//   let routeInfo = routerInstance.routes.filter(r => r.path === route)[0]
//   if (!routeInfo) {
//     window.history.pushState({}, '', 'error')
//     root.innerHTML = `This route is not Defined`
//   } else {
//     window.history.pushState({}, '', routeInfo.path)
//     root.innerHTML = `You are on the ${routeInfo.name} path`
//   }
// }

// export class Router {
//   name: string;
//   routes: IRoute[];

//   constructor(name: string, routes: IRoute[]) {
//     this.name = name;
//     this.routes = routes;
//   }
// }

import { app } from '../index';
import { App } from '../app/app';
import { IApp } from '../app/app';

function getRouteInfo() {
  const hash = location.hash ? location.hash.slice(1) : '';
  return hash;
}

function handleHash() {
  const name = getRouteInfo();

  if (name) { 
    const routeName: (keyof IApp) = name + 'Route';
    console.log('name', `${routeName}`);
    (<any>app)[`${routeName}`]();
  }
}

export default {
  init(): void {
    console.log(111);
    addEventListener('hashchange', handleHash);
    handleHash();
  }
}