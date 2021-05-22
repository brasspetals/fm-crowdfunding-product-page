//////////////
// Overlay //
////////////
const overlay = document.querySelector(".overlay");

function overlayClose() {
  if (overlay.classList.contains("overlay--modal")) {
    closeModal();
  } else {
    toggleMenu();
  }
}

//////////////////////////
// Overlay Event Listener
// close mobile menu and modals when clicking on the overlay
overlay.addEventListener("click", overlayClose);

//////////////////
// Mobile Menu //
////////////////
const btnMenu = document.querySelector(".btn--menu");
const btnMenuIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".navigation__list");

function toggleMenu() {
  // toggle mobile nav and overlay visibility
  nav.classList.toggle("navigation__list--hidden");
  overlay.classList.toggle("overlay--hidden");
  document.body.classList.toggle("disable-scroll");

  // change menu button icon and aria-expanded
  if (nav.classList.contains("navigation__list--hidden")) {
    btnMenuIcon.src = "./images/icon-hamburger.svg";
    btnMenu.setAttribute("aria-expanded", "false");
  } else {
    btnMenuIcon.src = "./images/icon-close-menu.svg";
    btnMenu.setAttribute("aria-expanded", "true");
  }
}

////////////////////////
// Menu Event Listener
btnMenu.addEventListener("click", toggleMenu);

//////////////////////
// Bookmark Button //
////////////////////
const bookmark = document.querySelector(".bookmark");

// toggle bookmark active styles
function bookmarkProject() {
  bookmark.classList.toggle("bookmark--active");

  if (bookmark.classList.contains("bookmark--active")) {
    bookmark.setAttribute("aria-pressed", "true");
  } else {
    bookmark.setAttribute("aria-pressed", "false");
  }
}

///////////////////////////
// Bookmark Event Listener
bookmark.addEventListener("click", bookmarkProject);

/////////////
// Modals //
///////////
// Variables
const amountGoal = 100000;
let totalBacked = 89914;
let totalBackers = 5007;
let focusedElementBeforeModal;

// Trigger buttons
const btnPrimary = document.querySelector(".btn--primary");
const btnSelectReward = document.querySelectorAll(".btn--reward");

// Modal Container
const modalContainer = document.querySelector(".modal-container");

// Selection Modal
const modalSelection = document.querySelector(".modal--selection");
const btnCloseModal = document.querySelector(".btn--close-modal");
const radioInputs = document.querySelectorAll(".radio__input");
const pledgeForms = document.querySelectorAll(".pledge__form");

// Success Modal
const modalSuccess = document.querySelector(".modal--success");
const btnCloseSuccess = document.querySelector(".btn--success");

////////////////////////
// Open Selection Modal
function openModal() {
  // save last focused element (the trigger button that was used to open modal)
  focusedElementBeforeModal = document.activeElement;

  // apply overlay
  overlay.classList.remove("overlay--hidden");
  overlay.classList.add("overlay--modal");
  // open modal
  document.body.classList.add("modal-open");
  modalContainer.classList.remove("hidden");
  modalSelection.classList.remove("hidden");
  // apply modal "fade in" transition
  modalSelection.classList.add("fadeIn");
  modalSelection.focus();
}

///////////////////////////////
// Open Modal: Event Listeners
btnPrimary.addEventListener("click", (e) => {
  // Safari fix to manually add focus to button on click - used for "focusedElementBeforeModal" functionality
  e.target.focus();
  openModal();
  document.activeElement.blur();
});

btnSelectReward.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Safari fix to manually add focus to button on click
    e.target.focus();

    // mark corresponding modal radio input as checked
    document.getElementById(`reward-${btn.dataset.group}`).checked = true;
    openModal();
    updateCheckedStyles();
    document.getElementById(`reward-${btn.dataset.group}`).focus();

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

////////////////
// Close Modal
function closeModal() {
  // close selection modal, remove overlay
  modalSelection.classList.add("hidden");
  modalSelection.classList.remove("fadeIn");
  modalSuccess.classList.add("hidden");
  modalSuccess.classList.remove("fadeInSuccess");
  overlay.classList.add("overlay--hidden");
  overlay.classList.remove("overlay--modal");
  document.body.classList.remove("modal-open");
  modalContainer.classList.add("hidden");

  // apply focus back to where it was before modal was opened
  focusedElementBeforeModal.focus();
}

////////////////////////////////
// Close Modal: Event Listeners
btnCloseModal.addEventListener("click", closeModal);
btnCloseSuccess.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  // close modal by pressing "escape" key
  if (event.key == "Escape" && overlay.classList.contains("overlay--modal")) {
    closeModal();
  }
});

modalContainer.addEventListener("click", (e) => {
  // close modal if clicking outside it
  if (e.target !== e.currentTarget) {
    return;
  } else {
    closeModal();
  }
});

///////////////////////////////////////////
// Apply "Checked" Styles to Modal Pledges
function updateCheckedStyles() {
  // add styles to selected/checked modal pledge, remove styles if not selected/checked
  radioInputs.forEach((input) => {
    if (input.checked) {
      input.closest(".pledge").classList.add("pledge--selected");
    } else if (!input.checked) {
      input.closest(".pledge").classList.remove("pledge--selected");
    }
  });
}

radioInputs.forEach((input) => {
  input.addEventListener("change", updateCheckedStyles);
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
  // take focus off pledge submit button to prevent accidental resubmission
  document.activeElement.blur();
  // hide selection modal and show thank you modal
  modalSelection.classList.add("hidden");
  modalSuccess.classList.remove("hidden");
  modalSuccess.classList.add("fadeInSuccess");
  // modalSuccess.focus();
}

//////////////////////////////
// Pledge Submit Event Listener
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
    document.getElementById("num-backers").innerHTML =
      totalBackers.toLocaleString();

    // add amount pledged to total amount backed & update silder percentage
    updateTotalBacked(form);

    // close selection modal and open thank you modal
    successModal();
  });
});
