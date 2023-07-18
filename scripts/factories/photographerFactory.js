/* exported photographerFactory */
function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `./assets/images/photographers/00-Portraits/${portrait}`;

  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    picture,
  };
}
