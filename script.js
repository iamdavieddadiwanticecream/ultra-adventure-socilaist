let production = 0;

const outputDisplay = document.getElementById("score");
const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");

// Clicker logic
laborButton.addEventListener("click", () => {
  production++;
  outputDisplay.textContent = production;
});

// Theme toggle logic
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// Default theme: Dark mode
document.body.classList.add("dark-mode");
