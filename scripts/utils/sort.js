import { globalState } from 'scripts/utils/globalState.js';
import { displayMediaData } from 'scripts/pages/photographer.js';

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

// handle display of sort menu
// define original content for each option
document.querySelectorAll('.option').forEach((option) => {
  option.setAttribute('data-original-content', option.textContent);
});
// add an event listener on the sort menu
document.querySelector('.custom-select').addEventListener('click', (event) => {
  if (event.target.classList.contains('option')) {
    const selectedOptionElem = document.querySelector('.selected-option');
    const clickedValue = event.target.dataset.value;

    // rebuild original content for each option
    document.querySelectorAll('.option').forEach((option) => {
      option.textContent = option.getAttribute('data-original-content');
    });

    // switch/case depending of the data-value of the clicked option
    switch (clickedValue) {
      case 'popularity':
        selectedOptionElem.textContent = 'Popularité';
        selectedOptionElem.dataset.value = 'popularity';

        document.querySelector(
          '.option[data-value="popularity"]'
        ).style.display = 'none';
        document.querySelector('.option[data-value="date"]').style.display =
          'block';
        document.querySelector('.option[data-value="title"]').style.display =
          'block';
        break;

      case 'date':
        selectedOptionElem.textContent = 'Date';
        selectedOptionElem.dataset.value = 'date';

        document.querySelector('.option[data-value="date"]').style.display =
          'none';
        document.querySelector(
          '.option[data-value="popularity"]'
        ).style.display = 'block';
        document.querySelector('.option[data-value="title"]').style.display =
          'block';
        break;

      case 'title':
        selectedOptionElem.textContent = 'Titre';
        selectedOptionElem.dataset.value = 'title';

        document.querySelector('.option[data-value="title"]').style.display =
          'none';
        document.querySelector('.option[data-value="date"]').style.display =
          'block';
        document.querySelector(
          '.option[data-value="popularity"]'
        ).style.display = 'block';
        break;
    }
    sortAndDisplayMedia(clickedValue);
  }
});

// sort menu : function to sort and display media
function sortAndDisplayMedia(criteria) {
  if (criteria === 'popularity') {
    globalState.media.sort((a, b) => b.likes - a.likes);
  } else if (criteria === 'date') {
    globalState.media.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === 'title') {
    globalState.media.sort((a, b) => a.title.localeCompare(b.title));
  }
  displayMediaData(globalState.media);
}
