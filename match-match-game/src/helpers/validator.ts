export function validate() {
  const firstName = <HTMLInputElement>document.querySelector('.first-name');
  const lastName = <HTMLInputElement>document.querySelector('.last-name');
  const email = <HTMLInputElement>document.querySelector('.e-mail');  
  
  if (!firstName.value)  {
    setErrorFor(firstName, 'First name cannot be blank');
	} else if (!isNameValid(firstName.value)) {
    setErrorFor(firstName, 'Not a valid first name');
  } else {
		setSuccessFor(firstName);
	}

  if (!lastName.value)  {
    setErrorFor(lastName, 'Last name cannot be blank');
	} else {
		setSuccessFor(lastName);
	}

  if (!email.value)  {
    setErrorFor(email, 'E-mail cannot be blank');
	} else if (!isEmailValid(email.value)) {
    setErrorFor(email, 'Not a valid e-mail');
  } else {
		setSuccessFor(email);
	}

  function setErrorFor(input: HTMLInputElement, message: string) {
    const formControl = <HTMLElement>input.parentElement;
    const small = <HTMLElement>formControl.querySelector('small');
    formControl.className = 'field-container error';
    small.innerText = message;
  }

  function setSuccessFor(input: HTMLInputElement) {
    const formControl = <HTMLElement>input.parentElement;
    formControl.className = 'field-container success';
  }
}

function isNameValid(name: string) {
  const regName = /^(?=.*[a-z])[a-zA-Z0-9]+$/;
  return regName.test(name);
}

function isEmailValid(email: string) {
  const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  console.log(regEmail.test(email));
  return regEmail.test(email);
}