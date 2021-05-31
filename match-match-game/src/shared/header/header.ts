/* eslint-disable */

import './header.scss';
import { BaseComponent } from '../baseComponent';
import { NavItem } from './nav-item/nav-item';
import { Button } from './button/button';
// import { getScoreTable } from '../../helpers/bd';
// import { Game } from '../../classes/game';
// import { imageSrc } from '../../classes/app';

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
    const btnContainer = new BaseComponent('div', ['btn-photo-container']);
    const btnReg = new Button();
    const btnStart = new Button();
    const btnStop = new Button();
    btnReg.element.innerHTML = 'register new player';
    btnStart.element.innerHTML = 'start game';
    btnStop.element.innerHTML = 'stop game';
    btnReg.element.classList.add('btn-reg');
    btnStart.element.classList.add('btn-start');
    btnStop.element.classList.add('btn-stop');
    
    btnStart.element.addEventListener('click', () => this.hideBtnStart());

    btnStop.element.addEventListener('click', () => this.hideBtnStop());

    this.navItemProps.forEach((item) => {

      const navItem = new NavItem(item);
      if (this.navItemProps.indexOf(item) === 0) {
        navItem.element.classList.add('nav__item_active');
      }
      // if (this.navItemProps.indexOf(item) === 1) {
      //   navItem.element.addEventListener('click', () => getScoreTable());
      // }
      navList.element.appendChild(navItem.element);
    });

    btnContainer.element.appendChild(btnReg.element);
    btnContainer.element.appendChild(btnStart.element);
    btnContainer.element.appendChild(btnStop.element);
    nav.element.appendChild(navList.element);
    logo.element.innerHTML = `
      <span class="logo__line logo__line_1">match</span>
      <span class="logo__line logo__line_2">match</span>`;
    headerInner.element.appendChild(logo.element);
    headerInner.element.appendChild(nav.element);
    headerInner.element.appendChild(btnContainer.element);
    wrapper.element.appendChild(headerInner.element);
    this.element.appendChild(wrapper.element);
  }

  hideBtnStart() {
    const btnStop = document.querySelector('.btn-stop');
    const btnStart = document.querySelector('.btn-start');
    (<HTMLElement>btnStop).style.display = 'inline-block';
    (<HTMLElement>btnStart).style.display = 'none';
  }

  hideBtnStop() {
    const btnStop = document.querySelector('.btn-stop');
    const btnReg = document.querySelector('.btn-reg');
    (<HTMLElement>btnStop).style.display = 'none';
    (<HTMLElement>btnReg).style.display = 'inline-block';
  }
}
