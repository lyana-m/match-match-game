/* eslint-disable */

import '../style.scss';
import { Header } from '../shared/header/header';
import { BaseComponent } from '../shared/baseComponent';
import { Game } from './game';
import { CardCategory } from '../shared/card-categories';
import { Registration } from '../shared/registration/registration';
import { validate } from '../helpers/validator';
// import { About } from '../pages/about/about';
// import { Settings } from '../pages/settings/settings';

export class App {
  private readonly rootElement: HTMLElement;

  private readonly header: Header;

  private readonly main: BaseComponent;

  private readonly game: Game;

  private readonly registration: Registration;

  // private btnStart = document.querySelector('.btn-start');

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
    // this.about = new About();
    // console.log(this.about);
    // this.main.element.appendChild(this.about.element);
    // this.settings = new Settings();
    // this.main.element.appendChild(this.settings.element);    
  }

  start() {
    // const res = await fetch('../public/images.json');
    // const categories: CardCategory[] = await res.json();
    // const cat = categories[0];
    // const images = cat.images.map((name) => `${cat.category}/${name}`);
    // this.game.startGame(images);

    const btnReg = document.querySelector('.btn-reg');
    btnReg?.addEventListener('click', () => validate());
    btnReg?.addEventListener('click', () => this.registration.showRegistrationForm());
    const btnStart = document.querySelector('.btn-start');
    
    btnStart?.addEventListener('click', () => {      
      this.main.element.innerHTML = '';
      this.game.startGame();
      this.main.element.appendChild(this.game.element);      
    });
    const btnStop = document.querySelector('.btn-stop');
    btnStop?.addEventListener('click', () => this.game.stopGame());

    const links = document.querySelectorAll('.nav__link');
    links.forEach(link => link.addEventListener('click', () => this.game.timer.stopTimer()));
  }  
}
