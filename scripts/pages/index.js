import { createPhotographerProfileTemplate } from "../templates/photographer.js";

async function getPhotographers() {
  try {
    const response = await fetch("../../data/photographers.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Affiche les profils des photographes dans la section spécifiée.
 * @param {Object[]} photographers
 * @param {HTMLElement} photographersSection
 */
async function displayData(photographers, photographersSection) {
  for (let photographer of photographers) {
    const photographerTemplate =
      createPhotographerProfileTemplate(photographer);
    photographersSection.appendChild(photographerTemplate);
  }
}

function keyboardNavigation(photographersSection) {
  photographersSection.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const image = event.target.querySelector("img");
      if (image) {
        const link = image.closest("a");
        if (link) {
          link.click();
        }
      }
    }
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  console.log(photographers);
  const photographersSection = document.querySelector(".photographer_section");
  // @ts-ignore
  displayData(photographers, photographersSection);
  keyboardNavigation(photographersSection);
}

init();
