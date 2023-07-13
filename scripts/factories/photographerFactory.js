/* exported photographerFactory */
function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `./assets/images/photographers/00-Portraits/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const pictureLink = document.createElement("a");
    pictureLink.setAttribute("href", `./photographer.html?id=${id}`);
    pictureLink.setAttribute("role", "link");
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    pictureLink.appendChild(wrapper);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${name}`);
    wrapper.appendChild(img);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const h4 = document.createElement("h4");
    h4.textContent = tagline;
    const h5 = document.createElement("h5");
    h5.textContent = `${price}€/jour`;
    article.appendChild(pictureLink);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(h5);
    return article;
  }
  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    id,
    getUserCardDOM,
  };
}
