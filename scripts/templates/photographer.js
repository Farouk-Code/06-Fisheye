/**
 * Créer une image avec sa source et sa description alternative spécifiés.
 * @param {String} src
 * @param {String} alt
 * @returns {HTMLImageElement}
 */
export function createImage(src, alt) {
  const image = document.createElement("img");
  image.setAttribute("src", src);
  image.setAttribute("alt", alt);
  return image;
}

/**
 * Crée un titre avec le type et le contenue spécifiés.
 * @param {String} type
 * @param {String} text
 * @returns {HTMLElement}
 */
export function createHeading(type, text) {
  const heading = document.createElement(type);
  heading.textContent = text;
  return heading;
}

/**
 * Crée un paragraphe avec son contenue.
 * @param {String} text
 * @returns {HTMLDivElement}
 */
export function createParagraph(text) {
  const paragpraph = document.createElement("p");
  paragpraph.textContent = text;
  return paragpraph;
}

/**
 * Crée un conteneur pour un photographe avec les éléments enfants spécifiés.
 * @param {HTMLElement[]} children
 * @returns {HTMLDivElement}
 */
export function createCardContainer(children) {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("photographer_card");
  imageContainer.setAttribute("tabindex", "0");
  for (let child of children) {
    imageContainer.appendChild(child);
  }
  return imageContainer;
}

/**
 * Crée un élément de lien avec l'URL spécifiée.
 * @param {String} href
 * @returns {HTMLAnchorElement}
 */
function createLink(href) {
  const link = document.createElement("a");
  link.setAttribute("href", href);
  return link;
}

/**
 * Crée un élément d'article contenant un lien vers le profil du photographe, avec un contenu spécifié.
 * @param {string} photographerId
 * @param {HTMLElement[]} content
 * @param {string} photographerName
 * @returns {HTMLElement}
 */
function createPhotographerProfileArticle(
  photographerId,
  content,
  photographerName
) {
  const article = document.createElement("article");
  const link = createLink(`photographer.html?id=${photographerId}`);
  const ariaLabel = `Profil du photographe : ${photographerName}`;
  link.setAttribute("aria-label", ariaLabel);
  for (let element of content) {
    link.appendChild(element);
  }
  article.appendChild(link);
  return article;
}

/**
 * Crée un profil pour un photographe
 * @param {Object} data
 * @returns {HTMLElement}
 */
export function createPhotographerProfileTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  const image = createImage(picture, portrait);
  const h2 = createHeading("h2", name);
  const h3 = createHeading("h3", `${city}, ${country}`);
  const tag = createParagraph(tagline);
  const rate = createParagraph(`${price}€/jour`);
  const imageContainer = createCardContainer([image]);

  const content = [imageContainer, h2, h3, tag, rate];
  const article = createPhotographerProfileArticle(id, content, name);

  return article;
}
