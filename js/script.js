//////////////
// Overlay //
////////////
const overlay = document.querySelector(".overlay");

// Close mobile menu and modals when clicking outside them
overlay.addEventListener("click", function () {
  if (overlay.classList.contains("overlay--modal")) {
    closeModal();
  } else {
    toggleMenu();
  }
});

//////////////////
// Mobile Menu //
////////////////
const btnMenu = document.querySelector(".btn--menu");
const btnMenuIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".navigation__list");

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

btnMenu.addEventListener("click", toggleMenu);

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

bookmark.addEventListener("click", bookmarkProject);

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
  overlay.classList.remove("overlay--hidden");
  overlay.classList.add("overlay--modal");
}

// Close selection modal, remove overlay
function closeModal() {
  modalPledges.classList.add("modal--hidden");
  overlay.classList.add("overlay--hidden");
  overlay.classList.remove("overlay--modal");
}

btnPrimary.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

// All pledge buttons open selection modal
btnPledge.forEach((item) => {
  item.addEventListener("click", () => {
    // Mark corresponding modal radio input as checked
    document.getElementById(`reward-${item.id}`).checked = true;
    openModal();
  });
});

/////////////////
// Testing Area
const amountGoal = 100000;
let amountBacked = 89914;
let totalBackers = 5007;
let numBamboo = 101;
let numBlack = 64;
let numMahogany = 0;
const formBtns = document.querySelectorAll(".btn--modal-form");

formBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // prevents page refresh
    e.preventDefault();

    // decrement remaining selected reward by one (if applicable)
    console.log(btn.id);
    if (btn.id === "submit-bamboo") {
      updateBamboo();
    } else if (btn.id === "submit-black") {
      updateBlack();
    }

    // add one to total number of backers
    totalBackers++;
    document.getElementById(
      "num-backers"
    ).innerHTML = totalBackers.toLocaleString();

    // add amount pledged to total amount backed

    // update slider to reflect new amount backed

    closeModal();
  });
});

// subtract one from number of bamboo stands remaining, update DOM
function updateBamboo() {
  numBamboo--;
  document.querySelectorAll(".numBamboo").forEach((item) => {
    item.innerHTML = numBamboo;
  });
}

// subtract one from number of black stands remaining, update DOM
function updateBlack() {
  numBlack--;
  document.querySelectorAll(".numBlack").forEach((item) => {
    item.innerHTML = numBlack;
  });
}
