import { photographerFactory } from '/scripts/factories/photographerFactory.js';

//function to get data from photographers.json
async function getPhotographers() {
  return fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((data) => data.photographers);
}

//function to create a photographer object
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

//function to init the page
async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
