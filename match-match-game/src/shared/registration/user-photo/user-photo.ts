import './user-photo.scss';
import { BaseComponent } from '../../baseComponent';

export class UserPhoto extends BaseComponent {
  constructor() {
    super('div', ['photo-container']);
    this.render();    
  }

  render() {
    const label = new BaseComponent('label', ['custom-photo-upload']);
    const image = new BaseComponent('img', ['image-upload']);
    const input = new BaseComponent('input', ['photo']);
    const canvas = new BaseComponent('canvas', ['canvas']);
    input.element.setAttribute('type', 'file');
    image.element.setAttribute('src', './assets/icons/user.svg');
    label.element.appendChild(image.element);
    label.element.appendChild(canvas.element);
    label.element.appendChild(input.element);
    this.element.appendChild(label.element);    
  }  
}
