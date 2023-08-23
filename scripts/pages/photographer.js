/*global mediaFactory */
import { mediaFactory } from '/scripts/factories/mediaFactory.js';

let media = [];

// get the photographer id part of the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

// fetch json to get photographers and media data
export async function getPhotographer() {
  return fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const photographer = data.photographers.find(
        (p) => p.id === parseInt(photographerId)
      );
      media = data.media.filter(
        (m) => m.photographerId === parseInt(photographerId)
      );
      return { photographer, media };
    });
}

// function to display photographer data in the header
async function displayPhotographData(photographerData) {
  const picture = `./assets/images/photographers/00-Portraits/${photographerData.portrait}`;
  const photographPicture = document.getElementById('photographPicture');
  photographPicture.setAttribute('src', picture);
  photographPicture.setAttribute('alt', photographerData.name);
  const photographName = document.getElementById('photographName');
  photographName.textContent = photographerData.name;
  const photographCityCountry = document.getElementById(
    'photographCityCountry'
  );
  photographCityCountry.textContent = `${photographerData.city}, ${photographerData.country}`;
  const photographTagline = document.getElementById('photographTagline');
  photographTagline.textContent = photographerData.tagline;
  const nbLike = document.getElementById('nbLike');
  nbLike.textContent = 'nbLike';
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

// function to add every likes on medias and return it
function getTotalLikesCount() {
  const pictureLikesElements = document.querySelectorAll('.nblikes');
  let totalLikesCount = 0;

  pictureLikesElements.forEach((pictureLikes) => {
    const likesCount = parseInt(pictureLikes.textContent);
    totalLikesCount += likesCount;
  });
  return totalLikesCount;
}

// function to display the price and like block at the bottom of the page
async function displayPriceAndLikeData(photographerData) {
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

// funtion to display media galery and total like number
async function displayMediaData(media) {
  const mediaSection = document.getElementById('media-section');
  mediaSection.innerHTML = '';
  media.forEach((mediaItem) => {
    const mediaModel = mediaFactory(mediaItem);
    const userMediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(userMediaDOM);
  });
  const nbLike = document.getElementById('nbLike');
  const totalLikesCount = getTotalLikesCount();
  nbLike.textContent = totalLikesCount;
}

// function to display and manage sort menu
function displaySortMenu() {
  const sortBlockOptions = document.querySelector('.options');
  const selectedOption = document.querySelector('.selected-option');
  if (sortBlockOptions.style.display === 'block') {
    sortBlockOptions.style.display = 'none';
    sortBlockOptions.classList.remove('open');
    selectedOption.classList.remove('open');
  } else {
    sortBlockOptions.style.display = 'block';
    sortBlockOptions.classList.add('open');
    selectedOption.classList.add('open');
  }
}

// function to handle option selection in sort menu
function handleOptionClick(event) {
  const selectedOption = document.querySelector('.selected-option');
  const clickedOption = event.target;
  // switch text between the selected one and the clicked one
  const tempText = selectedOption.textContent;
  selectedOption.textContent = clickedOption.textContent;
  clickedOption.textContent = tempText;
  displaySortMenu();
}
// each time an option is selected, handleOptionClick managed sort menu
document
  .querySelector('.selected-option')
  .addEventListener('click', displaySortMenu);
const sortOptions = document.querySelectorAll('.option');
sortOptions.forEach((sortOptions) => {
  sortOptions.addEventListener('click', handleOptionClick);
});

// add an event listener on the sort menu
document.querySelector('.custom-select').addEventListener('click', (event) => {
  if (event.target.classList.contains('option')) {
    // get the value from the clicked option
    const sortBy = event.target.dataset.value;
    // sort medias
    sortAndDisplayMedia(media, sortBy);
  }
});

// function to sort and display media
function sortAndDisplayMedia(media, criteria) {
  if (criteria === 'popularity') {
    media.sort((a, b) => b.likes - a.likes);
  } else if (criteria === 'date') {
    media.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === 'title') {
    media.sort((a, b) => a.title.localeCompare(b.title));
  }
  displayMediaData(media);
}

async function init() {
  const { photographer, media: retrievedMedia } = await getPhotographer();
  media = retrievedMedia.sort((a, b) => b.likes - a.likes);
  displayPhotographData(photographer);
  displayPriceAndLikeData(photographer);
  displayMediaData(media);
}

init();
