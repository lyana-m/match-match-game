/* eslint-disable */

import './nav-item.scss';
import { BaseComponent } from '../../baseComponent';
import { router } from '../../../index';

export class NavItem extends BaseComponent {
  constructor(item: any) {
    super('li', ['nav__item']);
    // const router = new Router(routes);
    this.render(item);
  }

  render(item: any) {
    const img = new BaseComponent('img', ['nav__icon']);
    const link = new BaseComponent('a', ['nav__link']);
    img.element.setAttribute('src', item.src);
    // link.element.setAttribute('href', '#');
    link.element.innerHTML = item.text;
    this.element.appendChild(img.element);
    this.element.appendChild(link.element);
    link.element.addEventListener('click', () => router.loadRoute(item.href));
  }
}
