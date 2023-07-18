/*global photographerFactory */
async function getPhotographers() {
  return fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((data) => data.photographers);
}

// function to create elements on the homepage
function getUserCardDOM(id, name, city, country, tagline, price, picture) {
  //creation of article block
  const article = document.createElement('article');
  // creation of link around the picture
  const pictureLink = document.createElement('a');
  pictureLink.setAttribute('href', `./photographer.html?id=${id}`);
  pictureLink.setAttribute('role', 'link');
  pictureLink.setAttribute('aria-label', `${name}`);
  // creation of a wrapper around the picture to resize picture
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  // creation of the picture
  const img = document.createElement('img');
  img.setAttribute('src', picture);
  img.setAttribute('alt', `${name}`);
  // creation of the name block
  const h2 = document.createElement('h2');
  h2.textContent = name;
  // creation of the city + country block
  const h3 = document.createElement('h3');
  h3.textContent = `${city}, ${country}`;
  // creation of the tagline block
  const h4 = document.createElement('h4');
  h4.textContent = tagline;
  // creation of the price block
  const h5 = document.createElement('h5');
  h5.textContent = `${price}€/jour`;
  // addition of picture in wrapper block
  wrapper.appendChild(img);
  // addition of wrapper in pictureLink block
  pictureLink.appendChild(wrapper);
  // addition of previous elements in article block
  article.appendChild(pictureLink);
  article.appendChild(h2);
  article.appendChild(h3);
  article.appendChild(h4);
  article.appendChild(h5);
  return article;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = getUserCardDOM(
      photographerModel.id,
      photographerModel.name,
      photographerModel.city,
      photographerModel.country,
      photographerModel.tagline,
      photographerModel.price,
      photographerModel.picture
    );
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
