import { globalState } from '../utils/globalState.js';
import { displayMediaData } from '../pages/photographer.js';

// toggle the display state of the sort menu options
function displaySortMenu() {
  const sortBlockOptions = document.querySelector('.options');
  const selectedOption = document.querySelector('.selected-option');

  // check if the sort options are currently visible
  if (sortBlockOptions.style.display === 'block') {
    sortBlockOptions.style.display = 'none';
    sortBlockOptions.style.visibility = 'hidden';
    sortBlockOptions.classList.remove('open');
    selectedOption.classList.remove('open');
    selectedOption.setAttribute('aria-expanded', 'false');
  } else {
    sortBlockOptions.style.display = 'block';
    sortBlockOptions.style.visibility = 'visible';
    sortBlockOptions.classList.add('open');
    selectedOption.classList.add('open');
    selectedOption.setAttribute('aria-expanded', 'true');
  }
  // focus on the selected option
  selectedOption.focus();
}

// handle the selection of a sort option and triggers the sort operation
function handleOptionClick(event) {
  const selectedOption = document.querySelector('.selected-option');
  const clickedOption = event.target;
  // swap the display text of the selected and clicked options
  const tempText = selectedOption.textContent;
  selectedOption.textContent = clickedOption.textContent;
  clickedOption.textContent = tempText;
  // extract the desired sorting criteria from the clicked option
  const sortingCriteria = clickedOption.dataset.value;
  // perform the sort operation
  sortAndDisplayMedia(sortingCriteria);

  // hide the sort menu options after making a selection
  displaySortMenu();
}
// attach click event listeners for the sort menu and options
document
  .querySelector('.selected-option')
  .addEventListener('click', displaySortMenu);
const sortOptions = document.querySelectorAll('.option');
sortOptions.forEach((sortOptions) => {
  sortOptions.addEventListener('click', handleOptionClick);
});

// store the original text content for each option
document.querySelectorAll('.option').forEach((option) => {
  option.setAttribute('data-original-content', option.textContent);
});
// add event listener to handle changes in the sort menu
document.querySelector('.custom-select').addEventListener('click', (event) => {
  if (event.target.classList.contains('option')) {
    const selectedOptionElem = document.querySelector('.selected-option');
    const clickedValue = event.target.dataset.value;
    // restore original text content for each option
    document.querySelectorAll('.option').forEach((option) => {
      option.textContent = option.getAttribute('data-original-content');
    });

    // depending on the clicked value (clickedValue), adjust the content, attributes, and visibility of the corresponding elements
    switch (clickedValue) {
      case 'popularity':
        // update the content and attributes of the selected element to reflect popularity
        selectedOptionElem.textContent = 'Popularité';
        selectedOptionElem.dataset.value = 'popularity';
        selectedOptionElem.setAttribute('aria-label', 'Trier par popularité');

        // hide the popularity option since it's already selected
        document.querySelector(
          '.option[data-value="popularity"]'
        ).style.display = 'none';
        document
          .querySelector('.option[data-value="popularity"]')
          .setAttribute('tabindex', '-1');

        // show the date option and make it focusable
        document.querySelector('.option[data-value="date"]').style.display =
          'block';
        document
          .querySelector('.option[data-value="date"]')
          .setAttribute('tabindex', '0');
        document
          .querySelector('.option[data-value="date"]')
          .setAttribute('aria-label', 'Trier par date');

        // show the title option and make it focusable
        document.querySelector('.option[data-value="title"]').style.display =
          'block';
        document
          .querySelector('.option[data-value="title"]')
          .setAttribute('tabindex', '0');
        document
          .querySelector('.option[data-value="title"]')
          .setAttribute('aria-label', 'Trier par titre');
        break;

      case 'date':
        // update the content and attributes of the selected element to reflect date
        selectedOptionElem.textContent = 'Date';
        selectedOptionElem.dataset.value = 'date';
        selectedOptionElem.setAttribute('aria-label', 'Trier par date');

        // hide the date option since it's already selected
        document.querySelector('.option[data-value="date"]').style.display =
          'none';
        document
          .querySelector('.option[data-value="date"]')
          .setAttribute('tabindex', '-1');

        // show the popularity option and make it focusable
        document.querySelector(
          '.option[data-value="popularity"]'
        ).style.display = 'block';
        document
          .querySelector('.option[data-value="popularity"]')
          .setAttribute('tabindex', '0');
        document
          .querySelector('.option[data-value="popularity"]')
          .setAttribute('aria-label', 'Trier par popularité');

        // show the title option and make it focusable
        document.querySelector('.option[data-value="title"]').style.display =
          'block';
        document
          .querySelector('.option[data-value="title"]')
          .setAttribute('tabindex', '0');
        document
          .querySelector('.option[data-value="title"]')
          .setAttribute('aria-label', 'Trier par titre');
        break;

      case 'title':
        // update the content and attributes of the selected element to reflect title
        selectedOptionElem.textContent = 'Titre';
        selectedOptionElem.dataset.value = 'title';
        selectedOptionElem.setAttribute('aria-label', 'Trier par titre');

        // hide the title option since it's already selected
        document.querySelector('.option[data-value="title"]').style.display =
          'none';
        document
          .querySelector('.option[data-value="title"]')
          .setAttribute('tabindex', '-1');

        // show the date option and make it focusable
        document.querySelector('.option[data-value="date"]').style.display =
          'block';
        document
          .querySelector('.option[data-value="date"]')
          .setAttribute('tabindex', '0');
        document
          .querySelector('.option[data-value="date"]')
          .setAttribute('aria-label', 'Trier par date');

        // show the popularity option and make it focusable
        document.querySelector(
          '.option[data-value="popularity"]'
        ).style.display = 'block';
        document
          .querySelector('.option[data-value="popularity"]')
          .setAttribute('tabindex', '0');
        document
          .querySelector('.option[data-value="popularity"]')
          .setAttribute('aria-label', 'Trier par popularité');
        break;
    }
    // perform the sort operation based on the clicked value
    sortAndDisplayMedia(clickedValue);
  }
});

