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
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
    const contactTitleWording = document.getElementById(
      'contact-title-wording2'
    );
    const data = await getPhotographer();
    const photographer = data.photographer;
    contactTitleWording.innerText = `${photographer.name}`;
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
    modal.setAttribute('aria-hidden', 'true');
    contactButton.focus();
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

    // Show feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.innerText = 'Merci! Votre message a été envoyé.';
    feedbackDiv.style.position = 'fixed';
    feedbackDiv.style.top = '50%';
    feedbackDiv.style.left = '50%';
    feedbackDiv.style.transform = 'translate(-50%, -50%)';
    feedbackDiv.style.padding = '1rem';
    feedbackDiv.style.backgroundColor = 'var(--primary-color)';
    feedbackDiv.style.borderRadius = '5px';
    feedbackDiv.style.color = '#fff';
    document.body.appendChild(feedbackDiv);

    setTimeout(() => {
      feedbackDiv.remove();
    }, 3000);
  }
  form.addEventListener('submit', submitForm);

  // accessibility : close modal with escape key
  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      document.getElementById('contact_modal').style.display === 'block'
    )
      closeModal();
  });
});
