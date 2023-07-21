/* exported displayModal */
/* exported closeModal */
import { getPhotographer } from '/scripts/pages/photographer.js';

document.addEventListener('DOMContentLoaded', () => {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const contactButton = document.getElementById('contactButton');
  const submitButton = document.getElementById('submit_button');

  function displayModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
    const contactTitleWording = document.getElementById(
      'contact-title-wording2'
    );
    getPhotographer().then((photographer) => {
      contactTitleWording.innerText = `${photographer.name}`;
    });
  }
  contactButton.addEventListener('click', displayModal);

  function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    lastName.value = '';
    firstName.value = '';
    email.value = '';
    message.value = '';
  }
  const closeCross = document.getElementById('closeCross');
  closeCross.addEventListener('click', closeModal);

  function submitForm(event) {
    event.preventDefault();
    const formResult = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      message: message.value,
    };
    console.log(formResult);
    closeModal();
  }
  submitButton.addEventListener('click', submitForm);
});
