/* eslint-disable */
import { BaseComponent } from '../../../shared/baseComponent';
import { Option } from '../option/option';
import { ISettings } from '../settings';
import './select.scss';

export interface IOptionProps {
  [key: string]: IOptionInnerProps[],
  cardType: IOptionInnerProps[],
  difficulty: IOptionInnerProps[],
}

export interface IOptionInnerProps {
  attrubutes: { [key: string]: string }[],
  text: string;
}

export class Select extends BaseComponent {
  optionProps: IOptionProps = {
    cardType: [
      {
        attrubutes: [
          { selected: '' }, { disabled: '' },
        ],
        text: 'select game cards type',
      },
      {
        attrubutes: [
          { value: 'animal' },
        ],
        text: 'animal',
      },
      {
        attrubutes: [
          { value: 'food' },
        ],
        text: 'food',
      },
    ],
    difficulty: [
      {
        attrubutes: [
          { selected: '' }, { disabled: '' },
        ],
        text: 'select game type',
      },
      {
        attrubutes: [
          { value: '16' },
        ],
        text: '4x4',
      },
      {
        attrubutes: [
          { value: '36' },
        ],
        text: '6x6',
      },
    ],
  };

  constructor(item: ISettings) {
    super('div', ['dropdown']);
    this.render(item);
  }

  render(dropdown: ISettings) {
    const header = new BaseComponent('h2', ['dropdown-header']);
    const select = new BaseComponent('select', ['select']);
    
    header.element.innerHTML = `${dropdown.header}`;
    select.element.setAttribute('id', `${dropdown.id}`);
      
    this.optionProps[dropdown.id].forEach((item: IOptionInnerProps) => {
      const option = new Option(item);
      select.element.appendChild(option.element);
    });
    this.element.appendChild(header.element);
    this.element.appendChild(select.element);    
  }  
}
