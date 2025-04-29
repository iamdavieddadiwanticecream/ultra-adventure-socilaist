let production = 0;
const outputDisplay = document.getElementById("score");
const laborButton = document.getElementById("clickBtn");

laborButton.addEventListener("click", () => {
  production++;
  outputDisplay.textContent = production;
});
