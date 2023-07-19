/*global photographerFactory */
const photographHeader = document.querySelector('.photograph-header');
const mainDiv = document.querySelector('#main');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

async function getPhotographer() {
  return fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const photographer = data.photographers.find(
        (p) => p.id === parseInt(photographerId)
      );
      return {
        photographer: photographer,
      };
    });
}

// function to create elements on the header of photograper page
function getUserHeaderDOM(name, city, country, tagline, picture) {
  const container = document.createElement('div');
  container.classList.add('photographInfo');
  // creation of the picture
  const img = document.createElement('img');
  img.setAttribute('src', picture);
  img.setAttribute('alt', name);
  photographHeader.appendChild(img);
  // creation of the name block
  const h2 = document.createElement('h2');
  h2.textContent = name;
  container.appendChild(h2);
  // creation of the city + country block
  const h3 = document.createElement('h3');
  h3.textContent = `${city}, ${country}`;
  container.appendChild(h3);
  // creation of the tagline block
  const h4 = document.createElement('h4');
  h4.textContent = tagline;
  container.appendChild(h4);
  // addition of previous elements in photographHeader block
  photographHeader.appendChild(container);
  return container;
}

// function to create price and like element of photograper page
function getUserPriceLikeDOM(price) {
  const photographPriceLike = document.createElement('span');
  photographPriceLike.className = 'price-and-like';
  // creation of the like block
  const nblike = document.createElement('h5');
  nblike.textContent = 'nbLike';
  const likeHeart = document.createElement('i');
  likeHeart.classList.add('fa-solid', 'fa-heart');
  // creation of the price block
  const h5 = document.createElement('h5');
  h5.textContent = `${price}€ / jour`;
  // addition of previous elements in photographPriceLike block
  photographPriceLike.appendChild(nblike);
  nblike.appendChild(likeHeart);
  photographPriceLike.appendChild(h5);
  return photographPriceLike;
}

async function displayData(photographer) {
  const photographHeader = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer.photographer);
  const userHeaderDOM = getUserHeaderDOM(
    photographerModel.name,
    photographerModel.city,
    photographerModel.country,
    photographerModel.tagline,
    photographerModel.picture
  );
  photographHeader.appendChild(userHeaderDOM);

  const userPriceLikeDOM = getUserPriceLikeDOM(photographerModel.price);
  mainDiv.appendChild(userPriceLikeDOM);
}

async function init() {
  const photographer = await getPhotographer(photographerId);
  displayData(photographer);
}

init();
