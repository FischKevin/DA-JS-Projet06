let lightBoxModalCloseButton = null;
let currentIndex = null;

// function to open lightbox and display ui
function showMediaInModal(src, title, type = 'image') {
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

function attachEventToMediaElement(mediaElement) {
  if (!mediaElement.dataset.eventAttached) {
    mediaElement.addEventListener('click', function () {
      const mediaType = mediaElement.tagName === 'VIDEO' ? 'video' : 'image';
      const title =
        mediaElement.parentElement.querySelector('figcaption').textContent;
      currentIndex = Array.from(
        document.getElementsByClassName('photographerMedia')
      ).indexOf(mediaElement);
      console.log(`Média cliqué à l'index: ${currentIndex}`);
      showMediaInModal(mediaElement.src, title || '', mediaType);
    });
    mediaElement.dataset.eventAttached = true;
  }
}

function attachEventsToNewMediaElements(addedNodes) {
  addedNodes.forEach((node) => {
    if (node.classList && node.classList.contains('photographerMedia')) {
      attachEventToMediaElement(node);
    }
  });
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

// function to count media elements
function countMediaElements() {
  const mediaCollection = document.getElementsByClassName('photographerMedia');
  const mediaCollectionArray = Array.from(mediaCollection);
  const mediaGalleryArraySize = mediaCollectionArray.length;
  console.log(`Il y a ${mediaGalleryArraySize} médias dans la galerie.`);
}

//function to initialize the observer
function initObserver() {
  const targetNode = document.getElementById('media-section');
  if (!targetNode) return;

  const config = { attributes: false, childList: true, subtree: true };

  const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        countMediaElements();
        attachEventsToNewMediaElements(mutation.addedNodes);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

document.addEventListener('DOMContentLoaded', function () {
  initObserver();
  countMediaElements();
});
