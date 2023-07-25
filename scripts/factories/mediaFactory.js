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
      const h2 = document.createElement("h2");
      h2.textContent = title;
      // creation of the likes block
      const h3 = document.createElement("h3");
      h3.textContent = `${likes}`;
      // addition of previous elements in article block
      article.appendChild(pictureLink);
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(h3);
      return article;
    },
  };
}
