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

// Event Listener
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

// Event Listener
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
const formBtns = document.querySelectorAll(".btn--modal-form");
const radioInputs = document.querySelectorAll(".radio__input");

////////////////////////////////
// Selection Modal Open/Close

// Open selection modal, apply overlay
function openModal() {
  modalPledges.classList.remove("modal--hidden");
  overlay.classList.remove("overlay--hidden");
  overlay.classList.add("overlay--modal");

  // scroll to top of window
  window.scrollTo(0, 0);

  // fix main page content when modal is open
  document.querySelector(".wrapper").style.position = "fixed";
}

// Close selection modal, remove overlay, reset forms
function closeModal() {
  modalPledges.classList.add("modal--hidden");
  modalPledges.classList.remove("fadeIn");
  overlay.classList.add("overlay--hidden");
  overlay.classList.remove("overlay--modal");

  // reset modal forms on close
  document.querySelectorAll(".pledge__modal-form").forEach((form) => {
    form.reset();
  });

  // deselect/uncheck all radio inputs on close
  radioInputs.forEach((input) => {
    input.checked = "false";
    input.closest(".pledge--modal").classList.remove("pledge--selected");
  });

  // remove "position: fixed" from main content when modal is closed
  document.querySelector(".wrapper").style.position = "relative";
}

// All pledge buttons open selection modal
btnPledge.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Mark corresponding modal radio input as checked
    document.getElementById(`reward-${btn.dataset.group}`).checked = true;
    document
      .getElementById(`reward-${btn.dataset.group}`)
      .closest(".pledge--modal")
      .classList.add("pledge--selected");

    openModal();

    // scroll to selected pledge
    const selected = document.getElementById(
      `modalPledge--${btn.dataset.group}`
    );
    selected.scrollIntoView();
  });
});

// Add styles to selected/checked modal pledge, remove styles if not selected/checked
function updateCheckedStyles() {
  radioInputs.forEach((input) => {
    if (input.checked) {
      input.closest(".pledge--modal").classList.add("pledge--selected");
    } else if (!input.checked) {
      input.closest(".pledge--modal").classList.remove("pledge--selected");
    }
  });
}

// Event Listeners
btnPrimary.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
radioInputs.forEach((input) => {
  input.addEventListener("change", updateCheckedStyles);
});

////////////////////////////////
// Submitting a Pledge

function updateReward(btn) {
  // get number left of reward selected
  let numRemaining = parseInt(
    document.querySelector(`.number--${btn.dataset.group}`).innerHTML
  );

  // decrement remaining rewards by 1, update DOM
  if (numRemaining > 0) {
    numRemaining--;
    document
      .querySelectorAll(`.number--${btn.dataset.group}`)
      .forEach((item) => {
        item.innerHTML = numRemaining;
      });
  }
  // if !numRemaining > 0 add update DOM to disable
}

function updateTotalBacked(btn) {
  // get amount pledge from submitted form
  const amountPledged = parseInt(
    document.getElementById(`amount-${btn.dataset.group}`).value
  );

  // add amount pledge to total
  totalBacked += amountPledged;

  // update new total in DOM
  document.getElementById(
    "total-backed"
  ).innerHTML = `$${totalBacked.toLocaleString()}`;

  // calculate new percentage of goal from updated total
  const percentageBacked = Math.floor((totalBacked / amountGoal) * 100);

  // update slider width with new percentage
  document.querySelector(
    ".statistics__slider-inner"
  ).style.width = `${percentageBacked}%`;
}

// Event Listener
formBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // prevents page refresh, which would reset variables
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
