// main.js
//
// Small touches shared by every page.

// Keep the footer's copyright year current on its own.
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---- Light / dark toggle ----
//
// The theme is already resolved by the inline script in <head>; this only
// handles flipping it. The icon swap is pure CSS, keyed off data-theme.

const themeToggle = document.getElementById("theme-toggle");

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

// The label names the destination, since that is what a click does.
function labelFor(theme) {
  return theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

if (themeToggle) {
  themeToggle.setAttribute("aria-label", labelFor(currentTheme()));

  themeToggle.addEventListener("click", function () {
    const next = currentTheme() === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);
    themeToggle.setAttribute("aria-label", labelFor(next));

    try {
      localStorage.setItem("theme", next);
    } catch (err) {
      // No storage, so the choice lasts only for this page. Harmless.
    }
  });
}
