export function openLightbox() {
  const lightBoxModal = document.createElement("div");
  lightBoxModal.setAttribute("role", "modal");
  lightBoxModal.className = "lightBox_Modal";
  document.body.appendChild(lightBoxModal);
}

const mediaCollection = document.getElementsByClassName("photographerMedia");

for (const mediaElement of mediaCollection) {
  mediaElement.addEventListener("click", openLightbox);
}
