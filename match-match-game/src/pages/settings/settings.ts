/* eslint-disable */

import './settings.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Select } from './select/select';

export interface ISettings {
  header: string;
  id: string;
}

export let cardTypeValue: string = 'animal';
export let difficultyValue: string = '16';

export class Settings extends BaseComponent {
  selectProps: ISettings[] = [
    { header: 'Game cards', id: 'cardType' },
    { header: 'Difficulty', id: 'difficulty' },
  ];

  constructor() {
    super('div', ['settings']);
    this.render();
    this.getSettings();
  }

  render() {
    this.selectProps.forEach((item) => {
      const select = new Select(item);
      this.element.appendChild(select.element);
    });
  }
  getSettings() {
    document.addEventListener('change', function (e) {
      if (e.target && (<HTMLElement>e.target).id === 'cardType') {
        cardTypeValue = (<HTMLSelectElement>e.target).value;
      }
      if (e.target && (<HTMLElement>e.target).id === 'difficulty') {
        difficultyValue = (<HTMLSelectElement>e.target).value;
        // this.setCardSize(difficultyValue);
      }
    });
  }
  // setCardSize(difficultyValue: string) {
  //   const root: HTMLElement | null = document.querySelector(':root');
  //   // const rootStyles = getComputedStyle(root!);
  //   // const cardSize = rootStyles.getPropertyValue('--card-size');
  //   if (+difficultyValue === 36) {
  //   root!.style.setProperty('--card-size', '90px');
  //   }
  // }
}

