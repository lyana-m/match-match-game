/* eslint-disable */

import { Header } from '../shared/header/header';
import { BaseComponent } from '../shared/baseComponent';
import '../style.scss';
import { Game } from './game';
import { CardCategory } from '../shared/card-categories';
// import '../shared/images.json';

export class App {
  private readonly rootElement: HTMLElement;

  private readonly header: Header;

  private readonly main: BaseComponent;

  private readonly game: Game;

  constructor(element: HTMLElement) {
    this.rootElement = element;
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new BaseComponent('main', ['main']);
    this.main.element.setAttribute('data-router-outlet', 'data-router-outlet');
    this.rootElement.appendChild(this.main.element);
    this.game = new Game();
    this.main.element.appendChild(this.game.element);
  }

  async start() {
    const res = await fetch('../public/images.json');
    const categories: CardCategory[] = await res.json();
    const cat = categories[0];
    console.log(cat.images);
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.startGame(images);
  }
}
