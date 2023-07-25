/* exported mediaFactory */
function mediaFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;

  const picture = `./assets/images/photographers/${photographerId}/${image}`;

  return {
    getMediaCardDOM: function () {
      //creation of article block
      const article = document.createElement("article");
      // creation of link around the picture
      const pictureLink = document.createElement("a");
      pictureLink.setAttribute("href", `./photographer.html?id=${id}`);
      pictureLink.setAttribute("role", "link");
      // creation of the picture
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      // creation of the title block
      const spanTitleLikes = document.createElement("span");
      const pictureTitle = document.createElement("h2");
      pictureTitle.textContent = title;
      // creation of the likes block
      const pictureLikes = document.createElement("h2");
      pictureLikes.textContent = likes;
      //creation of heart icon
      const heart = document.createElement("i");
      heart.classList.add("fa-solid", "fa-heart");
      spanTitleLikes.appendChild(pictureTitle);
      spanTitleLikes.appendChild(pictureLikes);
      spanTitleLikes.appendChild(heart);
      // addition of previous elements in article block
      pictureLink.appendChild(img);
      article.appendChild(pictureLink);
      article.appendChild(spanTitleLikes);
      return article;
    },
  };
}
