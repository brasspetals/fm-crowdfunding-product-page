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

// Toggle mobile nav and overlay visibility
function toggleMenu() {
  nav.classList.toggle("navigation__list--hidden");
  overlay.classList.toggle("overlay--hidden");
  document.body.classList.toggle("disable-scroll");

  // Change menu button icon and aria-expanded
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

// Toggle bookmark active styles
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
const amountGoal = 100000;
let totalBacked = 89914;
let totalBackers = 5007;
let numBamboo = 101;
let numBlack = 64;
let numMahogany = 0;
const formBtns = document.querySelectorAll(".btn--modal-form");

////////////////////////////////
// Selection Modal Open/Close

// Open selection modal, apply overlay
function openModal() {
  modalPledges.classList.remove("modal--hidden");
  modalPledges.classList.add("fadeIn");
  overlay.classList.remove("overlay--hidden");
  overlay.classList.add("overlay--modal");

  window.scrollTo(0, 0);

  document.querySelector(".wrapper").style.position = "fixed";
}

// Close selection modal, remove overlay, reset forms
function closeModal() {
  modalPledges.classList.add("modal--hidden");
  modalPledges.classList.remove("fadeIn");
  overlay.classList.add("overlay--hidden");
  overlay.classList.remove("overlay--modal");

  document.querySelectorAll(".pledge__modal-form").forEach((form) => {
    form.reset();
  });

  document.querySelector(".wrapper").style.position = "relative";
}

// All pledge buttons open selection modal
btnPledge.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Mark corresponding modal radio input as checked
    document.getElementById(`reward-${btn.dataset.group}`).checked = true;
    openModal();
  });
});

btnPrimary.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

////////////////////////////////
// Submitting a Pledge

function updateReward(btn) {
  const reward = btn.dataset.group;

  if (reward == "bamboo") {
    numBamboo--;
    document.querySelectorAll(".numBamboo").forEach((item) => {
      item.innerHTML = numBamboo;
    });
  } else if (reward == "black") {
    numBlack--;
    document.querySelectorAll(".numBlack").forEach((item) => {
      item.innerHTML = numBlack;
    });
  }
}

function updateTotalBacked(btn) {
  const amountPledged = parseInt(
    document.getElementById(`amount-${btn.dataset.group}`).value
  );

  totalBacked += amountPledged;

  document.getElementById(
    "total-backed"
  ).innerHTML = `$${totalBacked.toLocaleString()}`;

  // update slider width to new percentage of total backed
  const percentageBacked = Math.floor((totalBacked / amountGoal) * 100);

  document.querySelector(
    ".statistics__slider-inner"
  ).style.width = `${percentageBacked}%`;
}

formBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // prevents page refresh
    e.preventDefault();

    // decrement remaining selected reward by one (if applicable) and update DOM
    if (btn.dataset.group != "noreward") {
      updateReward(btn);
    }

    // add one to total number of backers
    totalBackers++;
    document.getElementById(
      "num-backers"
    ).innerHTML = totalBackers.toLocaleString();

    // add amount pledged to total amount backed & update silder percentage
    updateTotalBacked(btn);

    // close selection modal and open thank you modal
    closeModal();
  });
});
