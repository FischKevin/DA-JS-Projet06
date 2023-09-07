import { globalState } from '../utils/globalState.js';
import { displayMediaData } from '../pages/photographer.js';

// function to display and manage sort menu
function displaySortMenu() {
  const sortBlockOptions = document.querySelector('.options');
  const selectedOption = document.querySelector('.selected-option');

  if (sortBlockOptions.style.display === 'block') {
    sortBlockOptions.style.display = 'none';
    sortBlockOptions.classList.remove('open');
    selectedOption.classList.remove('open');
    selectedOption.setAttribute('aria-expanded', 'false');
  } else {
    sortBlockOptions.style.display = 'block';
    sortBlockOptions.classList.add('open');
    selectedOption.classList.add('open');
    selectedOption.setAttribute('aria-expanded', 'true');
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
  // Get the sorting criteria from the clicked option's data-value
  const sortingCriteria = clickedOption.dataset.value;

  sortAndDisplayMedia(sortingCriteria);

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

// function to sort and display media
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

// display sort menu on keyboard event
document
  .querySelector('.selected-option')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      displaySortMenu();
      event.preventDefault();
    }
  });

document.querySelectorAll('.option').forEach((optionElement) => {
  optionElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleOptionClick(event);
      displaySortMenu(); // Fermez le menu après avoir sélectionné une option
      event.preventDefault();
    }
  });
});

// // handle option selection on keyboard event
// document
//   .querySelector('.custom-select')
//   .addEventListener('keydown', (event) => {
//     if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
//       let current = Array.from(sortOptions).findIndex(
//         (option) => option === event.target
//       );
//       if (event.key === 'ArrowDown' && current < sortOptions.length - 1) {
//         sortOptions[current + 1].focus();
//       } else if (event.key === 'ArrowUp' && current > 0) {
//         sortOptions[current - 1].focus();
//       }
//       event.preventDefault();
//     }
//   });

document.querySelectorAll('.option').forEach((optionElement) => {
  optionElement.addEventListener('keydown', (event) => {
    let sortOptionsArray = Array.from(sortOptions);
    let currentIndex = sortOptionsArray.findIndex(
      (option) => option === event.target
    );

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      console.log('ArrowDown pressed');
      if (currentIndex < sortOptionsArray.length - 1) {
        sortOptionsArray[currentIndex + 1].focus();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      console.log('ArrowUp pressed');
      if (currentIndex > 0) {
        sortOptionsArray[currentIndex - 1].focus();
      }
    }
  });
});

// close sort menu on escape key
document
  .querySelector('.custom-select')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      displaySortMenu();
    }
  });
