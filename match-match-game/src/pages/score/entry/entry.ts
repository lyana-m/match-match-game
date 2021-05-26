import './entry.scss';
import { BaseComponent } from "../../../shared/baseComponent";

export class Entry extends BaseComponent {
  constructor() {
    super('tr');
    this.render();
  }

  render() {
    const userPhoto = new BaseComponent('td', ['user-photo']);
    const photoContainer = new BaseComponent('div', ['photo-container']);
    const img = new BaseComponent('img');
    const userName = new BaseComponent('td', ['user-name']);
    const userScore = new BaseComponent('td', ['user-score']);
    const subRow = new BaseComponent('tr');
    const userEmail = new BaseComponent('td', ['user-email']);
    img.element.setAttribute('src', './assets/images/user-photo/02.png');
    userPhoto.element.setAttribute('rowspan', '2');
    userScore.element.setAttribute('rowspan', '2');
    userName.element.innerHTML = `Nicci Troiani`;
    userScore.element.innerHTML = `Score: 456`;
    userEmail.element.innerHTML = `nicci@gmail.com`;
    subRow.element.appendChild(userEmail.element);
    photoContainer.element.appendChild(img.element);
    userPhoto.element.appendChild(photoContainer.element);
    this.element.appendChild(userPhoto.element);
    this.element.appendChild(userName.element);
    this.element.appendChild(userScore.element);
    this.element.appendChild(subRow.element);
  }
}