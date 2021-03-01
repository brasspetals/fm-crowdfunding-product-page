const btn = document.querySelector(".btn--menu");
const btnIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".navigation__list");

function toggleMenu() {
  nav.classList.toggle("navigation__list--hidden");
  document.body.classList.toggle("disable-scroll");

  if (nav.classList.contains("navigation__list--hidden")) {
    btnIcon.src = "./images/icon-hamburger.svg";
    btn.setAttribute("aria-expanded", "false");
  } else {
    btnIcon.src = "./images/icon-close-menu.svg";
    btn.setAttribute("aria-expanded", "true");
  }
}

btn.addEventListener("click", toggleMenu);
