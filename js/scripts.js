// Écoute l'événement DOMContentLoaded pour s'assurer que le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne tous les éléments avec la classe "card"
  const cards = document.querySelectorAll(".card");
  // Récupère l'élément popup par son ID
  const popup = document.getElementById("info-popup");
  // Récupère le contenu du popup
  const popupContent = document.getElementById("popup-content");
  // Récupère le bouton de fermeture du popup
  const closePopupBtn = document.getElementById("close-popup");
  // Variable pour gérer l'état d'animation
  let isAnimating = false;

  // Fonction pour afficher le popup avec les informations fournies
  const showPopup = (info) => {
    popupContent.textContent = info; // Définit le contenu du popup
    popup.style.display = "block"; // Affiche le popup
    popup.style.transform = "scale(0)"; // Initialise la transformation à l'échelle 0
    setTimeout(() => {
      popup.style.transition = "transform 0.3s ease-out"; // Définit la transition
      popup.style.transform = "scale(1)"; // Applique l'échelle 1 pour l'animation
    }, 10);
  };

  // Fonction pour fermer le popup
  const closePopup = () => {
    if (isAnimating) return; // Évite de fermer si déjà en animation
    isAnimating = true; // Indique que l'animation est en cours
    popup.style.transform = "scale(0)"; // Réduit le popup à l'échelle 0
    popup.style.transition = "transform 0.3s ease-in"; // Définit la transition pour la fermeture
    setTimeout(() => {
      popup.style.display = "none"; // Cache le popup après l'animation
      isAnimating = false; // Réinitialise l'état d'animation
    }, 300);
  };

  // Ajoute un écouteur d'événements pour chaque carte
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!isAnimating) {
        // Vérifie si aucune animation n'est en cours
        showPopup(card.dataset.info); // Affiche le popup avec les informations de la carte
      }
    });
  });

  // Ajoute un écouteur d'événements pour le bouton de fermeture
  closePopupBtn.addEventListener("click", closePopup);

  // Fonction pour gérer le clic sur le bouton "like"
  const handleLike = (button) => {
    const likeCountElement = button.querySelector(".like-count"); // Récupère l'élément du compteur de likes
    let likeCount = parseInt(likeCountElement.textContent, 10); // Convertit le texte en nombre
    likeCountElement.textContent = likeCount + 1; // Incrémente le compteur de likes

    button.classList.add("liked"); // Ajoute la classe "liked" au bouton
    setTimeout(() => button.classList.remove("liked"), 300); // Retire la classe après 300ms

    likeCountElement.classList.add("pulse"); // Ajoute l'effet de pulsation au compteur
    setTimeout(() => likeCountElement.classList.remove("pulse"), 500); // Retire l'effet après 500ms
  };

  // Sélectionne tous les boutons "like"
  const likeButtons = document.querySelectorAll(".like-btn");
  // Ajoute un écouteur d'événements pour chaque bouton "like"
  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche la propagation de l'événement
      handleLike(button); // Appelle la fonction pour gérer le like
    });
  });
});
