import { BaseComponent } from '../shared/baseComponent';
import { Card } from './card';
import { Field } from './field';
import { Timer } from './timer';

export class Game extends BaseComponent {
  // state = {
  //   user: {
  //     id: 1,
  //     firstName: 'User1',
  //     lastName: 'User2',
  //     email: 'user1@email.com'
  //   },
  //   config: {
  //     grid: 6,
  //     cardType: 'cars'
  //   },
  //   game: {
  //     timer: 456365
  //   }
  // }
  private readonly field: Field;

  private readonly timer: Timer;

  private activeCard?: Card;

  private isAnimate = false;

  constructor() {
    super();
    this.field = new Field();
    this.timer = new Timer();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.field.element);
  }

  startGame(images: string[]) {
    setTimeout(() => this.timer.startTimer(), 3000);
    this.field.clear();

    const cards = images
      .concat(images)
      .map((url) => {
        console.log('url', url);
        return new Card(url);
      })
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.field.addCards(cards);

  }

  private async cardHandler(card: Card) {
    if (this.isAnimate) {
      return;
    }
    this.isAnimate = true;
    card.openCard();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimate = false;
      return;
    }
    if (this.activeCard.images !== card.images) {
      await new Promise(resolve => setTimeout(resolve, 300));
      this.activeCard.showFailedState();
      card.showFailedState();
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.activeCard.resetFailedState();
      card.resetFailedState();
      await new Promise(resolve => setTimeout(resolve, 300));
      this.activeCard.closeCard();
      card.closeCard();
    }
    if (this.activeCard.images === card.images) {
      await new Promise(resolve => setTimeout(resolve, 300));
      this.activeCard.showSuccessState();
      card.showSuccessState();
    }

    this.activeCard = undefined;
    this.isAnimate = false;
  }
}
