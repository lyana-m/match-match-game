import './nav-item.scss';
import { BaseComponent } from '../baseComponent';

export class NavItem extends BaseComponent {
  constructor(item: any) {
    super('li', ['nav__item']);
    this.render(item);
  }

  render(item: any) {
    const img = new BaseComponent('img', ['nav__icon']);
    const link = new BaseComponent('a', ['nav__link']);
    img.element.setAttribute('src', item.src);
    link.element.setAttribute('href', item.href);
    link.element.innerHTML = item.text;
    // link.element.addEventListener('click', navigate);
    this.element.appendChild(img.element);
    this.element.appendChild(link.element);
  }
}
