import '../pages/game/game.scss';
import { BaseComponent } from '../shared/baseComponent';

export class Timer extends BaseComponent {
  private timer: NodeJS.Timer | null = null;

  constructor() {
    super('div', ['timer']);
    this.element.innerHTML = '00:00';
  }

  startTimer() {
    let timerUnit = 0;
    this.timer = setInterval(() => {
      const minutes = Math.floor(timerUnit / 60);
      const seconds = timerUnit % 60;
      const strTimer = `
      ${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      this.element.innerHTML = strTimer;
      timerUnit++;
    }, 1000);
  }

  stopTimer() {
    // if (this.timer) {
    //   clearInterval(this.timer);
    //   this.element.innerHTML = '00:00';
    // }
    this.clearInterval();
    this.clearHTMLTimer();
  }

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  clearHTMLTimer() {
    if (this.timer) {
      this.element.innerHTML = '00:00';
    }
  }

  getTime() {
    return document.querySelector('.timer')?.textContent!;
  }
}
