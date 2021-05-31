/* eslint-disable */

import './win-modal.scss';
import { BaseComponent } from '../../../shared/baseComponent';
import { Button } from '../../../shared/header/button/button';
import { Timer } from '../../../classes/timer';
import { routes, getScoreTemplate } from '../../../router/routes';

export class WinModal extends BaseComponent {
  timer: Timer;

  constructor(timer: Timer) {
    super('div', ['win-modal']);
    this.timer = timer;
    this.render();
  }

  render() {
    const winCongrats = new BaseComponent('div', ['win-congrats']);
    const overlay = new BaseComponent('div', ['win-overlay']);
    const congrats = new BaseComponent('h2', ['congrats']);
    const btn = new Button();
    const scoreLink: HTMLElement = document.querySelectorAll('.nav__link')[1] as HTMLElement;
    congrats.element.innerHTML = '';
    btn.element.classList.add('btn-ok');
    btn.element.innerHTML = 'ok';
    btn.element.addEventListener('click', () => this.closeModal());
    btn.element.addEventListener('click', () => this.updateScoreLink());
    winCongrats.element.appendChild(congrats.element);
    winCongrats.element.appendChild(btn.element);
    this.element.appendChild(winCongrats.element);
    this.element.appendChild(overlay.element);
  }

  showModal() {    
    this.element.style.display = 'flex';
    this.timer.clearInterval();
    const time = this.timer.getTime();
    document.querySelector('.congrats')!.innerHTML = `Congratulations! You successfully found all matches on ${time} minutes`;
  }

  closeModal() {
    this.element.style.display = 'none';
  }

  async updateScoreLink() {
    routes[1].template = await getScoreTemplate();
    const scoreLink: HTMLElement = document.querySelectorAll('.nav__link')[1] as HTMLElement;
    scoreLink.click()
  }
}
