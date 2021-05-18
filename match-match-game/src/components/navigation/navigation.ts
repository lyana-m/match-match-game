import './navigation.scss';
import { BaseComponent } from '../baseComponent';
import { List } from '../list/list';

export class Navigation extends BaseComponent {
  constructor() {
    super('nav', ['nav']);
    this.render();
  }

  render() {
    const list = new List();
    this.element.appendChild(list.element);
  }
}
