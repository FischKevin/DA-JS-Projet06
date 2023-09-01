import { showMediaInLightbox } from '/scripts/utils/lightBox.js';

//function to create media objects
export function mediaFactory(data) {
  const { photographerId, title, image, video, likes, index } = data;

  const picture = `./assets/images/photographers/${photographerId}/${image}`;
  const film = `./assets/images/photographers/${photographerId}/${video}`;

  return {
    getMediaCardDOM: function () {
      const article = document.createElement('figure');

      if (video) {
        const vid = document.createElement('video');
        vid.setAttribute('src', film);
        vid.style.maxHeight = '100%';
        vid.style.maxWidth = '350px';
        vid.className = 'photographerMedia';
        vid.addEventListener('click', () =>
          showMediaInLightbox(film, title, 'video', index)
        );
        article.appendChild(vid);
      } else {
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', title);
        img.className = 'photographerMedia';
        img.addEventListener('click', () =>
          showMediaInLightbox(picture, title, 'image', index)
        );
        article.appendChild(img);
      }

      const divTitleLikes = document.createElement('div');
      divTitleLikes.className = 'div-title-likes';
      divTitleLikes.style.display = 'flex';
      divTitleLikes.style.justifyContent = 'space-between';
      divTitleLikes.style.maxWidth = '350px';
      divTitleLikes.style.whiteSpace = 'pre';
      divTitleLikes.style.paddingRight = '2px';
      const pictureTitle = document.createElement('figcaption');
      pictureTitle.textContent = title;
      pictureTitle.style.whiteSpace = 'nowrap';
      pictureTitle.style.overflow = 'hidden';
      pictureTitle.style.textOverflow = 'ellipsis';
      const likesAndHeart = document.createElement('span');
      likesAndHeart.className = 'likeContainer';
      likesAndHeart.style.display = 'flex';
      const pictureLikes = document.createElement('h2');
      pictureLikes.className = 'nblikes';
      pictureLikes.textContent = likes;
      pictureLikes.style.marginLeft = '10px';
      const heart = document.createElement('i');
      heart.classList.add('fa-solid', 'fa-heart', 'likeHeart');
      heart.style.fontSize = '22px';
      heart.style.margin = '4px 0 0 5px';

      divTitleLikes.appendChild(pictureTitle);
      likesAndHeart.appendChild(pictureLikes);
      likesAndHeart.appendChild(heart);
      divTitleLikes.appendChild(likesAndHeart);
      article.appendChild(divTitleLikes);
      return article;
    },
  };
}
