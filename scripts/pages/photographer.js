// /*global photographerFactory */
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
      return photographer;
    });
}

async function displayPhotographData() {
  const photographer = await getPhotographer();
  const picture = `./assets/images/photographers/00-Portraits/${photographer.portrait}`;
  // creation of the picture
  const photographPicture = document.getElementById('photographPicture');
  photographPicture.setAttribute('src', picture);
  photographPicture.setAttribute('alt', photographer.name);
  // creation of the name block
  const photographName = document.getElementById('photographName');
  photographName.textContent = photographer.name;
  // creation of the city + country block
  const photographCityCountry = document.getElementById(
    'photographCityCountry'
  );
  photographCityCountry.textContent = `${photographer.city}, ${photographer.country}`;
  // creation of the tagline block
  const photographTagline = document.getElementById('photographTagline');
  photographTagline.textContent = photographer.tagline;
  // creation of the like block
  const nbLike = document.getElementById('nbLike');
  nbLike.textContent = 'nbLike';
  // creation of the price block
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographer.price}€ / jour`;
}

async function displayPriceAndLikeData() {
  const photographer = await getPhotographer();
  // creation of the like block
  const nbLike = document.getElementById('nbLike');
  nbLike.textContent = 'nbLike ';
  //creation of heart icon
  const heart = document.createElement('i');
  heart.classList.add('fa-solid', 'fa-heart');
  nbLike.appendChild(heart);
  // creation of the price block
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographer.price}€ / jour`;
}

async function init() {
  displayPhotographData();
  displayPriceAndLikeData();
}

init();
