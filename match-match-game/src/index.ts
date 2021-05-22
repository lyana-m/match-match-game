/* eslint-disable */

import './style.scss';
import { App } from './classes/app';
import { Router } from './router/router';
import { routes } from './router/routes';

export let router: Router;

export default window.onload = () => {
  const app = new App(document.body);
  // router = new Router(routes);
  app.start();
};
