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
const modalTrigger = document.querySelectorAll(".modal-trigger");
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
function openModal(triggerbtn) {
  // save last focused element
  focusedElementBeforeModal = triggerbtn;
  focusedElementBeforeModal.setAttribute("aria-expanded", "true");

  // apply overlay
  overlay.classList.remove("overlay--hidden");
  overlay.classList.add("overlay--modal");

  // reveal modal
  document.body.classList.add("modal-open");
  modalContainer.classList.remove("display-none");
  modalContainer.classList.remove("hidden");
  modalSelection.classList.remove("hidden");
  modalSelection.classList.remove("fadeOut");

  // apply modal "fade in" transition
  modalSelection.classList.add("fadeIn");
  modalSelection.focus();

  // focus trap
  modalSelection.addEventListener("keydown", tabTrapKey);

  const focusableElementsString =
    "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

  let focusableElements = modalSelection.querySelectorAll(
    focusableElementsString
  );

  focusableElements = Array.prototype.slice.call(focusableElements);

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  function tabTrapKey(event) {
    // check if tab is pressed
    if (event.key === "Tab") {
      // shift tab
      if (event.shiftKey) {
        if (document.activeElement === firstTabStop) {
          event.preventDefault();
          lastTabStop.focus();
        }
        // tab
      } else {
        if (document.activeElement === lastTabStop) {
          event.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  }

  if (triggerbtn === btnPrimary) {
    // blur focus style on selection modal
    document.activeElement.blur();
    firstTabStop.focus(); // !!! not being applied - why?
  } else {
    // !!! focus trap doesn't work for these buttons - why?
    // mark corresponding modal radio input as checked
    document.getElementById(
      `reward-${triggerbtn.dataset.group}`
    ).checked = true;
    updateCheckedStyles();
    document.getElementById(`reward-${triggerbtn.dataset.group}`).focus();

    // scroll to selected pledge
    const selected = document.getElementById(
      `modalPledge--${triggerbtn.dataset.group}`
    );

    selected.scrollIntoView({
      behavior: "auto",
      block: "center",
    });
  }
}

// apply "checked" styles to modal pledges
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

modalTrigger.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Safari fix to manually add focus to button on click - used for "focusedElementBeforeModal" functionality
    e.target.focus();
    openModal(btn);
  });
});

////////////////
// Close Modal
function closeModal() {
  // close selection modal, remove overlay
  modalSelection.classList.add("hidden");
  modalSelection.classList.remove("fadeIn");
  modalSelection.classList.add("fadeOut");
  modalSuccess.classList.add("hidden");
  modalSuccess.classList.add("fadeOutSuccess");
  modalSuccess.classList.remove("fadeInSuccess");
  overlay.classList.add("overlay--hidden");
  overlay.classList.remove("overlay--modal");
  document.body.classList.remove("modal-open");
  modalContainer.classList.add("hidden");

  // reset forms
  document.querySelectorAll(".pledge__form").forEach((form) => {
    form.reset();
  });
  // uncheck radio buttons and remove styling
  radioInputs.forEach((input) => {
    input.checked = false;
  });
  updateCheckedStyles();

  // apply focus back to where it was before modal was opened
  document.activeElement.blur();
  focusedElementBeforeModal.focus();
  focusedElementBeforeModal.setAttribute("aria-expanded", "false");

  setTimeout(function () {
    modalContainer.classList.add("display-none");
  }, 700);
}

// close modals by pressing close buttons
[btnCloseModal, btnCloseSuccess].forEach((btn) => {
  btn.addEventListener("click", closeModal);
});
// close modals by pressing "escape" key
document.addEventListener("keydown", (event) => {
  if (event.key == "Escape" && overlay.classList.contains("overlay--modal")) {
    closeModal();
  }
});
// close modals if clicking outside them
modalContainer.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) {
    return;
  } else {
    closeModal();
  }
});

////////////////////////
// Submitting a Pledge
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
  modalSelection.classList.add("fadeOut");
  modalSuccess.classList.remove("hidden");
  modalSuccess.classList.remove("fadeOutSuccess");
  modalSuccess.classList.add("fadeInSuccess");
}
