import './button.scss';
import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent {
  constructor() {
    super('button', ['btn']);
    this.render();
  }

  render() {
    this.element.innerHTML = 'register new player';
  }
}