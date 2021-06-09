import '../public/images.json';
import { CardCategory } from '../shared/card-categories';
import { WinModal } from '../pages/game/win-modal/win-modal';
import { BaseComponent } from '../shared/baseComponent';
import { Card } from './card';
import { Field } from './field';
import { Timer } from './timer';
import { cardTypeValue, difficultyValue } from '../pages/settings/settings';
import { getIdFromLS, saveScore } from '../helpers/bd';

const DIFFICULTY = {
  HARD: 36,
  EASY: 16
}
const TIMER_DELAY = 30000;
const SHOW_FAILED_STATE_DELAY = 300;
const RESET_FAILED_STATE_DELAY = 600;
const CLOSE_CARD_DELAY = 300;
const SHOW_SUCCSESS_STATE_DELAY = 300;
const MIN_SCORE = 0;

export class Game extends BaseComponent {
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
    this.winModal = new WinModal(this.timer, this.field);
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.field.element);
    this.rootElement?.appendChild(this.winModal.element);
  }

  async startGame() {
    this.wrongPairs = 0;
    this.rightPairs = 0;
    this.pairs = 0;
    this.field.clear();

    const root: HTMLElement | null = document.querySelector(':root');
    if (+difficultyValue === DIFFICULTY.HARD) {
      root!.style.setProperty('--card-size', '90px');
    }
    if (+difficultyValue === DIFFICULTY.EASY) {
      root!.style.setProperty('--card-size', '135px');
    }

    const res = await fetch('../public/images.json');
    const categories: CardCategory = await res.json();
    const currentCategory = categories[cardTypeValue];
    const images = Array.from({ length: +difficultyValue / 2 }, (_, index) => `${cardTypeValue}/${currentCategory[index]}`);

    setTimeout(() => this.timer.startTimer(), TIMER_DELAY);

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
      await new Promise((resolve) => setTimeout(resolve, SHOW_FAILED_STATE_DELAY));
      this.activeCard.showFailedState();
      card.showFailedState();
      await new Promise((resolve) => setTimeout(resolve, RESET_FAILED_STATE_DELAY));
      this.activeCard.resetFailedState();
      card.resetFailedState();
      await new Promise((resolve) => setTimeout(resolve, CLOSE_CARD_DELAY));
      this.activeCard.closeCard();
      card.closeCard();
      this.wrongPairs++;
    }
    if (this.activeCard.images === card.images) {
      await new Promise((resolve) => setTimeout(resolve, SHOW_SUCCSESS_STATE_DELAY));
      this.activeCard.showSuccessState();
      card.showSuccessState();
      this.rightPairs++;
    }

    this.activeCard = undefined;
    this.isAnimate = false;

    if (this.rightPairs === this.pairs) {
      this.successFinishGame();
    }
  }

  stopGame() {
    const about: HTMLElement = document.querySelectorAll('.nav__link')[0] as HTMLElement;
    const photo = document.querySelector('.registered-user-photo');
    this.timer.stopTimer();
    photo?.remove();
    about.click();
  }

  successFinishGame() {
    this.winModal.showModal();
    const score = this.calculateScore();
    const id = getIdFromLS();
    if (id) {
      saveScore(id, score);
    }
  }

  calculateScore() {
    const arrTime = this.timer.getTime().split(':');
    const seconds = +arrTime[0] * 60 + +arrTime[1];
    const userScore = (this.rightPairs - this.wrongPairs) * 100 - seconds * 10;
    return userScore < MIN_SCORE ? MIN_SCORE : userScore;
  }
}
