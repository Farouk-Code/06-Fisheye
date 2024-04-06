/**
 * Calcule le nombre total de likes en additionnant les likes de tous les éléments de la classe "photo-likes".
 * @returns {number} Le nombre total de likes.
 */
export function calculateTotalLikes() {
  const likeElements = document.querySelectorAll(".photo-likes");
  let totalLikes = 0;

  for (let likeElement of likeElements) {
    const likes = Number(likeElement.textContent);
    totalLikes += likes;
  }

  return totalLikes;
}

/**
 * Met à jour l'affichage du nombre total de likes dans le conteneur spécifié.
 */
export function updateTotalLikes() {
  const totalLikes = calculateTotalLikes();
  const priceAndLikesContainer = document.querySelector(".total_likes");
  // @ts-ignore
  priceAndLikesContainer.innerHTML = `<span class="total-likes">${totalLikes}</span>`;
}
