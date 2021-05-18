import { Header } from '../components/header/header';
import { Field } from '../components/field/field';
// import { Router, routeArr } from '../services/router';

export interface IApp {
  [key: string]: string
}

export class App {
  private readonly rootElement: HTMLElement;
  private readonly header: Header;
  private readonly field: Field;
  // router: Router;

  constructor(element: HTMLElement) {
    this.rootElement = element;
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.field = new Field();
    this.rootElement.appendChild(this.field.element);
    // this.router = new Router('routerInstance', routeArr);
  }

  aboutRoute() {
    console.log('about');
  }
  scoreRoute() {
    console.log('score');
    const hell = document.createElement('p');
    hell.innerHTML = 'hell';
    this.rootElement.appendChild(hell);
  }
  settingsRoute() {
    console.log('settings');
  }
}
