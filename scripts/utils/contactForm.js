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
      // Récupérez le nom du photographe et mettez-le dans le message
      contactTitleWording.innerText = `${photographer.name}`;
    });
  }

  function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
  }

  // Ajouter un gestionnaire d'événements au bouton "Contactez-moi"
  const contactButton = document.getElementById('contactButton');
  contactButton.addEventListener('click', displayModal);

  // ... (autres fonctions et codes, le cas échéant)
});
