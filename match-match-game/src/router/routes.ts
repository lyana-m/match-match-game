import { About } from "../pages/about/about";
import { Settings } from "../pages/settings/settings";

export const routes = [
  {
    path: '',
    template: new About().element.outerHTML,
  },
  {
    path: '/score',
    template: '<h1 style="color: black">Score</h1>',
  },
  {
    path: '/settings',
    template: new Settings().element.outerHTML,
  },
];
