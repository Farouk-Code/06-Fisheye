export function calculateTotalLikes() {
  const likeElements = document.querySelectorAll(".photo-likes");
  let totalLikes = 0;

  for (let likeElement of likeElements) {
    const likes = Number(likeElement.textContent);
    totalLikes += likes;
  }

  return totalLikes;
}

export function updateTotalLikes() {
  const totalLikes = calculateTotalLikes();
  const priceAndLikesContainer = document.querySelector(".total_likes");
  // @ts-ignore
  priceAndLikesContainer.innerHTML = `<span class="total-likes">${totalLikes}</span>`;
}
