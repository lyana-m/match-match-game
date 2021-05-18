import './logo.scss';
import { BaseComponent } from '../baseComponent';

export class Logo extends BaseComponent {
  constructor() {
    super('div', ['logo']);
    this.render();
  }

  render() {
    const line1 = new BaseComponent('span', ['logo__line']);
    const line2 = new BaseComponent('span', ['logo__line', 'logo__line_2']);
    line1.element.innerHTML = 'match';
    line2.element.innerHTML = 'match';
    this.element.appendChild(line1.element);
    this.element.appendChild(line2.element);
  }
}
