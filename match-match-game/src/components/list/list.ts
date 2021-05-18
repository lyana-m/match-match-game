import './list.scss';
import { BaseComponent } from '../baseComponent';
import { NavItem } from '../nav-item/nav-item';

export class List extends BaseComponent {
  navItemProps = [
    {
      src: './assets/icons/about.svg',
      href: '#about',
      text: 'About Game',
    },
    {
      src: './assets/icons/score.svg',
      href: '#score',
      text: 'Best Score',
    },
    {
      src: './assets/icons/settings.svg',
      href: '#settings',
      text: 'Game Settings',
    },
  ];

  constructor() {
    super('ul', ['nav__list']);
    this.render();
  }

  render() {
    this.navItemProps.forEach((item) => {
      const navItem = new NavItem(item);

      if (this.navItemProps.indexOf(item) === 0) {
        navItem.element.classList.add('nav__item_active');
      }

      this.element.appendChild(navItem.element);
    });
  }
}
