/* eslint-disable */

import '../style.scss';
import { Header } from '../shared/header/header';
import { BaseComponent } from '../shared/baseComponent';
import { Game } from './game';
import { Registration } from '../shared/registration/registration';
import { validate } from '../helpers/validator';
import { bdInit } from '../helpers/bd';

export let imageSrc: string;

export class App {
  private readonly rootElement: HTMLElement;

  private readonly header: Header;

  private readonly main: BaseComponent;

  private readonly game: Game;

  private readonly registration: Registration;  

  constructor(element: HTMLElement) {
    this.rootElement = element;
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);    
    this.main = new BaseComponent('main', ['main']);
    this.main.element.setAttribute('data-router-outlet', 'data-router-outlet');
    this.rootElement.appendChild(this.main.element);
    this.game = new Game();    
    this.registration = new Registration();
    this.rootElement.appendChild(this.registration.element);       
  }

  start() {
    bdInit(); 
    
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
    const activeLinkArr = Array.from(links).filter(link => link.getAttribute('id') === `${window.location.pathname}`);    
    activeLinkArr[0].closest('.nav__item')!.classList.add('nav__item_active'); 

    links.forEach(link => link.addEventListener('click', () => this.game.timer.stopTimer()));
    
    const inputFile: HTMLInputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
    inputFile?.addEventListener('change', () => {
      const canvas: HTMLCanvasElement = document.querySelector('.canvas') as HTMLCanvasElement;      
      const context = canvas!.getContext("2d");
      const file = inputFile.files![0];
      const reader = new FileReader();
      reader.onload = (event: Event) => {
        const image = new Image(); 
        imageSrc = (<FileReader>event.target).result as string;
        localStorage.setItem('image', `${imageSrc}`)     
        image.src = imageSrc;
        // console.log(image.src);
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context!.drawImage(image, 0, 0)
        }
      }      
      reader.readAsDataURL(file);
    })  
  }  
}
