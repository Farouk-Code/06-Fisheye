// @ts-nocheck
import { sortPhotos } from "../pages/photographer.js";

const dropdown = document.querySelector(".dropdown");
const selected = dropdown.querySelector(".selected");
const options = dropdown.querySelector(".dropdown-menu");
const dropdownIcon = dropdown.querySelector(".dropdown-icon");
const sortOptions = Array.from(options.querySelectorAll(".dropdown-option"));

// Option de base : "Popularité"
let selectedOption = "filter-popularite";

/**
 * Bascule l'affichage d'un élément de menu déroulant entre visible et caché.
 * Met également à jour les attributs aria-expanded et l'icône du menu déroulant en conséquence.
 */
function toggleDropdown() {
  if (options.style.display === "block") {
    options.style.display = "none";
  } else {
    options.style.display = "block";
  }
  selected.setAttribute(
    "aria-expanded",
    options.style.display === "block" ? "true" : "false"
  );
  dropdownIcon.style.transform =
    options.style.display === "block" ? "rotate(90deg)" : "rotate(0)";
}

/**
 * Sélectionne une option dans un menu déroulant en déplaçant l'option sélectionnée vers la partie supérieure de la liste.
 * Réorganise également les autres options pour refléter la nouvelle sélection.
 * @param {string} optionId - L'identifiant de l'option à sélectionner.
 */
function selectOption(optionId) {
  const previousOptionId = selectedOption;
  if (previousOptionId !== optionId) {
    const previousOptionElement = document.getElementById(previousOptionId);
    selected.removeChild(previousOptionElement);

    options.appendChild(previousOptionElement);
    const filteredOptions = sortOptions.filter(
      (option) => option.id !== previousOptionId
    );
    const sortedOptions = filteredOptions.sort(
      (a, b) => a.getAttribute("data-order") - b.getAttribute("data-order")
    );
    for (let index = 0; index < sortedOptions.length; index++) {
      const option = sortedOptions[index];
      option.style.order = index + 1;
    }
  }

  // Définir la nouvelle option sélectionnée
  selectedOption = optionId;
  const selectedOptionElement = document.getElementById(optionId);
  selected.appendChild(selectedOptionElement);
  selected.setAttribute(
    "aria-label",
    `Selected option: ${selected.textContent}`
  );
  options.style.display = "none";
  dropdownIcon.style.transform = "rotate(0)";

  sortPhotos(optionId);
}

// Ajouter des event listener de clic pour ouvrir/fermer la liste déroulante.
selected.addEventListener("click", () => toggleDropdown());
selected.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    toggleDropdown();
  }
});

for (const option of sortOptions) {
  option.addEventListener("click", (e) => {
    selectOption(e.target.id);
  });

  option.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Space") {
      selectOption(e.target.id);
    }
  });
}

// Définir l'option initiale sélectionnée
selectOption(selectedOption);
