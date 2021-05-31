import './about.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Rule } from './rule/rule';

export class About extends BaseComponent {
  ruleProps = [
    {
      src: './assets/images/form.png',
      alt: 'registration-form',
      text: 'Register new player in game',
      number: '1',
    },
    {
      src: './assets/images/settings.png',
      alt: 'settings',
      text: 'Configure your game settings',
      number: '2',
    },
    {
      src: './assets/images/game.png',
      alt: 'game',
      text: 'Start you new game! Remember card positions and match it before times up',
      number: '3',
    },
  ];

  constructor() {
    super('div', ['game-rules']);
    this.render();
  }

  render() {
    const header = new BaseComponent('h2', ['game-rules-header']);
    const rulesContainer = new BaseComponent('div', ['rule-cards-container']);
    header.element.innerHTML = 'How to play?';
    this.ruleProps.forEach((item) => {
      const rule = new Rule(item);
      rulesContainer.element.appendChild(rule.element);
    });
    this.element.appendChild(header.element);
    this.element.appendChild(rulesContainer.element);
  }
}
