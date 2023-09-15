import { getMediaCollectionSize } from '../pages/photographer.js';
import { globalState } from '../utils/globalState.js';

let lightBoxModalCloseButton = null;

// function to open lightbox and display ui
export function showMediaInLightbox(src, title, type = 'image') {
  const lightBoxModal = document.createElement('div');
  lightBoxModal.setAttribute('role', 'modal');
  lightBoxModal.setAttribute('id', 'lightBox');
  lightBoxModal.className = 'lightBox_Modal';
  const lightBoxModalClose = document.createElement('i');
  lightBoxModalClose.className = 'lightBoxModalClose';
  lightBoxModalClose.setAttribute('id', 'lightBoxModalClose');
  lightBoxModalClose.setAttribute('role', 'button');
  lightBoxModalClose.setAttribute('aria-label', 'Fermer la lightbox');
  lightBoxModalClose.setAttribute('tabindex', '-1');
  lightBoxModalClose.classList.add('fa-solid');
  lightBoxModalClose.classList.add('fa-close');
  const lightBoxContent = document.createElement('div');
  lightBoxContent.className = 'lightBoxContent';
  const lightBoxPrev = document.createElement('i');
  lightBoxPrev.className = 'lightBoxPrev';
  lightBoxPrev.classList.add('fa-solid');
  lightBoxPrev.classList.add('fa-chevron-left');
  lightBoxPrev.setAttribute('aria-label', 'Image précédente');
  lightBoxPrev.setAttribute('role', 'button');
  lightBoxPrev.setAttribute('tabindex', '0');
  lightBoxPrev.addEventListener('click', showPreviousMediaInLightBox);
  const lightBoxPicture = document.createElement('figure');
  lightBoxPicture.className = 'lightBoxPicture';
  // lightBoxPicture.setAttribute('tabindex', '0');

  // display image or video depending on the source
  if (type === 'image') {
    const lightBoxPictureSource = document.createElement('img');
    lightBoxPictureSource.setAttribute('src', src);
    lightBoxPictureSource.setAttribute('alt', title);
    lightBoxPictureSource.setAttribute('aria-label', title);
    // lightBoxPictureSource.setAttribute('tabindex', '0');
    lightBoxPictureSource.className = 'lightBoxPictureSource';
    lightBoxPicture.appendChild(lightBoxPictureSource);
  } else if (type === 'video') {
    const lightBoxVideo = document.createElement('video');
    lightBoxVideo.setAttribute('controls', '');
    const lightBoxVideoSource = document.createElement('source');
    lightBoxVideoSource.setAttribute('src', src);
    lightBoxVideoSource.setAttribute('type', 'video/mp4');
    lightBoxVideo.setAttribute('aria-label', title);
    // lightBoxVideo.setAttribute('tabindex', '0');
    lightBoxVideo.appendChild(lightBoxVideoSource);
    lightBoxPicture.appendChild(lightBoxVideo);
  }

  const lightBoxPictureCaption = document.createElement('figcaption');
  lightBoxPictureCaption.innerHTML = title;
  lightBoxPictureCaption.className = 'lightBoxPictureCaption';
  lightBoxPictureCaption.setAttribute('tabindex', '0');
  lightBoxPictureCaption.setAttribute('role', 'button');
  const lightBoxNext = document.createElement('i');
  lightBoxNext.className = 'lightBoxNext';
  lightBoxNext.classList.add('fa-solid');
  lightBoxNext.classList.add('fa-chevron-right');
  lightBoxNext.setAttribute('aria-label', 'Image suivante');
  lightBoxNext.setAttribute('role', 'button');
  lightBoxNext.setAttribute('tabindex', '0');
  lightBoxNext.addEventListener('click', showNextMediaInLightBox);
  document.body.appendChild(lightBoxModal);
  lightBoxModal.appendChild(lightBoxContent);
  lightBoxContent.appendChild(lightBoxModalClose);
  lightBoxContent.appendChild(lightBoxPrev);
  lightBoxContent.appendChild(lightBoxPicture);
  lightBoxContent.appendChild(lightBoxNext);
  lightBoxPicture.appendChild(lightBoxPictureCaption);

  lightBoxPictureCaption.focus();

  // make elements outside of the lightbox not focusable, readable, and selectable
  let elementsList = [
    'header',
    'main',
    '.footer',
    '.photographerMedia',
    '.likeHeart',
  ];

  for (let selector of elementsList) {
    let elements = document.querySelectorAll(selector);
    for (let elem of elements) {
      elem.setAttribute('tabindex', '-1');
      elem.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelector('header').setAttribute('aria-hidden', 'true');
  document.querySelector('main').setAttribute('aria-hidden', 'true');
  document.querySelector('header').setAttribute('tabindex', '-1');
  document.querySelector('main').setAttribute('tabindex', '-1');

  lightBoxModalCloseButton = lightBoxModal.querySelector('.lightBoxModalClose');
  lightBoxModalCloseButton.addEventListener('click', closeLightBox);
  document.addEventListener('keydown', handleKeyDown);
}

// keyboard navigation
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    showPreviousMediaInLightBox();
  } else if (e.key === 'ArrowRight') {
    showNextMediaInLightBox();
  }
});

