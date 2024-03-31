export function creatImage(src, alt) {
  const image = document.createElement("img");
  image.setAttribute("src", src);
  image.setAttribute("alt", alt);
  return image;
}

export function creatHeading(type, text) {
  const heading = document.createElement(type);
  heading.textContent = text;
  return heading;
}

export function creatParagraph(text) {
  const paragpraph = document.createElement("p");
  paragpraph.textContent = text;
  return paragpraph;
}

export function creatPhotographeContainer(children) {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("photographer_card");
  imageContainer.setAttribute("tabindex", "0");
  for (let child of children) {
    imageContainer.appendChild(child);
  }
  return imageContainer;
}

function creatLink(href) {
  const link = document.createElement("a");
  link.setAttribute("href", href);
  return link;
}

function creatLinkForPhotographe(id, content, name) {
  const article = document.createElement("article");
  const link = creatLink(`photographer.html?id=${id}`);
  const ariaLabel = `Profil du photographe : ${name}`;
  link.setAttribute("aria-label", ariaLabel);
  for (let element of content) {
    link.appendChild(element);
  }
  article.appendChild(link);
  return article;
}

export function creatPhotographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait, altname } = data;
  const picture = `assets/photographers/${portrait}`;

  const image = creatImage(picture, altname);
  const h2 = creatHeading("h2", name);
  const h3 = creatHeading("h3", `${city}, ${country}`);
  const tag = creatParagraph(tagline);
  const rate = creatParagraph(`${price}€/jour`);
  const imageContainer = creatPhotographeContainer([image]);

  const content = [imageContainer, h2, h3, tag, rate];
  const article = creatLinkForPhotographe(id, content, name);

  return article;
}
