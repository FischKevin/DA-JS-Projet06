/*global mediaFactory */
// import mediaFactory from "/scripts/factories/mediaFactory.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get("id");

export async function getPhotographer() {
  return fetch("./data/photographers.json")
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
  // const photographer = await getPhotographer(photographer);
  const picture = `./assets/images/photographers/00-Portraits/${photographerData.portrait}`;
  // creation of the picture
  const photographPicture = document.getElementById("photographPicture");
  photographPicture.setAttribute("src", picture);
  photographPicture.setAttribute("alt", photographerData.name);
  // creation of the name block
  const photographName = document.getElementById("photographName");
  photographName.textContent = photographerData.name;
  // creation of the city + country block
  const photographCityCountry = document.getElementById(
    "photographCityCountry"
  );
  photographCityCountry.textContent = `${photographerData.city}, ${photographerData.country}`;
  // creation of the tagline block
  const photographTagline = document.getElementById("photographTagline");
  photographTagline.textContent = photographerData.tagline;
  // creation of the like block
  const nbLike = document.getElementById("nbLike");
  nbLike.textContent = "nbLike";
  // creation of the price block
  const priceBlock = document.getElementById("priceBlock");
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

async function displayPriceAndLikeData(photographerData) {
  // const photographer = await getPhotographer();
  // creation of the like block
  const nbLike = document.getElementById("nbLike");
  nbLike.textContent = "nbLike ";
  //creation of heart icon
  const heart = document.createElement("i");
  heart.classList.add("fa-solid", "fa-heart");
  nbLike.appendChild(heart);
  // creation of the price block
  const priceBlock = document.getElementById("priceBlock");
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

async function displayMediaData(media) {
  const mediaSection = document.getElementById("media-section");

  media.forEach((mediaItem) => {
    const mediaModel = mediaFactory(mediaItem);
    const userMediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(userMediaDOM);
  });
}

async function init() {
  const { photographer, media } = await getPhotographer();
  displayPhotographData(photographer);
  displayPriceAndLikeData(photographer);
  displayMediaData(media);
}

init();
