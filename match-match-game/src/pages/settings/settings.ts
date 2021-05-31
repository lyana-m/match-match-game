import './settings.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Select } from './select/select';

export interface ISettings {
  header: string;
  id: string;
}

export let cardTypeValue = 'animal';
export let difficultyValue = '16';

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
    document.addEventListener('change', (e) => {
      if (e.target && (<HTMLElement>e.target).id === 'cardType') {
        cardTypeValue = (<HTMLSelectElement>e.target).value;
      }
      if (e.target && (<HTMLElement>e.target).id === 'difficulty') {
        difficultyValue = (<HTMLSelectElement>e.target).value;        
      }
    });
  }  
}
