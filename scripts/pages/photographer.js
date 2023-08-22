/*global mediaFactory */
import { mediaFactory } from '/scripts/factories/mediaFactory.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

export async function getPhotographer() {
  return fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const photographer = data.photographers.find(
        (p) => p.id === parseInt(photographerId)
      );
      const media = data.media.filter(
        (m) => m.photographerId === parseInt(photographerId)
      );
      return { photographer, media };
    });
}

async function displayPhotographData(photographerData) {
  const picture = `./assets/images/photographers/00-Portraits/${photographerData.portrait}`;
  // creation of the picture
  const photographPicture = document.getElementById('photographPicture');
  photographPicture.setAttribute('src', picture);
  photographPicture.setAttribute('alt', photographerData.name);
  // creation of the name block
  const photographName = document.getElementById('photographName');
  photographName.textContent = photographerData.name;
  // creation of the city + country block
  const photographCityCountry = document.getElementById(
    'photographCityCountry'
  );
  photographCityCountry.textContent = `${photographerData.city}, ${photographerData.country}`;
  // creation of the tagline block
  const photographTagline = document.getElementById('photographTagline');
  photographTagline.textContent = photographerData.tagline;
  // creation of the like block
  const nbLike = document.getElementById('nbLike');
  nbLike.textContent = 'nbLike';
  // creation of the price block
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

function getTotalLikesCount() {
  const pictureLikesElements = document.querySelectorAll('.nblikes');
  let totalLikesCount = 0;

  pictureLikesElements.forEach((pictureLikes) => {
    const likesCount = parseInt(pictureLikes.textContent);
    totalLikesCount += likesCount;
  });

  return totalLikesCount;
}

async function displayPriceAndLikeData(photographerData) {
  // creation of the price block
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

async function displayMediaData(media) {
  const mediaSection = document.getElementById('media-section');

  media.forEach((mediaItem) => {
    const mediaModel = mediaFactory(mediaItem);
    const userMediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(userMediaDOM);
  });

  const nbLike = document.getElementById('nbLike');
  const totalLikesCount = getTotalLikesCount();
  nbLike.textContent = totalLikesCount;
}

function displaySortMenu() {
  const sortBlockOptions = document.querySelector('.options');

  // Toggle l'affichage des options
  if (sortBlockOptions.style.display === 'block') {
    sortBlockOptions.style.display = 'none';
  } else {
    sortBlockOptions.style.display = 'block';
  }
}

const sortBlockSelect = document.querySelector('.selected-option');
sortBlockSelect.addEventListener('click', displaySortMenu);

const options = document.querySelectorAll('.option');
options.forEach((option) => {
  option.addEventListener('click', function () {
    // Sauvegarder le texte actuel de l'élément selected-option
    const currentSelectedText = sortBlockSelect.textContent;

    // Mettre à jour le texte de 'selected-option' avec le texte de l'option cliquée
    sortBlockSelect.textContent = this.textContent;

    // Mettre à jour l'option cliquée avec le texte sauvegardé
    this.textContent = currentSelectedText;

    // Masquer les options après avoir sélectionné une option
    this.closest('.options').style.display = 'none';
  });
});

async function init() {
  const { photographer, media } = await getPhotographer();
  displayPhotographData(photographer);
  displayPriceAndLikeData(photographer);
  displayMediaData(media);
}

init();
