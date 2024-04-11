// @ts-nocheck
import { updateTotalLikes } from "./likes.js";
import { createMedia } from "./media.js";
import {
  createImage,
  createCardContainer,
  createHeading,
  createParagraph,
} from "../templates/photographer.js";
import { photographerPhotos } from "./data.js";
import { openCarousel } from "./carousel.js";
import { fetchPhotographerData } from "./photographerData.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const photographerId = urlSearchParams.get("id");
const likedMedia = new Set();

if (photographerId) {
  initPhotographerProfile(photographerId);
} else {
  console.error("ID invalide");
}

/**
 * Initialise le profil du photographe avec les données récupérées.
 * @param {String} id L'identifiant du photographe récupéré depuis l'url.
 */
async function initPhotographerProfile(id) {
  try {
    const data = await fetchPhotographerData(id);
    createPhotographerProfile(data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

/**
 * Crée le profil du photographe en utilisant les données fournies.
 * @param {Object} data
 */
function createPhotographerProfile(data) {
  const { name, city, country, tagline, price, portrait, altname } = data;
  const picture = `assets/photographers/${portrait}`;

  const img = createImage(picture, altname);
  const photographHeader = document.querySelector(".photograph-header");
  const imgcontainer = createCardContainer([img]);
  imgcontainer.appendChild(img);
  photographHeader.appendChild(imgcontainer);

  const h2 = createHeading("h2", name);
  const modalname = createHeading("h2", name);
  const h3 = createHeading("h3", `${city}, ${country}`);
  const tag = createParagraph(tagline);
  photographHeader.append(h2, h3, tag);
  const modalHeader = document.querySelector(".modal-header");
  modalHeader.appendChild(modalname);
  const priceContainer = document.createElement("p");
  priceContainer.classList.add("price");
  priceContainer.textContent = price + "€ / jour";
  const parentContainer = document.querySelector(".price-and-likes");
  parentContainer.appendChild(priceContainer);

  const heart = createHeartIcon();
  const path = heart.querySelector("path");
  path.setAttribute("fill", "black");
  parentContainer.appendChild(heart);
}

/**
 * Crée un élément vidéo avec les attributs spécifiés.
 * @param {string} src - Le chemin vers la source de la vidéo.
 * @param {string} alt - Le texte alternatif pour la vidéo.
 * @returns {HTMLVideoElement} L'élément vidéo créé.
 */
function createVideoElement(src, alt) {
  const video = document.createElement("video");
  video.src = src;
  video.type = "video/mp4";
  video.alt = alt;
  video.controls = true;
  return video;
}

/**
 * Crée et rend les médias (photos ou vidéos) dans la grille spécifiée.
 * @param {Object[]} photos - Le tableau contenant les données des médias à créer et afficher.
 */
export function createAndRenderMedia(photos) {
  if (!photos) {
    return;
  }

  const photoGrid = document.querySelector(".photo-grid");
  photoGrid.innerHTML = "";

  for (const mediaData of photos) {
    const media = createMedia(mediaData);

    const mediaCard = document.createElement("article");
    mediaCard.classList.add("photo");

    if (media.type === "image") {
      const image = document.createElement("img");
      image.src = media.url;
      image.alt = media.title;
      mediaCard.appendChild(image);
      image.setAttribute("tabindex", "0");
      image.addEventListener("click", () => openCarousel(mediaData));
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          openCarousel(mediaData);
        }
      });
    } else if (media.type === "video") {
      const video = createVideoElement(media.url, media.title);
      mediaCard.appendChild(video);
    }
    const photoInfo = document.createElement("div");
    photoInfo.classList.add("photo-info");
    mediaCard.appendChild(photoInfo);
    const title = document.createElement("h3");
    title.textContent = `${media.title}`;
    photoInfo.appendChild(title);
    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");
    const likes = document.createElement("p");
    likes.textContent = `${media.likes}`;
    likes.classList.add("photo-likes");

    likesContainer.appendChild(likes);
    photoInfo.appendChild(likesContainer);
    const heart = createHeartIcon();
    likesContainer.appendChild(heart);

    // Event listener for clicking the heart icon
    heart.addEventListener("click", () => likeMedia(media.id, likes, heart));
    // Render the media card
    photoGrid.appendChild(mediaCard);
  }
}

