/* eslint-disable */

import './nav-item.scss';
import { BaseComponent } from '../../baseComponent';
import { router } from '../../../index';

export class NavItem extends BaseComponent {
  constructor(item: any) {
    super('li', ['nav__item']);
    this.render(item);
  }

  render(item: any) {
    const img = new BaseComponent('img', ['nav__icon']);
    const link = new BaseComponent('a', ['nav__link']);
    img.element.setAttribute('src', item.src);
    link.element.innerHTML = item.text;
    this.element.appendChild(img.element);
    this.element.appendChild(link.element);
    link.element.addEventListener('click', () => router.loadRoute(item.href))
    link.element.addEventListener('click', (event: MouseEvent) => this.makeLinkActive(event));
  }

  makeLinkActive(event: MouseEvent) {
    const activeLink = document.querySelector('.nav__item_active');
    activeLink?.classList.remove('nav__item_active');    
    const currentTarget = event.target as HTMLElement;    
    currentTarget?.closest('.nav__item')?.classList.add('nav__item_active');
  }
}
