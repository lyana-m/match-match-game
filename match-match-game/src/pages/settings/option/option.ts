import './option.scss';
import { BaseComponent } from "../../../shared/baseComponent";
import { IOptionInnerProps, IOptionProps } from '../select/select';

export class Option extends BaseComponent {
  constructor(item: IOptionInnerProps) {
    super('option', ['option']);
    this.render(item)
  }
  render(item: IOptionInnerProps) {
    item.attrubutes.forEach(attr => {
      const attrEntries = Object.entries(attr)[0];
      this.element.setAttribute(`${attrEntries[0]}`, `${attrEntries[1]}`);
      this.element.innerHTML = `${item.text}`;
    });
  }
}