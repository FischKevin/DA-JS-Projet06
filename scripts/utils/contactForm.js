/* exported displayModal */
/* exported closeModal */
import { getPhotographer } from '/scripts/pages/photographer.js';

document.addEventListener('DOMContentLoaded', () => {
  function displayModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
    const contactTitleWording = document.getElementById(
      'contact-title-wording2'
    );
    getPhotographer().then((photographer) => {
      contactTitleWording.innerText = `${photographer.name}`;
    });

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    lastName.value = '';
    firstName.value = '';
    email.value = '';
    message.value = '';
  }
  const contactButton = document.getElementById('contactButton');
  contactButton.addEventListener('click', displayModal);
});

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

const closeCross = document.getElementById('closeCross');
closeCross.addEventListener('click', closeModal);
