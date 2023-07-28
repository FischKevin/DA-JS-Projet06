/* exported mediaFactory */
function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const picture = `./assets/images/photographers/${photographerId}/${image}`;
  const film = `./assets/images/photographers/${photographerId}/${video}`;

  return {
    getMediaCardDOM: function () {
      const article = document.createElement("figure");
      const pictureLink = document.createElement("a");
      pictureLink.setAttribute("href", `./photographer.html?id=${id}`);
      pictureLink.setAttribute("role", "link");

      if (video) {
        const vid = document.createElement("video");
        vid.setAttribute("src", film);
        vid.style.maxHeight = "100%";
        vid.style.maxWidth = "350px";
        pictureLink.appendChild(vid);
      } else {
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        pictureLink.appendChild(img);
      }

      const divTitleLikes = document.createElement("div");
      divTitleLikes.className = "div-title-tikes";
      divTitleLikes.style.display = "flex";
      divTitleLikes.style.justifyContent = "space-between";
      divTitleLikes.style.maxWidth = "350px";
      divTitleLikes.style.whiteSpace = "pre";
      divTitleLikes.style.paddingRight = "2px";
      const pictureTitle = document.createElement("figcaption");
      pictureTitle.textContent = title;
      pictureTitle.style.whiteSpace = "nowrap";
      pictureTitle.style.overflow = "hidden";
      pictureTitle.style.textOverflow = "ellipsis";
      const likesAndHeart = document.createElement("span");
      likesAndHeart.style.display = "flex";
      const pictureLikes = document.createElement("h2");
      pictureLikes.className = "nblikes";
      pictureLikes.textContent = likes;
      pictureLikes.style.marginLeft = "10px";
      const heart = document.createElement("i");
      heart.classList.add("fa-solid", "fa-heart");
      heart.style.fontSize = "22px";
      heart.style.margin = "2px 0 0 5px";

      divTitleLikes.appendChild(pictureTitle);
      likesAndHeart.appendChild(pictureLikes);
      likesAndHeart.appendChild(heart);
      divTitleLikes.appendChild(likesAndHeart);
      article.appendChild(pictureLink);
      article.appendChild(divTitleLikes);
      return article;
    },
  };
}
