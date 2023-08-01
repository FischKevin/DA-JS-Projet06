export function openLightbox(picture, title) {
  const lightBoxModal = document.createElement("div");
  lightBoxModal.setAttribute("role", "modal");
  lightBoxModal.className = "lightBox_Modal";
  const lightBoxContent = document.createElement("div");
  lightBoxContent.className = "lightBoxContent";
  const lightBoxPrev = document.createElement("div");
  lightBoxPrev.className = "lightBoxPrev";
  lightBoxPrev.innerHTML = "<";
  const lightBoxPicture = document.createElement("figure");
  lightBoxPicture.className = "lightBoxPicture";
  const lightBoxPictureSource = document.createElement("img");
  lightBoxPictureSource.setAttribute("src", picture);
  lightBoxPictureSource.setAttribute("alt", title);
  lightBoxPictureSource.className = "lightBoxPictureSource";
  const lightBoxPictureCaption = document.createElement("figcaption");
  lightBoxPictureCaption.innerHTML = title;
  lightBoxPictureCaption.className = "lightBoxPictureCaption";
  const lightBoxNext = document.createElement("div");
  lightBoxNext.className = "lightBoxNext";
  lightBoxNext.innerHTML = ">";
  document.body.appendChild(lightBoxModal);
  lightBoxModal.appendChild(lightBoxContent);
  lightBoxContent.appendChild(lightBoxPrev);
  lightBoxContent.appendChild(lightBoxPicture);
  lightBoxContent.appendChild(lightBoxNext);
  lightBoxPicture.appendChild(lightBoxPictureSource);
  lightBoxPicture.appendChild(lightBoxPictureCaption);
}

const mediaCollection = document.getElementsByClassName("photographerMedia");

for (const mediaElement of mediaCollection) {
  mediaElement.addEventListener("click", openLightbox);
}
