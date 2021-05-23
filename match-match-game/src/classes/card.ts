import { BaseComponent } from '../shared/baseComponent';
import '../pages/game/game.scss';

export class Card extends BaseComponent {
  // matched: false;
  // active: false;
  // picture: 'base64';

  constructor(readonly images: string) {
    super('div', ['card']);

    this.element.innerHTML = `
      <div class="card-image">
        <img src="./assets/images/${images}" alt="cat-icon">
      </div>`;
    this.element.classList.add('card_show', 'card_open');
  }

  openCard() {
    this.element.classList.remove('card_close');
    this.element.classList.add('card_show', 'card_open');
  }

  closeCard() {
    this.element.classList.remove('card_show', 'card_open');
    this.element.classList.add('card_close');
  }

  showSuccessState() {
    this.element.classList.add('card_match');    
  }

  showFailedState() {
    this.element.classList.add('card_failed');
  }

  resetFailedState() {
    this.element.classList.remove('card_failed');
  }
}
