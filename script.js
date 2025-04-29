let production = 0;

const outputDisplay = document.getElementById("score");
const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");

// Clicker logic
laborButton.addEventListener("click", () => {
  production++;
  outputDisplay.textContent = production;
});

// Check saved theme on load
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
} else {
  document.body.classList.add("dark-mode");
}

// Theme toggle logic with memory
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const newTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
});
