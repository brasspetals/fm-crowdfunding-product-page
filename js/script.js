//////////////////
// Mobile Menu //
////////////////
const btnMenu = document.querySelector(".btn--menu");
const btnMenuIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".navigation__list");
const overlay = document.querySelector(".overlay");

function toggleMenu() {
  nav.classList.toggle("navigation__list--hidden");
  overlay.classList.toggle("overlay--hidden");
  document.body.classList.toggle("disable-scroll");

  if (nav.classList.contains("navigation__list--hidden")) {
    btnMenuIcon.src = "./images/icon-hamburger.svg";
    btnMenu.setAttribute("aria-expanded", "false");
  } else {
    btnMenuIcon.src = "./images/icon-close-menu.svg";
    btnMenu.setAttribute("aria-expanded", "true");
  }
}

//////////////////////
// Bookmark Button //
////////////////////
const bookmark = document.querySelector(".bookmark");

function bookmarkProject() {
  bookmark.classList.toggle("bookmark--active");

  if (bookmark.classList.contains("bookmark--active")) {
    bookmark.setAttribute("aria-pressed", "true");
  } else {
    bookmark.setAttribute("aria-pressed", "false");
  }
}

/////////////
// Modals //
///////////
const btnPrimary = document.querySelector(".btn--primary");
const btnPledge = document.querySelectorAll(".btn--pledge");
const modalPledges = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".btn--close-modal");

// Open selection modal, apply overlay
function openModal() {
  modalPledges.classList.remove("modal--hidden");
  overlay.classList.toggle("overlay--hidden");
  overlay.classList.add("overlay--modal");
}

// Close selection modal, remove overlay
function closeModal() {
  modalPledges.classList.add("modal--hidden");
  overlay.classList.toggle("overlay--hidden");
  overlay.classList.remove("overlay--modal");
}

//////////////////////
// Event Listeners //
////////////////////
btnMenu.addEventListener("click", toggleMenu);
btnPrimary.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
bookmark.addEventListener("click", bookmarkProject);

// All pledge buttons open selection modal
btnPledge.forEach((item) => {
  item.addEventListener("click", (event) => {
    document.getElementById(`reward-${item.id}`).checked = true;
    openModal();
  });
});

// Close mobile menu and modals when clicking outside them
overlay.addEventListener("click", function () {
  if (overlay.classList.contains("overlay--modal")) {
    closeModal();
  } else {
    toggleMenu();
  }
});
