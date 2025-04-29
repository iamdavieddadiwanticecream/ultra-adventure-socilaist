let production = 0;
const outputDisplay = document.getElementById("score");
const laborButton = document.getElementById("clickBtn");

laborButton.addEventListener("click", () => {
  production++;
  outputDisplay.textContent = production;
});
let production = 0;
const outputDisplay = document.getElementById("score");
const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");

// Increase production on click
laborButton.addEventListener("click", () => {
  production++;
  outputDisplay.textContent = production;
});

// Theme toggle logic
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// Set default theme
document.body.classList.add("dark-mode"); // Start in dark mode
