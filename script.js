// Initial values
let production = 0;
let profit = 0;
let taxRate = 10; // Leader gets 10% of consumer profit (i.e., $1 per $10)

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
outputDisplay.textContent = production;
profitDisplay.textContent = profit.toFixed(2);
taxRateDisplay.textContent = taxRate; // Display as percentage (e.g., 10 for 10% tax)

// Clicker logic — player gets tax % of consumer profit
laborButton.addEventListener("click", () => {
  production++;

  // Calculate how much the leader (you) earn based on the tax rate
  const leaderCut = valuePerGood * (taxRate / 100); // taxRate / 100 to convert from percentage
  profit += leaderCut;

  // Update UI
  outputDisplay.textContent = production;
  profitDisplay.textContent = profit.toFixed(2);
});

increaseTaxBtn.addEventListener("click", () => {
  if (taxRate < 100) {
    taxRate += 5; // Increment tax rate by 5%
    updateTaxDisplay();
  }
});

decreaseTaxBtn.addEventListener("click", () => {
  if (taxRate > 0) {
    taxRate -= 5; // Decrease tax rate by 5%
    updateTaxDisplay();
  }
});

function updateTaxDisplay() {
  taxRateDisplay.textContent = taxRate; // Update the displayed tax rate (in percentage)
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