/**
 * Gère l'action de "liker" un média.
 * @param {Number} mediaId
 * @param {HTMLElement} likesElement
 * @param {HTMLElement} heart
 */
function likeMedia(mediaId, likesElement, heart) {
  if (!likedMedia.has(mediaId)) {
    // Element pas encore aimé
    const media = photographerPhotos.find((media) => media.id === mediaId);
    if (media) {
      media.likes += 1;
      likedMedia.add(mediaId);
      likesElement.textContent = `${media.likes}`;
      heart.classList.add("liked");
      updateTotalLikes();
    }
  }
}

/**
 * Crée une icône de cœur SVG.
 * @returns {SVGElement} L'élément SVG représentant l'icône de cœur.
 */
function createHeartIcon() {
  const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  heart.setAttribute("width", "21");
  heart.setAttribute("height", "24");
  heart.setAttribute("viewBox", "0 0 21 24");
  heart.setAttribute("fill", "none");
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("clip-path", "url(#clip0_120_561)");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z"
  );
  path.setAttribute("fill", "#911C1C");
  g.appendChild(path);
  heart.appendChild(g);

  return heart;
}

/**
 * Trie les photos par popularité (nombre de likes décroissant).
 * @param {Object[]} photos - Le tableau contenant les données des photos à trier.
 * @param {number} photos[].likes - Le nombre de likes de la photo.
 * @returns {Object[]} Le tableau des photos triées par popularité.
 */
function sortByPopularity(photos) {
  return photos.sort((a, b) => b.likes - a.likes);
}

/**
 * Trie les photos par date (du plus ancien au plus récent).
 * @param {Object[]} photos - Le tableau contenant les données des photos à trier.
 * @param {string} photos[].date - La date de la photo au format string.
 * @returns {Object[]} Le tableau des photos triées par date.
 */
function sortByDate(photos) {
  return photos.sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Trie les photos par titre (par ordre alphabétique).
 * @param {Object[]} photos - Le tableau contenant les données des photos à trier.
 * @param {string} photos[].title - Le titre de la photo.
 * @returns {Object[]} Le tableau des photos triées par titre.
 */
function sortByTitle(photos) {
  return photos.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Trie les photos du photographe en fonction du critère spécifié et affiche les médias triés.
 * @param {string} sortBy - Le critère de tri ("popularite", "date" ou "titre").
 */
export async function sortPhotos(sortBy) {
  let sortedPhotos;

  switch (sortBy) {
    case "popularite":
      sortedPhotos = sortByPopularity(photographerPhotos);
      break;
    case "date":
      sortedPhotos = sortByDate(photographerPhotos);
      break;
    case "titre":
      sortedPhotos = sortByTitle(photographerPhotos);
      break;
    default:
      break;
  }

  createAndRenderMedia(sortedPhotos);
}

document
  .querySelector("#filter-date")
  .addEventListener("click", () => sortPhotos("date"));
document.querySelector("#filter-date").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sortPhotos("date");
  }
});

document
  .querySelector("#filter-titre")
  .addEventListener("click", () => sortPhotos("titre"));
document.querySelector("#filter-titre").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sortPhotos("titre");
  }
});

document
  .querySelector("#filter-popularite")
  .addEventListener("click", () => sortPhotos("popularite"));
document
  .querySelector("#filter-popularite")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sortPhotos("popularite");
    }
  });

document.addEventListener("DOMContentLoaded", async () => {
  const observer = new MutationObserver(updateTotalLikes);
  const targetNode = document.querySelector(".photo-grid");
  const config = { childList: true, subtree: true };
  observer.observe(targetNode, config);

  updateTotalLikes();
});
