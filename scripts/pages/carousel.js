// @ts-nocheck
import { createMedia } from "./media.js";
import { photographerPhotos } from "./data.js";

// --------- VARIABLES GLOBALES DU DOM ---------
const imageCarousel = document.querySelector("#image-carousel");
const overlay = document.querySelector(".overlay");
const closeButtonCarousel = document.querySelector(".carousel-close");
const previousButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const carouselContent = document.querySelector(".carousel-content");

let currentImageIndex = 0;

/**
 * Ouvre le carrousel d'images avec les données du média spécifié.
 * @param {Object} mediaData
 */
export function openCarousel(mediaData) {
  imageCarousel.style.display = "block";
  overlay.style.display = "block";
  currentImageIndex = photographerPhotos.findIndex(
    (photo) => photo.id === mediaData.id
  );
  loadCurrentImage();
  document.addEventListener("keydown", keyboardNavigation);
}

/**
 * Ferme le carousel
 */
function closeImmageCarousel() {
  imageCarousel.style.display = "none";
  overlay.style.display = "none";
}

/**
 * Chargement de la liste d'images en mode carousel
 */
function loadCurrentImage() {
  carouselContent.innerHTML = "";

  const media = createMedia(photographerPhotos[currentImageIndex]);
  const mediaElement = media.createMediaElement();
  mediaElement.classList.add("lightbox-media");
  carouselContent.appendChild(mediaElement);
  const mediaTitle = document.createElement("div");
  mediaTitle.classList.add("media-title");
  mediaTitle.textContent = media.title;
  carouselContent.appendChild(mediaTitle);
}

/**
 * Click sur le bouton précedent
 */
previousButton.addEventListener("click", () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    loadCurrentImage();
  } else {
    currentImageIndex = photographerPhotos.length - 1;
    loadCurrentImage();
  }
});

/**
 * Click sur le bouton suivant
 */
nextButton.addEventListener("click", () => {
  if (currentImageIndex < photographerPhotos.length - 1) {
    currentImageIndex++;
    loadCurrentImage();
  } else {
    currentImageIndex = 0;
    loadCurrentImage();
  }
});

/**
 * Click sur le bouton fermer ou sur l'overlay
 */
closeButtonCarousel.addEventListener("click", closeImmageCarousel);
overlay.addEventListener("click", closeImmageCarousel);

/**
 * Ajout du click pour ouvrir le carousel
 */
const mediaGridItems = document.querySelectorAll(".photo");
for (let index = 0; index < mediaGridItems.length; index++) {
  mediaGridItems[index].addEventListener("click", () => {
    currentImageIndex = index;
    openCarousel(photographerPhotos[currentImageIndex]);
  });
}

/**
 * Gère la navigation au clavier dans le carrousel d'images.
 * @param {KeyboardEvent} event
 */
function keyboardNavigation(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (currentImageIndex > 0) {
        currentImageIndex--;
        loadCurrentImage();
      } else {
        currentImageIndex = photographerPhotos.length - 1;
        loadCurrentImage();
      }
      break;
    case "ArrowRight":
      if (currentImageIndex < photographerPhotos.length - 1) {
        currentImageIndex++;
        loadCurrentImage();
      } else {
        currentImageIndex = 0;
        loadCurrentImage();
      }
      break;

    case "Escape":
      closeImmageCarousel();
      break;
  }
}
