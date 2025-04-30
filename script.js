// Initial values
let production = 0;
let profit = 0;
let taxRate = 0.1; // Player receives 10%

// DOM Elements
const outputDisplay = document.getElementById("score");
const profitDisplay = document.getElementById("profit");
const taxRateDisplay = document.getElementById("taxRateDisplay");

const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const closeSettings = document.getElementById("closeSettings");

const increaseTaxBtn = document.getElementById("increaseTax");
const decreaseTaxBtn = document.getElementById("decreaseTax");

// Constants
const valuePerGood = 10; // Each good is worth $10

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
} else {
  document.body.classList.add("dark-mode");
}

// Initialize UI
outputDisplay.textContent = production;
profitDisplay.textContent = profit.toFixed(2);
taxRateDisplay.textContent = (taxRate * 100).toFixed(0);

// Clicker logic — player earns tax share
laborButton.addEventListener("click", () => {
  production++;

  const taxEarnings = valuePerGood * taxRate;
  profit += taxEarnings;

  outputDisplay.textContent = production;
  profitDisplay.textContent = profit.toFixed(2);
});

// Tax rate increase/decrease
increaseTaxBtn.addEventListener("click", () => {
  if (taxRate < 1) {
    taxRate += 0.01;
    updateTaxDisplay();
  }
});

decreaseTaxBtn.addEventListener("click", () => {
  if (taxRate > 0) {
    taxRate -= 0.01;
    updateTaxDisplay();
  }
});

function updateTaxDisplay() {
  taxRateDisplay.textContent = (taxRate * 100).toFixed(0);
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const currentTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);
});

// Settings menu toggle
settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.remove("hidden");
});
closeSettings.addEventListener("click", () => {
  settingsMenu.classList.add("hidden");
});
