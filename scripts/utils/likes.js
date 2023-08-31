// function to add an event listener if a likeHeart element has no event listener
function attachLikeEvent() {
  const likeHearts = document.querySelectorAll('.likeHeart');
  likeHearts.forEach((likeHeart) => {
    if (!likeHeart.classList.contains('event-attached')) {
      likeHeart.addEventListener('click', likeMedia);
      likeHeart.classList.add('event-attached');
    }
  });
}

const globalLikeCountElement = document.getElementById('nbLike');
// function to change the likeHeart color and increment media like count ang global like count
// mechanics are reversed if likeHeart is clicked again
function likeMedia() {
  const likeCountElement = this.previousElementSibling;
  let currentCount = parseInt(likeCountElement.textContent, 10);

  const currentColor = getComputedStyle(this).color;

  let globalCount = parseInt(globalLikeCountElement.textContent, 10);

  if (currentColor === 'rgb(144, 28, 28)') {
    this.style.color = 'black';
    currentCount -= 1;
    globalCount -= 1;
  } else {
    this.style.color = '#901C1C';
    currentCount += 1;
    globalCount += 1;
  }

  likeCountElement.textContent = currentCount;
  globalLikeCountElement.textContent = globalCount;
}

// create a mutation observer : if children or nodes are added to the dom, attachLikeEvent is executed
new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      attachLikeEvent();
    }
  }
}).observe(document.body, { childList: true, subtree: true });
