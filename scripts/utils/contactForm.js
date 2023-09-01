import { getPhotographer } from '/scripts/pages/photographer.js';

document.addEventListener('DOMContentLoaded', () => {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const contactButton = document.getElementById('contactButton');
  const form = document.getElementById('contactForm');

  // function do display contact modal
  async function displayModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
    const contactTitleWording = document.getElementById(
      'contact-title-wording2'
    );
    const data = await getPhotographer();
    const photographer = data.photographer;
    contactTitleWording.innerText = `${photographer.name}`;
    console.log(photographer.name);
  }
  contactButton.addEventListener('click', displayModal);

  // function to close contact modal
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

  // function to submit form
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
  form.addEventListener('submit', submitForm);
});
