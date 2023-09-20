import { globalState } from '../utils/globalState.js';
import { displayMediaData } from '../pages/photographer.js';

// toggle the display state of the sort menu options
function displaySortMenu() {
  const sortBlockOptions = document.querySelector('.options');
  const selectedOption = document.querySelector('.selected-option');

  // check if the sort options are currently visible
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

    // handle sort menu state based on the clicked option's value
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
    // perform the sort operation based on the clicked value
    sortAndDisplayMedia(clickedValue);
  }
});

// sort the media data based on the given criteria and displays the sorted media
function sortAndDisplayMedia(criteria) {
  // sort the media based on the specified criteria
  if (criteria === 'popularity') {
    globalState.media.sort((a, b) => b.likes - a.likes);
  } else if (criteria === 'date') {
    globalState.media.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === 'title') {
    globalState.media.sort((a, b) => a.title.localeCompare(b.title));
  }
  // display the sorted media
  displayMediaData(globalState.media);
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

// close the sort menu when the 'Escape' key is pressed
document
  .querySelector('.custom-select')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      displaySortMenu();
    }
  });
