import { About } from '../pages/about/about';
import { Score } from '../pages/score/score';
import { Settings } from '../pages/settings/settings';

export async function getScoreTemplate() {
  const score = new Score(await Score.renderScoreTable());
  return score.element.outerHTML;
}

export const routes = [
  {
    path: '',
    template: new About().element.outerHTML,
  },
  {
    path: '/score',
    template: getScoreTemplate(),
  },
  {
    path: '/settings',
    template: new Settings().element.outerHTML,
  },
];
