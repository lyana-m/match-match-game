import { Header } from '../shared/header/header';
import { BaseComponent } from '../shared/baseComponent';
import '../style.scss';

export class App {
  private readonly rootElement: HTMLElement;

  private readonly header: Header;

  private readonly main: BaseComponent;

  constructor(element: HTMLElement) {
    this.rootElement = element;
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new BaseComponent('main', ['wrapper']);
    this.main.element.setAttribute('data-router-outlet', 'data-router-outlet');
    this.rootElement.appendChild(this.main.element);
  }
}
