import './registration.scss';
import { validate } from '../../helpers/validator';
import { BaseComponent } from "../baseComponent";
import { Button } from '../header/button/button';
import { FormField } from './form-field/form-fiels';

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
    const fieldsWrapper = new BaseComponent('div', []);
    const firstName = new FormField('text', 'first-name', 'First name');
    const lastName = new FormField('text', 'last-name', 'Last name');
    const email = new FormField('email', 'e-mail', 'E-mail');
    const photoContainer = new BaseComponent('div', []);
    const btnSubmit = new Button();
    const btnReset = new Button();

    formHeader.element.innerHTML = `
    Register new Player`;

    photoContainer.element.innerHTML = `
              <label for="photo-upload" class="custom-photo-upload">
               <img class="image-upload" src="./assets/icons/user.svg" alt="user-photo">
               <input type="file" class="photo" id="photo-upload">
              </label>`;   
    info.element.appendChild(fieldsWrapper.element);
    info.element.appendChild(photoContainer.element);
    fieldsWrapper.element.appendChild(firstName.element);
    fieldsWrapper.element.appendChild(lastName.element);
    fieldsWrapper.element.appendChild(email.element);
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