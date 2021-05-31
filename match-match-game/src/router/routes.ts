import { About } from '../pages/about/about';
import { Score } from '../pages/score/score';
import { Settings } from '../pages/settings/settings';

export const routes = [
  {
    path: '',
    template: new About().element.outerHTML
  },
  {
    path: '/score',
    template: getScoreTemplate()
  },
  {
    path: '/settings',
    template: new Settings().element.outerHTML
  }
];

export async function getScoreTemplate() {
  let score = new Score(await Score.renderScoreTable());
  return score.element.outerHTML;
}

