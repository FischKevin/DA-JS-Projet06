let media = [];

// get the photographer id part of the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

// fetch json to get photographers and media data
// export async function getPhotographer() {
async function getPhotographer() {
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

// function to display media galery and total like number, and attach event listeners
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

  document
    .getElementById('media-section')
    .addEventListener('click', getMediaCollectionSize);
  document
    .getElementById('media-section')
    .addEventListener('click', getMediaClickedIndex);
}

// function to get the size of the media collection
function getMediaCollectionSize() {
  const mediaCollection = document.querySelectorAll('.photographerMedia');
  console.log(mediaCollection.length);
  return mediaCollection.length;
}

// function to get the index of the media clicked
function getMediaClickedIndex(event) {
  const mediaCollection = document.querySelectorAll('.photographerMedia');
  const mediaClicked = event.target;
  const mediaClickedIndex = Array.from(mediaCollection).indexOf(mediaClicked);
  console.log(mediaClickedIndex);
  return mediaClickedIndex;
}

// function to sort and display media
async function init() {
  const { photographer, media: retrievedMedia } = await getPhotographer();
  media = retrievedMedia.sort((a, b) => b.likes - a.likes);
  displayPhotographData(photographer);
  displayPriceAndLikeData(photographer);
  displayMediaData(media);
}

init();
