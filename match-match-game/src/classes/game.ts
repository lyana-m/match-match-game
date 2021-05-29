import '../public/images.json';
import { CardCategory } from '../shared/card-categories';
import { WinModal } from '../pages/game/win-modal/win-modal';
import { BaseComponent } from '../shared/baseComponent';
import { Card } from './card';
import { Field } from './field';
import { Timer } from './timer';
import { cardTypeValue, difficultyValue } from '../pages/settings/settings';

interface IConfig {
  difficulty: string,
  cardType: string
}

interface IState {
  config: IConfig;
}

export class Game extends BaseComponent {

  // state: IState = {
  // //   user: {
  // //     id: 1,
  // //     firstName: 'User1',
  // //     lastName: 'User2',
  // //     email: 'user1@email.com'
  // //   },
  //   config: {
  //     difficulty: difficultyValue,
  //     cardType: cardTypeValue
  //   },
  // //   game: {
  // //     timer: 456365
  // //   }
  // }
  private readonly field: Field;

  timer: Timer;

  private activeCard?: Card;

  private isAnimate = false;

  private wrongPairs = 0;

  private rightPairs = 0;

  private pairs = 0;

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

  async startGame() {
    const root: HTMLElement | null = document.querySelector(':root');    
    if (+difficultyValue === 36) {
      root!.style.setProperty('--card-size', '90px');
    }
    if (+difficultyValue === 16) {
      root!.style.setProperty('--card-size', '135px');
    }


    const res = await fetch('../public/images.json');
    const categories: CardCategory = await res.json();
    const currentCategory = categories[cardTypeValue];
    // const images = currentCategory.map((name) => `${this.state.config.cardType}/${name}`);
    const images = Array.from({ length: +difficultyValue / 2 }, (_, index) => `${cardTypeValue}/${currentCategory[index]}`);

    setTimeout(() => this.timer.startTimer(), 3000);
    this.field.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
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
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.activeCard.showFailedState();
      card.showFailedState();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.activeCard.resetFailedState();
      card.resetFailedState();
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.activeCard.closeCard();
      card.closeCard();
      this.wrongPairs++;
    }
    if (this.activeCard.images === card.images) {
      await new Promise((resolve) => setTimeout(resolve, 300));
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

  stopGame() {
    const about: HTMLElement = document.querySelectorAll('.nav__link')[0] as HTMLElement;
    this.timer.stopTimer();
    about.click();
  }

  successFinishGame() {
    this.timer.stopTimer();
    this.winModal.showModal();
  }
}
