import './style.scss';
import { App } from './app/app';
import Router from './services/router';

window.onload = () => {
  // const app = new App(document.body);
  Router.init();
};

export const app = new App(document.body);

