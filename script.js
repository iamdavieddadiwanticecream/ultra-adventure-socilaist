// Initial values
let production = 0;
let totalRevenue = 0;
let taxPaid = 0;
let profit = 0;

// DOM Elements
const outputDisplay = document.getElementById("score");
const moneyDisplay = document.getElementById("money");
const taxDisplay = document.getElementById("tax");
const profitDisplay = document.getElementById("profit");

const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const closeSettings = document.getElementById("closeSettings");

// Economic settings
const valuePerGood = 10;
const taxRate = 0.2; // 20% tax

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

  const revenue = valuePerGood;
  const tax = revenue * taxRate;
  const net = revenue - tax;

  totalRevenue += revenue;
  taxPaid += tax;
  profit += net;

  // Update UI
  outputDisplay.textContent = production;
  moneyDisplay.textContent = totalRevenue.toFixed(2);
  taxDisplay.textContent = taxPaid.toFixed(2);
  profitDisplay.textContent = profit.toFixed(2);
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
