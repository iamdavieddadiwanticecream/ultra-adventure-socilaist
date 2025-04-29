let production = 0;
const outputDisplay = document.getElementById("score");
const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");

// Initialize theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
} else {
  document.body.classList.add("dark-mode");
}

// Clicker logic
laborButton.addEventListener("click", () => {
  production++;
  outputDisplay.textContent = production;
});

// Theme toggle logic
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  // Save the current theme to localStorage
  const newTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
});
