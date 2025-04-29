// Initial values
let production = 0;
let profit = 0;

// DOM Elements
const outputDisplay = document.getElementById("score");
const profitDisplay = document.getElementById("profit");

const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const closeSettings = document.getElementById("closeSettings");

// Economic settings
const valuePerGood = 10;  // Price per consumer good
const taxRate = 0.1;  // 10% tax rate

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
} else {
  document.body.classList.add("dark-mode");
}

// Clicker logic
laborButton.addEventListener("click", () => {
  production++;

  // Calculate net profit per good (after tax)
  const netProfitPerGood = valuePerGood * (1 - taxRate);  // 90% of $10
  
  // Add net profit to the total
  profit += netProfitPerGood;

  // Update UI
  outputDisplay.textContent = production;
  profitDisplay.textContent = profit.toFixed(2);  // Show only net profit
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const currentTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);
});

// Settings menu open/close
settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.remove("hidden");
});
closeSettings.addEventListener("click", () => {
  settingsMenu.classList.add("hidden");
});
