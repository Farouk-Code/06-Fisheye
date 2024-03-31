import { creatPhotographerTemplate } from "../templates/photographer.js";

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

async function displayData(photographers, photographersSection) {
  for (let photographer of photographers) {
    const photographerTemplate = creatPhotographerTemplate(photographer);
    photographersSection.appendChild(photographerTemplate);
  }
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  console.log(photographers);
  const photographersSection = document.querySelector(".photographer_section");
  displayData(photographers, photographersSection);
}

init();
