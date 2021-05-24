import './form-field.scss';
import { BaseComponent } from "../../baseComponent";
import { validate } from '../../../helpers/validator';

export class FormField extends BaseComponent {
  inputClass: string;
  inputType: string;
  label: string;

  constructor(inputType: string, inputClass: string, label: string) {
    super('div', ['field-container']);
    this.inputClass = inputClass;
    this.inputType = inputType;
    this.label = label;
    this.render();
  }

  render() {
    const input = new BaseComponent('input', [`${this.inputClass}`]);
    const label = new BaseComponent('label', []);
    const small = new BaseComponent('small', []);

    input.element.setAttribute('type', `${this.inputType}`);
    input.element.setAttribute('placeholder', ' ');
    input.element.addEventListener('input', () => validate());
    label.element.innerHTML = `${this.label}`;
    this.element.appendChild(input.element);
    this.element.appendChild(label.element);
    this.element.appendChild(small.element);
  }  
}