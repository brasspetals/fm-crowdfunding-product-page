//////////////
// Overlay //
////////////
const overlay = document.querySelector(".overlay");

// Close mobile menu and modals when clicking on the overlay
function overlayClose() {
  if (overlay.classList.contains("overlay--modal")) {
    closeModal();
  } else {
    toggleMenu();
  }
}

///////////////////
// Event Listener
overlay.addEventListener("click", overlayClose);

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

///////////////////
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

///////////////////
// Event Listener
bookmark.addEventListener("click", bookmarkProject);

/////////////
// Modals //
///////////
const btnPrimary = document.querySelector(".btn--primary");
const btnSelectReward = document.querySelectorAll(".btn--reward");
const modalSelection = document.querySelector(".modal");
const modalSuccess = document.querySelector(".modal--success");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnCloseSuccess = document.querySelector(".btn--success");
const amountGoal = 100000;
let totalBacked = 89914;
let totalBackers = 5007;
const radioInputs = document.querySelectorAll(".radio__input");
const pledgeForms = document.querySelectorAll(".pledge__modal-form");
const modalContainer = document.querySelector(".modal-container");

///////////////////////////////
// Selection Modal Open/Close

// Open selection modal, apply overlay
function openModal() {
  modalSelection.classList.remove("modal--hidden");
  modalSelection.classList.add("fadeIn");
  overlay.classList.remove("overlay--hidden");
  overlay.classList.add("overlay--modal");
  document.body.classList.add("modal-open");
  modalContainer.classList.remove("hidden");
}

// Close selection modal, remove overlay, reset forms
function closeModal() {
  modalSelection.classList.add("modal--hidden");
  modalSuccess.classList.add("modal--hidden");
  overlay.classList.add("overlay--hidden");
  overlay.classList.remove("overlay--modal");
  document.body.classList.remove("modal-open");
  modalContainer.classList.add("hidden");

  // reset selection modal forms and pledge selection
  selectionModalReset();
}

// Reset selection modal
function selectionModalReset() {
  // reset modal forms on close
  document.querySelectorAll(".pledge__modal-form").forEach((form) => {
    form.reset();
  });

  // deselect/uncheck all radio inputs on close
  radioInputs.forEach((input) => {
    input.checked = "false";
    input.closest(".pledge").classList.remove("pledge--selected");
  });
}

// Add styles to selected/checked modal pledge, remove styles if not selected/checked
function updateCheckedStyles() {
  radioInputs.forEach((input) => {
    if (input.checked) {
      input.closest(".pledge").classList.add("pledge--selected");
    } else if (!input.checked) {
      input.closest(".pledge").classList.remove("pledge--selected");
    }
  });
}

////////////////////
// Event Listeners

btnPrimary.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
btnCloseSuccess.addEventListener("click", closeModal);
btnSelectReward.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Mark corresponding modal radio input as checked
    document.getElementById(`reward-${btn.dataset.group}`).checked = true;
    document
      .getElementById(`reward-${btn.dataset.group}`)
      .closest(".pledge")
      .classList.add("pledge--selected");

    openModal();

    // scroll to selected pledge
    const selected = document.getElementById(
      `modalPledge--${btn.dataset.group}`
    );

    selected.scrollIntoView({
      behavior: "auto",
      block: "center",
    });
  });
});

radioInputs.forEach((input) => {
  input.addEventListener("change", updateCheckedStyles);
});

modalContainer.addEventListener("click", (e) => {
  // close modal if clicking outside it
  if (e.target !== e.currentTarget) {
    return;
  } else {
    closeModal();
  }
});

////////////////////////
// Submitting a Pledge

function updateReward(form) {
  // get number left of reward selected
  let numRemaining = parseInt(
    document.querySelector(`.number--${form.dataset.group}`).innerHTML
  );

  // decrement remaining rewards by 1, update DOM
  if (numRemaining > 0) {
    numRemaining--;
    document
      .querySelectorAll(`.number--${form.dataset.group}`)
      .forEach((item) => {
        item.innerHTML = numRemaining;
      });
  }
  // if !numRemaining > 0 add update DOM to disable
}

function updateTotalBacked(form) {
  // get amount pledge from submitted form
  const amountPledged = parseInt(
    document.getElementById(`amount-${form.dataset.group}`).value
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

function successModal() {
  // reset selection modal forms and selected pledge
  selectionModalReset();

  // hide selection modal and show thank you modal
  modalSelection.classList.add("modal--hidden");
  modalSuccess.classList.remove("modal--hidden");
  modalSuccess.classList.add("fadeIn");
}

///////////////////
// Event Listener

pledgeForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    // prevents page refresh, which would reset variables
    e.preventDefault();

    // decrement remaining selected reward by one (if applicable) and update DOM
    if (form.dataset.group != "noreward") {
      updateReward(form);
    }

    // add one to total number of backers
    totalBackers++;
    document.getElementById(
      "num-backers"
    ).innerHTML = totalBackers.toLocaleString();

    // add amount pledged to total amount backed & update silder percentage
    updateTotalBacked(form);

    // close selection modal and open thank you modal
    successModal();
  });
});
