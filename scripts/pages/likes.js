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
  const spanTotalLikes = document.createElement("span");
  spanTotalLikes.classList.add("total-likes");
  spanTotalLikes.textContent = String(totalLikes);
  priceAndLikesContainer?.appendChild(spanTotalLikes);
}