// sort the media data based on the given criteria and displays the sorted media
function sortMedia(criteria) {
  // sort the media based on the specified criteria
  switch (criteria) {
    case 'popularity':
      return globalState.media.sort((a, b) => b.likes - a.likes);
    case 'date':
      return globalState.media.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    case 'title':
      return globalState.media.sort((a, b) => a.title.localeCompare(b.title));
    default:
      console.error('Unknown sorting criteria:', criteria);
      // Return the unsorted media if criteria is unrecognized
      return globalState.media;
  }
}

// sort and display the media based on the given criteria
export function sortAndDisplayMedia(criteria) {
  const sortedMedia = sortMedia(criteria);
  displayMediaData(sortedMedia);
}

// add keyboard support for toggling the sort menu
document
  .querySelector('.selected-option')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      displaySortMenu();
      event.preventDefault();
    }
  });

// handle option selection with 'Enter' key
document.querySelectorAll('.option').forEach((optionElement) => {
  optionElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleOptionClick(event);
      // close menu after click
      const sortBlockOptions = document.querySelector('.options');
      sortBlockOptions.style.display = 'none';

      // put focus on selected option
      const selectedOption = document.querySelector('.selected-option');
      selectedOption.focus();

      event.preventDefault();
    }
  });
});

// handle keyboard navigation within the sort menu using arrow keys
document.querySelectorAll('.option').forEach((optionElement) => {
  optionElement.addEventListener('keydown', (event) => {
    let sortOptionsArray = Array.from(sortOptions);
    let currentIndex = sortOptionsArray.findIndex(
      (option) => option === event.target
    );

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (currentIndex < sortOptionsArray.length - 1) {
        sortOptionsArray[currentIndex + 1].focus();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (currentIndex > 0) {
        sortOptionsArray[currentIndex - 1].focus();
      }
    }
  });
});

// close the sort menu when the 'Escape' key is pressed
document
  .querySelector('.custom-select')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      displaySortMenu();
    }
  });
