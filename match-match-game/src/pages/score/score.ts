import './score.scss';
import { BaseComponent } from "../../shared/baseComponent";
import { Entry } from './entry/entry';

export class Score extends BaseComponent {
  constructor() {
    super('div', ['score']);
    this.render();
  }

  render() {
    const header = new BaseComponent('h2', ['score-header']);
    const wrapper = new BaseComponent('div', ['table-wrapper']);
    const table = new BaseComponent('table', ['table']);
    const entry = new Entry();
    header.element.innerHTML = 'Best players';
    table.element.innerHTML = `
        <col style="width: 10%">
        <col style="width: 60%">
        <col style="width: 30%">`;
    table.element.appendChild(entry.element);
    wrapper.element.appendChild(table.element);
    this.element.appendChild(header.element);
    this.element.appendChild(wrapper.element);
  }
}