//////////////////
// Mobile Menu //
////////////////
const btn = document.querySelector(".btn--menu");
const btnIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".navigation__list");
const overlay = document.querySelector(".overlay");
const bookmark = document.querySelector(".bookmark");
const bookmarkTextActive = document.querySelector(".bookmark__text--active");

function toggleMenu() {
  nav.classList.toggle("navigation__list--hidden");
  overlay.classList.toggle("overlay--hidden");
  document.body.classList.toggle("disable-scroll");

  if (nav.classList.contains("navigation__list--hidden")) {
    btnIcon.src = "./images/icon-hamburger.svg";
    btn.setAttribute("aria-expanded", "false");
  } else {
    btnIcon.src = "./images/icon-close-menu.svg";
    btn.setAttribute("aria-expanded", "true");
  }
}

function bookmarkProject() {
  bookmark.classList.toggle("bookmark--active");

  if (bookmark.classList.contains("bookmark--active")) {
    bookmark.setAttribute("aria-pressed", "true");
  } else {
    bookmark.setAttribute("aria-pressed", "false");
  }
}

btn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
bookmark.addEventListener("click", bookmarkProject);
