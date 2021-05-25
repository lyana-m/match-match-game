import './settings.scss';
import { BaseComponent } from "../../shared/baseComponent";
import { Select } from './select/select';

export interface ISettings {
  header: string;
  id: string;
}

export class Settings extends BaseComponent {
  selectProps: ISettings[] = [
    { header: 'Game cards', id: 'cardType' },
    { header: 'Difficulty', id: 'difficulty' }
  ]

  constructor() {
    super('div', ['settings']);
    this.render();
  }
  render() {
    this.selectProps.forEach(item => {
    const select = new Select(item);
    this.element.appendChild(select.element);
    });
  }
}