/* eslint-disable */

import { Header } from '../shared/header/header';
import { BaseComponent } from '../shared/baseComponent';
import '../style.scss';
import { Game } from './game';
import { CardCategory } from '../shared/card-categories';
import { Registration } from '../shared/registration/registration';
import { validate } from '../helpers/validator';
import { About } from '../pages/about/about';

export class App {
  private readonly rootElement: HTMLElement;

  private readonly header: Header;

  private readonly main: BaseComponent;

  private readonly game: Game;

  private readonly registration: Registration;

  private readonly about: About; 

  constructor(element: HTMLElement) {
    this.rootElement = element;
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);    
    this.main = new BaseComponent('main', ['main']);
    this.main.element.setAttribute('data-router-outlet', 'data-router-outlet');
    this.rootElement.appendChild(this.main.element);
    this.game = new Game();
    // this.main.element.appendChild(this.game.element);
    this.registration = new Registration();
    this.rootElement.appendChild(this.registration.element);
    this.about = new About();
    // this.main.element.appendChild(this.about.element);    
  }

  async start() {
    const res = await fetch('../public/images.json');
    const categories: CardCategory[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.startGame(images);

    const btnReg = document.querySelector('.btn-reg');
    btnReg?.addEventListener('click', () => validate());
    btnReg?.addEventListener('click', () => this.registration.showRegistrationForm());      
  }  
}
