export class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    tagName: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
  ) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...styles);
  }
}
