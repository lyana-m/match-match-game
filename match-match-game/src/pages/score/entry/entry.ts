import './entry.scss';
import { BaseComponent } from "../../../shared/baseComponent";

export class Entry extends BaseComponent {
  userName: string;
  email: string;
  score: number;
  photo: string;

  constructor(userName: string, email: string, score: number, photo: string) {
    super('tr');
    this.userName = userName;
    this.email = email;
    this.score = score;
    this.photo = photo;
    this.render();
  }

  render() {
    const userPhoto = new BaseComponent('td', ['user-photo']);
    const photoContainer = new BaseComponent('div', ['score-photo-container']);
    const img = new BaseComponent('img');
    const userName = new BaseComponent('td', ['user-name']);
    const userScore = new BaseComponent('td', ['user-score']);
    const userEmail = new BaseComponent('td', ['user-email']);
    const userImage = localStorage.getItem('image');
    if (this.photo !== 'undefined') {
      img.element.setAttribute('src', `${this.photo}`);
    } else {
      img.element.setAttribute('src', './assets/icons/user-no-photo.svg');
    }
    userName.element.innerHTML = `${this.userName}</br><span class="user-email">${this.email}</span>`;
    userScore.element.innerHTML = `Score: ${this.score}`;
    userEmail.element.innerHTML = `${this.email}`;
    photoContainer.element.appendChild(img.element);
    userPhoto.element.appendChild(photoContainer.element);
    this.element.appendChild(userPhoto.element);
    this.element.appendChild(userName.element);
    this.element.appendChild(userScore.element);
  }
}