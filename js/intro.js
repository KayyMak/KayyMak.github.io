// intro.js
//
// The intro state machine, in three states:
//   1. loading — the progress bar fills as the page loads
//   2. ready   — "click to continue", waiting for the visitor
//   3. main    — both overlays gone, the page fades in
//
// Only the home page carries the overlays, so the other pages load straight
// in. The overlays are hidden in CSS by default, so if this file fails to
// load the visitor still lands straight on the page.

// How long the bar takes to fill, assuming the page is already loaded.
const LOADING_MS = 1800;

// The bar climbs on a clock, but holds at this mark until the browser says
// every image, stylesheet, and script has finished loading. That way the last
// stretch means something rather than just running out the timer.
const HOLD_AT = 90;

const body = document.body;
const loadingScreen = document.getElementById("loading");
const continueScreen = document.getElementById("click-to-continue");
const fill = document.getElementById("loading-fill");
const readout = document.getElementById("loading-percent");

let pageLoaded = document.readyState === "complete";
let startedAt = null;

function showLoading() {
  body.classList.add("intro-active");
  loadingScreen.classList.add("visible");
  requestAnimationFrame(step);
}

function step(now) {
  if (startedAt === null) {
    startedAt = now;
  }

  const elapsed = now - startedAt;
  const onTheClock = Math.min(1, elapsed / LOADING_MS) * 100;
  const percent = pageLoaded ? onTheClock : Math.min(onTheClock, HOLD_AT);

  render(percent);

  if (percent >= 100) {
    showReady();
  } else {
    requestAnimationFrame(step);
  }
}

function render(percent) {
  if (fill) {
    fill.style.width = percent + "%";
  }
  if (readout) {
    readout.textContent = Math.round(percent) + "%";
  }
}

function showReady() {
  loadingScreen.classList.remove("visible");
  continueScreen.classList.add("visible");

  // A click anywhere on the overlay, or any key, moves on.
  continueScreen.addEventListener("click", showMain);
  document.addEventListener("keydown", showMain);
}

function showMain() {
  continueScreen.removeEventListener("click", showMain);
  document.removeEventListener("keydown", showMain);

  continueScreen.classList.remove("visible");
  body.classList.remove("intro-active");
}

// Pages without the overlays skip all of this.
if (loadingScreen && continueScreen) {
  window.addEventListener("load", function () {
    pageLoaded = true;
  });

  // If the load event never arrives, don't strand the visitor behind the bar.
  setTimeout(function () {
    pageLoaded = true;
  }, LOADING_MS * 3);

  showLoading();
}
