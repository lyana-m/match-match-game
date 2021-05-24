import './registration.scss';
import { validate } from '../../helpers/validator';
import { BaseComponent } from "../baseComponent";
import { Button } from '../header/button/button';

export class Registration extends BaseComponent {
  constructor() {
    super('div', ['registration-modal']);
    this.render();
  }

  render() {
    const form = new BaseComponent('form', ['form']);
    const overlay = new BaseComponent('div', ['overlay']);
    const infoContainer = new BaseComponent('div', ['info-container']);
    const btnContainer = new BaseComponent('div', ['btn-container']);
    const formHeader = new BaseComponent('h1', ['form-header']);
    const info = new BaseComponent('div', ['info']);
    const btnSubmit = new Button();
    const btnReset = new Button();

    formHeader.element.innerHTML = `
    Register new Player`;
    info.element.innerHTML = `
          <div>
            <div class="field-container">
              <input type="name" class="first-name" placeholder=" ">
              <label>First name</label>
              <small>Error message</small>
            </div>
            <div class="field-container">
              <input type="name" class="last-name" placeholder=" ">
              <label>Last name</label>
              <small>Error message</small>
            </div>
            <div class="field-container">
              <input type="email" class="e-mail" placeholder=" ">
              <label>E-mail</label>
              <small>Error message</small>
            </div>
          </div>
          <div>
            <label for="photo-upload" class="custom-photo-upload">
              <img class="image-upload" src="./assets/icons/user.svg" alt="user-photo">
              <input type="file" class="photo" id="photo-upload">
            </label>
          </div>`;
    btnSubmit.element.classList.add('btn', 'btn-submit');
    btnReset.element.classList.add('btn', 'btn-reset');
    btnSubmit.element.setAttribute('type', 'submit');
    btnReset.element.setAttribute('type', 'reset');    
    btnSubmit.element.innerHTML = 'Add User';
    btnReset.element.innerHTML = 'Cancel';    
    btnContainer.element.appendChild(btnSubmit.element);
    btnContainer.element.appendChild(btnReset.element);
    infoContainer.element.appendChild(formHeader.element);
    infoContainer.element.appendChild(info.element);
    form.element.appendChild(infoContainer.element);
    form.element.appendChild(btnContainer.element);
    this.element.appendChild(form.element);
    this.element.appendChild(overlay.element);

    btnReset.element.addEventListener('click', () => this.hideRegistrationForm());
    overlay.element.addEventListener('click', () => this.hideRegistrationForm());
    form.element.addEventListener('submit', (e) => {
      e.preventDefault();
      validate();      
    })
  }

  showRegistrationForm() {
    this.element.style.display = 'flex';
  }

  hideRegistrationForm() {
    this.element.style.display = 'none';
  }
}