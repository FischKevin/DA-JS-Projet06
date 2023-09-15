// function to change the likeHeart color and increment media like count ang global like count
// mechanics are reversed if likeHeart is clicked again
export function likeMedia(event) {
  const globalLikeCountElement = document.getElementById('nbLike');
  const targetElement = event.currentTarget;
  const likeCountElement = targetElement.previousElementSibling;
  let currentCount = parseInt(likeCountElement.textContent, 10);
  const currentColor = getComputedStyle(targetElement).color;

  let globalCount = parseInt(globalLikeCountElement.textContent, 10);

  if (currentColor === 'rgb(144, 28, 28)') {
    targetElement.style.color = 'black';
    currentCount -= 1;
    globalCount -= 1;
  } else {
    targetElement.style.color = '#901C1C';
    currentCount += 1;
    globalCount += 1;
  }

  likeCountElement.textContent = currentCount;
  globalLikeCountElement.textContent = globalCount;
}
