import './win-modal.scss';
import { BaseComponent } from "../../../shared/baseComponent"
import { Button } from "../../../shared/header/button/button";

export class WinModal extends BaseComponent {
  time: string = '';

  constructor() {
    super('div', ['win-modal']);
    this.render();
  }
  render() {
    const winCongrats = new BaseComponent('div', ['win-congrats']);
    const overlay = new BaseComponent('div', ['win-overlay']);
    const congrats = new BaseComponent('h2', ['congrats']);
    const btn = new Button();
    congrats.element.innerHTML = '';
    btn.element.classList.add('btn-ok')
    btn.element.innerHTML = 'ok';
    btn.element.addEventListener('click', () => this.closeModal());
    winCongrats.element.appendChild(congrats.element);
    winCongrats.element.appendChild(btn.element);
    this.element.appendChild(winCongrats.element);
    this.element.appendChild(overlay.element);
  }

  showModal() {
    this.element.style.display = 'flex';
    const timer: string = document.querySelector('.timer')?.textContent!;
    this.time = timer;
    document.querySelector('.congrats')!.innerHTML = `Congratulations! You successfully found all matches on ${this.time} minutes`;
  }

  closeModal() {
    this.element.style.display = 'none';
  }
}