/* exported mediaFactory */
function mediaFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;

  const picture = `./assets/images/photographers/${photographerId}/${image}`;

  return {
    getMediaCardDOM: function () {
      //creation of figure block
      const article = document.createElement("figure");
      // creation of link around the picture
      const pictureLink = document.createElement("a");
      pictureLink.setAttribute("href", `./photographer.html?id=${id}`);
      pictureLink.setAttribute("role", "link");
      // creation of the picture
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      // creation of the title and likes block
      const divTitleLikes = document.createElement("div");
      divTitleLikes.className = "div-title-tikes";
      divTitleLikes.style.display = "flex";
      divTitleLikes.style.justifyContent = "space-between";
      divTitleLikes.style.maxWidth = "350px";
      divTitleLikes.style.whiteSpace = "pre";
      divTitleLikes.style.paddingRight = "2px";
      // creation of title block
      const pictureTitle = document.createElement("figcaption");
      pictureTitle.textContent = title;
      pictureTitle.style.whiteSpace = "nowrap";
      pictureTitle.style.overflow = "hidden";
      pictureTitle.style.textOverflow = "ellipsis";
      // creation of the likes block
      const likesAndHeart = document.createElement("span");
      likesAndHeart.style.display = "flex";
      const pictureLikes = document.createElement("h2");
      pictureLikes.className = "nblikes";
      pictureLikes.textContent = likes;
      pictureLikes.style.marginLeft = "10px";
      //creation of heart icon
      const heart = document.createElement("i");
      heart.classList.add("fa-solid", "fa-heart");
      heart.style.fontSize = "24px";
      heart.style.margin = "2px 0 0 5px";
      // addition of title and likes elements in the right blocks
      divTitleLikes.appendChild(pictureTitle);
      likesAndHeart.appendChild(pictureLikes);
      likesAndHeart.appendChild(heart);
      divTitleLikes.appendChild(likesAndHeart);
      // addition of previous elements in article block
      pictureLink.appendChild(img);
      article.appendChild(pictureLink);
      article.appendChild(divTitleLikes);
      return article;
    },
  };
}
