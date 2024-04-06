import { sortPhotos, createAndRenderMedia } from "./photographer.js";
import { photographerPhotos } from "./data.js";

/**
 * Récupère les données du photographe et de ses médias à partir du fichier JSON.
 * @param {String} id - L'identifiant du photographe.
 * @returns {Promise<Object>} Une promesse résolue avec les données du photographe correspondant à l'ID.
 */
export async function fetchPhotographerData(id) {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Failed to fetch photographer data");
    }
    const data = await response.json();

    // Filtrer les photos du photographe spécifié
    const filteredPhotos = data.media.filter(
      (photo) => photo.photographerId === parseInt(id)
    );

    // Réinitialiser le tableau des photos du photographe et ajouter les nouvelles données
    photographerPhotos.length = 0;
    photographerPhotos.push(...filteredPhotos);

    // Créer et afficher les médias du photographe
    createAndRenderMedia(photographerPhotos);

    // Trier les photos par défaut (option "popularité")
    sortPhotos("popularite");

    // Retourner les données du photographe correspondant à l'ID
    return data.photographers.find(
      (photographer) => photographer.id === parseInt(id, 10)
    );
  } catch (error) {
    throw error;
  }
}
