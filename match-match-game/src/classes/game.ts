import { WinModal } from '../pages/game/win-modal/win-modal';
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

  private wrongPairs: number = 0;

  private rightPairs: number = 0;

  private pairs: number = 0;

  private rootElement = document.querySelector('body');

  private readonly winModal: WinModal;

  constructor() {
    super();
    this.field = new Field();
    this.timer = new Timer();
    this.winModal = new WinModal();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.field.element);
    this.rootElement?.appendChild(this.winModal.element);
  }

  startGame(images: string[]) {
    setTimeout(() => this.timer.startTimer(), 3000);
    this.field.clear();

    const cards = images
      .concat(images)
      .map((url) => {
        return new Card(url);
      })
      .sort(() => Math.random() - 0.5);

    this.pairs = cards.length / 2;
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
      this.wrongPairs++;
    }
    if (this.activeCard.images === card.images) {
      await new Promise(resolve => setTimeout(resolve, 300));
      this.activeCard.showSuccessState();
      card.showSuccessState();
      this.rightPairs++;
    }

    this.activeCard = undefined;
    this.isAnimate = false;
    console.log('rightPairs', this.rightPairs);
    console.log('wrongPairs', this.wrongPairs);
    console.log('pairs', this.pairs);

    if (this.rightPairs === this.pairs) {
      this.successFinishGame();
    }
  }

  successFinishGame() {
    this.timer.stopTimer();
    this.winModal.showModal(); 
  }
}
