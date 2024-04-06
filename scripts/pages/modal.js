// @ts-nocheck
/**
 * Variables globales du DOM
 */
const modal = document.getElementById("contact_modal");
const openModalBtn = document.querySelector(".contact_button");
const closeModalBtn = document.querySelector(".modal-close-btn");
const dialog = document.querySelector(".modal-dialog");
const content = document.querySelector(".modal-content");
const overlay = document.querySelector(".overlay");

/**
 * Affiche le modal et masque le reste de la page.
 */
function displayModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  openModalBtn.setAttribute("aria-expanded", "true");
  closeModalBtn.focus();
  document.body.style.overflow = "hidden";
  overlay.style.display = "block";
}

/**
 * Ferme le modal et rétablit l'affichage normal de la page.
 */
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  openModalBtn.setAttribute("aria-expanded", "false");
  openModalBtn.focus();
  document.body.style.overflow = "auto";
  overlay.style.display = "none";
}

openModalBtn.addEventListener("click", displayModal);
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
  event.preventDefault();
  validate();
});

/**
 * Valide une entrée de nom en utilisant une expression régulière.
 * @param {HTMLInputElement} input - L'élément input contenant le nom à valider.
 * @returns {boolean} Retourne true si le nom est valide, sinon false.
 */
function validateName(input) {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
  if (!regex.test(input.value)) {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

/**
 * Valide une entrée d'adresse e-mail en utilisant une expression régulière.
 * @param {HTMLInputElement} input - L'élément input contenant l'adresse e-mail à valider.
 * @returns {boolean} Retourne true si l'adresse e-mail est valide, sinon false.
 */
function validateEmail(input) {
  const emailRegex =
    /^[A-Za-z]{1,}[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(input.value)) {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

/**
 * Valide une entrée de message en vérifiant si elle est vide.
 * @param {HTMLTextAreaElement} input - L'élément textarea contenant le message à valider.
 * @returns {boolean} Retourne true si le message est valide (non vide), sinon false.
 */
function validateMessage(input) {
  if (input.value === "") {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

/**
 * Procedure de validation
 */
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

firstNameInput.addEventListener("input", function () {
  validateName(firstNameInput);
});
lastNameInput.addEventListener("input", function () {
  validateName(lastNameInput);
});
emailInput.addEventListener("input", function () {
  validateEmail(emailInput);
});
messageInput.addEventListener("input", function () {
  validateMessage(messageInput);
});

/**
 * Valide les champs de formulaire de prénom, nom, e-mail et message.
 * Si tous les champs sont valides, affiche les valeurs des champs dans la console, empêche le formulaire de se soumettre et ferme le modal.
 * @returns {boolean} Retourne true si tous les champs sont valides et false sinon.
 */
function validate() {
  const firstNameValid = validateName(firstNameInput);
  const lastNameValid = validateName(lastNameInput);
  const emailValid = validateEmail(emailInput);
  const messageValid = validateMessage(messageInput);

  const isValid = firstNameValid && lastNameValid && emailValid && messageValid;

  if (isValid) {
    console.log(
      "First name: " +
        firstNameInput.value +
        "\n" +
        "Last name: " +
        lastNameInput.value +
        "\n" +
        "Email: " +
        emailInput.value +
        "\n" +
        "Message: " +
        messageInput.value
    );
    event.preventDefault();
    closeModal();
    return true;
  } else {
    return false;
  }
}