// remove event listeners
function removeLightBoxListeners() {
  if (lightBoxModalCloseButton) {
    lightBoxModalCloseButton.removeEventListener('click', closeLightBox);
    lightBoxModalCloseButton = null;
  }
}

// function to close the lightbox
function closeLightBox() {
  const lightBox = document.getElementById('lightBox');
  if (lightBox) {
    lightBox.remove();
    removeLightBoxListeners();
    document.removeEventListener('keydown', handleKeyDown);
  }
  const firstMediaElement = document.querySelector('.photographerMedia');
  if (firstMediaElement) {
    firstMediaElement.focus();
  }

  let elementsList = [
    'header',
    'main',
    '.footer',
    '.photographerMedia',
    '.likeHeart',
  ];

  for (let selector of elementsList) {
    let elements = document.querySelectorAll(selector);
    for (let elem of elements) {
      elem.setAttribute('tabindex', '0');
      elem.setAttribute('aria-hidden', 'false');
    }
  }
  document.querySelector('header').setAttribute('aria-hidden', 'false');
  document.querySelector('main').setAttribute('aria-hidden', 'false');
}

// close lightbox by pressin Esc key
function handleKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeLightBox();
  }
}

// function to show next media in lightbox
function showNextMediaInLightBox() {
  if (globalState.mediaClickedIndex !== -1) {
    const nextMediaIndex =
      (globalState.mediaClickedIndex + 1) % getMediaCollectionSize();
    const nextMediaElement =
      document.querySelectorAll('.photographerMedia')[nextMediaIndex];

    let title;
    if (nextMediaElement.tagName.toLowerCase() === 'img') {
      title = nextMediaElement.getAttribute('alt');
    } else if (nextMediaElement.tagName.toLowerCase() === 'video') {
      title = nextMediaElement.getAttribute('title');
    }

    const src = nextMediaElement.getAttribute('src');
    const type =
      nextMediaElement.tagName.toLowerCase() === 'img' ? 'image' : 'video';

    globalState.mediaClickedIndex = nextMediaIndex;
    closeLightBox();
    showMediaInLightbox(src, title, type, nextMediaElement);
    // clearMediaContent();
    // showMediaInLightbox(src, title, type, nextMediaElement);
  }
  // lightBoxPicture.focus();
}

// function to show previous media in lightbox
function showPreviousMediaInLightBox() {
  if (globalState.mediaClickedIndex !== -1) {
    const previousMediaIndex =
      (globalState.mediaClickedIndex - 1 + getMediaCollectionSize()) %
      getMediaCollectionSize();
    const previousMediaElement =
      document.querySelectorAll('.photographerMedia')[previousMediaIndex];

    let title;
    if (previousMediaElement.tagName.toLowerCase() === 'img') {
      title = previousMediaElement.getAttribute('alt');
    } else if (previousMediaElement.tagName.toLowerCase() === 'video') {
      title = previousMediaElement.getAttribute('title');
    }

    const src = previousMediaElement.getAttribute('src');
    const type =
      previousMediaElement.tagName.toLowerCase() === 'img' ? 'image' : 'video';

    globalState.mediaClickedIndex = previousMediaIndex;
    closeLightBox();
    showMediaInLightbox(src, title, type, previousMediaElement);
    // clearMediaContent();
    // showMediaInLightbox(src, title, type, previousMediaElement);
  }
  // lightBoxPicture.focus();
}

// function clearMediaContent() {
//   const lightBox = document.getElementById('lightBox');
//   if (lightBox) {
//     const lightBoxContent = lightBox.querySelector('.lightBoxContent');
//     if (lightBoxContent) {
//       lightBoxContent.remove();
//     }
//   }
// }
