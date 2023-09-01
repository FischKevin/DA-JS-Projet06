import { getMediaCollectionSize } from '/scripts/pages/photographer.js';
import { globalState } from '/scripts/utils/globalState.js';
// import { getMediaClickedIndex } from '/scripts/pages/photographer.js';

let lightBoxModalCloseButton = null;
let mediaClickedIndex = globalState.mediaClickedIndex;
// console.log(mediaClickedIndex);
// console.log(toto);

// function to open lightbox and display ui
export function showMediaInLightbox(src, title, type = 'image') {
  const lightBoxModal = document.createElement('div');
  lightBoxModal.setAttribute('role', 'modal');
  lightBoxModal.setAttribute('id', 'lightBox');
  lightBoxModal.className = 'lightBox_Modal';
  const lightBoxModalClose = document.createElement('i');
  lightBoxModalClose.className = 'lightBoxModalClose';
  lightBoxModalClose.setAttribute('id', 'lightBoxModalClose');
  lightBoxModalClose.classList.add('fa-solid');
  lightBoxModalClose.classList.add('fa-close');
  const lightBoxContent = document.createElement('div');
  lightBoxContent.className = 'lightBoxContent';
  const lightBoxPrev = document.createElement('i');
  lightBoxPrev.className = 'lightBoxPrev';
  lightBoxPrev.classList.add('fa-solid');
  lightBoxPrev.classList.add('fa-chevron-left');
  lightBoxPrev.addEventListener('click', showPreviousMediaInLightBox);
  const lightBoxPicture = document.createElement('figure');
  lightBoxPicture.className = 'lightBoxPicture';

  // display image or video depending on the source
  if (type === 'image') {
    const lightBoxPictureSource = document.createElement('img');
    lightBoxPictureSource.setAttribute('src', src);
    lightBoxPictureSource.setAttribute('alt', title);
    lightBoxPictureSource.className = 'lightBoxPictureSource';
    lightBoxPicture.appendChild(lightBoxPictureSource);
  } else if (type === 'video') {
    const lightBoxVideo = document.createElement('video');
    lightBoxVideo.setAttribute('controls', '');
    const lightBoxVideoSource = document.createElement('source');
    lightBoxVideoSource.setAttribute('src', src);
    lightBoxVideoSource.setAttribute('type', 'video/mp4');
    lightBoxVideo.appendChild(lightBoxVideoSource);
    lightBoxPicture.appendChild(lightBoxVideo);
  }

  const lightBoxPictureCaption = document.createElement('figcaption');
  lightBoxPictureCaption.innerHTML = title;
  lightBoxPictureCaption.className = 'lightBoxPictureCaption';
  const lightBoxNext = document.createElement('i');
  lightBoxNext.className = 'lightBoxNext';
  lightBoxNext.classList.add('fa-solid');
  lightBoxNext.classList.add('fa-chevron-right');
  lightBoxNext.addEventListener('click', showNextMediaInLightBox);
  document.body.appendChild(lightBoxModal);
  lightBoxModal.appendChild(lightBoxContent);
  lightBoxContent.appendChild(lightBoxModalClose);
  lightBoxContent.appendChild(lightBoxPrev);
  lightBoxContent.appendChild(lightBoxPicture);
  lightBoxContent.appendChild(lightBoxNext);
  lightBoxPicture.appendChild(lightBoxPictureCaption);

  lightBoxModalCloseButton = lightBoxModal.querySelector('.lightBoxModalClose');
  lightBoxModalCloseButton.addEventListener('click', closeLightBox);

  console.log(`Index du média cliqué: ${globalState.mediaClickedIndex}`);
}

// remove event listeners
function removeLightBoxListeners() {
  if (lightBoxModalCloseButton) {
    lightBoxModalCloseButton.removeEventListener('click', closeLightBox);
    lightBoxModalCloseButton = null;
  }
}

// function to close the lightbox
function closeLightBox() {
  console.log('Trying to close the lightbox.');
  const lightBox = document.getElementById('lightBox');
  if (lightBox) {
    lightBox.remove();
    console.log('lightBox should now be removed.');
    removeLightBoxListeners();
  } else {
    console.log('lightBox element not found.');
  }
  const lightBoxCheck = document.getElementById('lightBox');
  console.log('Lightbox still in DOM:', !!lightBoxCheck);
}

// function to show next media in lightbox
function showNextMediaInLightBox() {
  if (globalState.mediaClickedIndex !== -1) {
    const nextMediaIndex =
      (globalState.mediaClickedIndex + 1) % getMediaCollectionSize();
    const nextMediaElement =
      document.querySelectorAll('.photographerMedia')[nextMediaIndex];
    const src = nextMediaElement.getAttribute('src');
    const title = nextMediaElement.getAttribute('alt');
    const type =
      nextMediaElement.tagName.toLowerCase() === 'img' ? 'image' : 'video';

    globalState.mediaClickedIndex = nextMediaIndex;
    closeLightBox(); // Fermez la lightbox actuelle
    showMediaInLightbox(src, title, type, nextMediaElement); // Affichez le média suivant
  }
}

// function to show previous media in lightbox
function showPreviousMediaInLightBox() {
  if (globalState.mediaClickedIndex !== -1) {
    const totalMediaCount = getMediaCollectionSize();
    const previousMediaIndex =
      (globalState.mediaClickedIndex - 1 + totalMediaCount) % totalMediaCount;
    const previousMediaElement =
      document.querySelectorAll('.photographerMedia')[previousMediaIndex];
    const src = previousMediaElement.getAttribute('src');
    const title = previousMediaElement.getAttribute('alt');
    const type =
      previousMediaElement.tagName.toLowerCase() === 'img' ? 'image' : 'video';

    globalState.mediaClickedIndex = previousMediaIndex;
    closeLightBox(); // Fermez la lightbox actuelle
    showMediaInLightbox(src, title, type, previousMediaElement); // Affichez le média précédent
  }
}
