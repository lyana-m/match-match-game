import { About } from '../pages/about/about';
import { Score } from '../pages/score/score';
import { Settings } from '../pages/settings/settings';

export const routes = [
  {
    path: '',
    template: new About().element.outerHTML,
  },
  {
    path: '/score',
    template: new Score().element.outerHTML,
  },
  {
    path: '/settings',
    template: new Settings().element.outerHTML,
  },
];
