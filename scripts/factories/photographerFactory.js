//function to create a photographer object
function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `./assets/images/photographers/00-Portraits/${portrait}`;

  return {
    getUserCardDOM: function () {
      //creation of article block
      const article = document.createElement('article');
      // creation of link around the picture
      const pictureLink = document.createElement('a');
      pictureLink.setAttribute('href', `./photographer.html?id=${id}`);
      pictureLink.setAttribute('role', 'link');
      pictureLink.setAttribute('aria-label', `${name}`);
      // creation of a wrapper around the picture to resize picture
      const wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      // creation of the picture
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', `${name}`);
      // creation of the name block
      const h2 = document.createElement('h2');
      h2.textContent = name;
      // creation of the city + country block
      const h3 = document.createElement('h3');
      h3.textContent = `${city}, ${country}`;
      // creation of the tagline block
      const h4 = document.createElement('h4');
      h4.textContent = tagline;
      // creation of the price block
      const h5 = document.createElement('h5');
      h5.textContent = `${price}€/jour`;
      // addition of picture in wrapper block
      wrapper.appendChild(img);
      // addition of wrapper in pictureLink block
      pictureLink.appendChild(wrapper);
      // addition of previous elements in article block
      article.appendChild(pictureLink);
      article.appendChild(h2);
      article.appendChild(h3);
      article.appendChild(h4);
      article.appendChild(h5);
      return article;
    },
  };
}
