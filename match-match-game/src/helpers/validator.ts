export function validate() {  
  validateFirstName();
  validateLastName();
  validateEmail();
}

export function clearForm() {
  const firstName = <HTMLInputElement>document.querySelector('.first-name');
  const lastName = <HTMLInputElement>document.querySelector('.last-name');
  const email = <HTMLInputElement>document.querySelector('.e-mail');
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  setErrorFor(firstName, 'First name cannot be blank');
  setErrorFor(lastName, 'Last name cannot be blank');
  setErrorFor(email, 'E-mail cannot be blank');
}

function validateFirstName() {
  const firstName = <HTMLInputElement>document.querySelector('.first-name');
  if (!firstName.value)  {
    setErrorFor(firstName, 'First name cannot be blank');
	} else if (firstName.value.length > 30) {
    setErrorFor(firstName, 'First name must not exceed 30 characters');
  } else if (!isNameValid(firstName.value)) {
    setErrorFor(firstName, 'Not a valid first name');
  } else {
		setSuccessFor(firstName);
	}
}

function validateLastName() {
  const lastName = <HTMLInputElement>document.querySelector('.last-name');
  if (!lastName.value)  {
    setErrorFor(lastName, 'Last name cannot be blank');
	} else if (lastName.value.length > 30) {
    setErrorFor(lastName, 'Last name must not exceed 30 characters');
  } else if (!isNameValid(lastName.value)) {
    setErrorFor(lastName, 'Not a valid last name');
  } else {
		setSuccessFor(lastName);
	}
}

function validateEmail() {
  const email = <HTMLInputElement>document.querySelector('.e-mail');
  if (!email.value)  {
    setErrorFor(email, 'E-mail cannot be blank');
	} else if (email.value.length > 30) {
    setErrorFor(email, 'E-mail must not exceed 30 characters');
  } else if (!isEmailValid(email.value)) {
    setErrorFor(email, 'Not a valid e-mail');
  } else {
		setSuccessFor(email);
	}  
}

function setErrorFor(input: HTMLInputElement, message: string) {
  const submit = <HTMLInputElement>document.querySelector('.btn-submit');
  const formControl = <HTMLElement>input.parentElement;
  const small = <HTMLElement>formControl.querySelector('small');
  formControl.className = 'field-container error';
  small.innerText = message;
  submit.setAttribute('disabled', '');
  submit.classList.add('btn-disabled');
}

function setSuccessFor(input: HTMLInputElement) {
  const submit = <HTMLInputElement>document.querySelector('.btn-submit');
  const formControl = <HTMLElement>input.parentElement;
  formControl.className = 'field-container success';
  submit.removeAttribute('disabled');
  submit.classList.remove('btn-disabled');
}

function isNameValid(name: string) {
  const regName = /^(?=.*[a-z])[a-zA-Z0-9]{2,30}$/;
  return regName.test(name);
}

function isEmailValid(email: string) {
  const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regEmail.test(email);
}