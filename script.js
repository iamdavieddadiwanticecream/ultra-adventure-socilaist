// Load saved data
const savedGame = loadGameState();
let production = savedGame.production;
let profit = savedGame.profit;
let taxRate = savedGame.taxRate;

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
const valuePerGood = 10; // Consumer profit per good

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
} else {
  document.body.classList.add("dark-mode");
}

// Initialize UI
updateUI();

// --- Gameplay Logic ---

// Clicker logic — player gets tax % of consumer profit
laborButton.addEventListener("click", () => {
  production++;

  // Calculate how much the leader (you) earn based on the tax rate
  const leaderCut = valuePerGood * (taxRate / 100); // taxRate / 100 to convert from percentage
  profit += leaderCut;

  updateUI();
  saveGameState(production, profit, taxRate);
});

increaseTaxBtn.addEventListener("click", () => {
  if (taxRate < 100) {
    taxRate += 5; // Increment tax rate by 5%
    updateUI();
    saveGameState(production, profit, taxRate);
  }
});

decreaseTaxBtn.addEventListener("click", () => {
  if (taxRate > 0) {
    taxRate -= 5; // Decrease tax rate by 5%
    updateUI();
    saveGameState(production, profit, taxRate);
  }
});

// Update UI function
function updateUI() {
  outputDisplay.textContent = production;
  profitDisplay.textContent = profit.toFixed(2);
  taxRateDisplay.textContent = taxRate;
}

// Theme toggle (for light/dark mode)
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
