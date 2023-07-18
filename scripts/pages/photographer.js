/*global photographerFactory */
const photographHeader = document.querySelector('.photograph-header');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

async function getPhotographer() {
  return fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      console.log('ID récupéré :', photographerId);
      const photographer = data.photographers.find(
        (p) => p.id === parseInt(photographerId)
      );
      console.log('Photographe trouvé :', photographer);
      return {
        photographer: photographer,
      };
    });
}

// function to create elements on the header of photograper page
function getUserHeaderDOM(name, city, country, tagline, picture) {
  const container = document.createElement('div');
  // creation of the picture
  const img = document.createElement('img');
  img.setAttribute('src', picture);
  img.setAttribute('alt', name);
  container.appendChild(img);
  // creation of the name block
  const h2 = document.createElement('h2');
  h2.textContent = name;
  container.appendChild(h2);
  console.log('h2:', h2.textContent);
  console.log('name:', name);
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

  console.log('Retour de container', container);
  return container;
}

// function to create price and like element of photograper page
function getUserPriceLikeDOM(price) {
  const photographPriceLike = document.createElement('div');
  // creation of the price block
  const h5 = document.createElement('h5');
  h5.textContent = `${price}€/jour`;
  // addition of previous elements in photographPriceLike block
  photographPriceLike.appendChild(h5);
  return photographPriceLike;
}

async function displayData(photographer) {
  const photographHeader = document.querySelector('.photograph-header');
  console.log('Donnée récupérée dans displayData:', photographer);
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
  const photographerPriceLikeContainer = document.createElement('div');
  photographHeader.appendChild(photographerPriceLikeContainer);
  photographerPriceLikeContainer.appendChild(userPriceLikeDOM);
}

async function init() {
  const photographer = await getPhotographer(photographerId);
  displayData(photographer);
  console.log('Donnée récupérée dans init:', photographer);
}

init();
