import './header.scss';
import { BaseComponent } from '../baseComponent';
import { NavItem } from './nav-item/nav-item';
import { Button } from './button/button';

export class Header extends BaseComponent {
  navItemProps = [
    {
      src: './assets/icons/about.svg',
      href: '',
      text: 'About Game',
    },
    {
      src: './assets/icons/score.svg',
      href: 'score',
      text: 'Best Score',
    },
    {
      src: './assets/icons/settings.svg',
      href: 'settings',
      text: 'Game Settings',
    },
  ];

  constructor() {
    super('header', ['header']);
    this.render();
  }

  render() {
    const wrapper = new BaseComponent('div', ['wrapper']);
    const headerInner = new BaseComponent('div', ['header__inner']);
    const logo = new BaseComponent('div', ['logo']);
    const nav = new BaseComponent('nav', ['nav']);
    const navList = new BaseComponent('ul', ['nav__list']);
    const btn = new Button();
    btn.element.innerHTML = 'register new player';

    this.navItemProps.forEach((item) => {
      const navItem = new NavItem(item);
      if (this.navItemProps.indexOf(item) === 0) {
        navItem.element.classList.add('nav__item_active');
      }
      navList.element.appendChild(navItem.element);
    });

    nav.element.appendChild(navList.element);
    logo.element.innerHTML = `<span class="logo__line logo__line_1">match</span>
                              <span class="logo__line logo__line_2">match</span>`;
    headerInner.element.appendChild(logo.element);
    headerInner.element.appendChild(nav.element);
    headerInner.element.appendChild(btn.element);
    wrapper.element.appendChild(headerInner.element);
    this.element.appendChild(wrapper.element);
  }
}
