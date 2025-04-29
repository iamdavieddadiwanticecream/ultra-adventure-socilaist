let production = 0;

// Get DOM elements
const outputDisplay = document.getElementById("score");
const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const closeSettings = document.getElementById("closeSettings");

// Clicker logic
laborButton.addEventListener("click", () => {
  production++;
  outputDisplay.textContent = production;
});

// Theme logic with memory
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
} else {
  document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  const newTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
});

// Settings menu toggle
settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.remove("hidden");
});

closeSettings.addEventListener("click", () => {
  settingsMenu.classList.add("hidden");
});
