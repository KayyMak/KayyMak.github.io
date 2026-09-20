// main.js
//
// Small touches for the main page.

// Keep the footer's copyright year current on its own.
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
