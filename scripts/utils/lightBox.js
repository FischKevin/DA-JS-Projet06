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
  const lightBox = document.getElementById('lightBox');
  if (lightBox) {
    lightBox.remove();
    removeLightBoxListeners();
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
  }
}

// function to show previous media in lightbox
function showPreviousMediaInLightBox() {
  if (globalState.mediaClickedIndex !== -1) {
    const previousMediaIndex =
      (globalState.mediaClickedIndex + 1) % getMediaCollectionSize();
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
  }
}
