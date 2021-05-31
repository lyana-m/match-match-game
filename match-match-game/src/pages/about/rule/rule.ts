import './rule.scss';
import { BaseComponent } from '../../../shared/baseComponent';

interface IRule {
  src: string;
  alt: string;
  text: string;
  number: string;
}

export class Rule extends BaseComponent {
  constructor(item: IRule) {
    super('div', ['rule-card']);
    this.render(item);
  }

  render(item: IRule) {
    const rule = new BaseComponent('div', ['rule']);
    const text = new BaseComponent('p', ['rule-content']);
    const illustation = new BaseComponent('div', ['illustration']);
    const image = new BaseComponent('img', ['image']);
    text.element.innerHTML = `${item.text}`;
    text.element.classList.add(`rule-content-${item.number}`);
    image.element.setAttribute('src', item.src);
    image.element.setAttribute('alt', item.alt);
    rule.element.appendChild(text.element);
    illustation.element.appendChild(image.element);
    this.element.appendChild(rule.element);
    this.element.appendChild(illustation.element);
  }
}
