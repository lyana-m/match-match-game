import '../pages/game/game.scss';
import { BaseComponent } from '../shared/baseComponent';
import { Card } from './card';

const SHOW_TIME = 3;

export class Field extends BaseComponent {
  cards: Card[] = [];

  constructor() {
    super('div', ['field']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.closeCard());
    }, SHOW_TIME * 1000);
  }
}
