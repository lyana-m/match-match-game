import './header.scss';
import { BaseComponent } from '../baseComponent';
import { Wrapper } from '../wrapper/wrapper';
import { HeaderInner } from '../header-inner/header-inner';
import { Logo } from '../logo/logo';
import { Navigation } from '../navigation/navigation';
import { Button } from '../button/button';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.render();
  }

  render() {
    const wrapper = new Wrapper();
    const headerInner = new HeaderInner();
    const logo = new Logo();
    const navigation = new Navigation();
    const btn = new Button();
    headerInner.element.appendChild(logo.element);
    headerInner.element.appendChild(navigation.element);
    headerInner.element.appendChild(btn.element);
    wrapper.element.appendChild(headerInner.element);
    this.element.appendChild(wrapper.element);
  }
}
