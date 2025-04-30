// Save the current game state
function saveGameState(production, profit, taxRate) {
  const gameData = {
    production,
    profit,
    taxRate
  };
  localStorage.setItem("myGame_gameData", JSON.stringify(gameData));
}

// Load saved game state
function loadGameState() {
  const saved = JSON.parse(localStorage.getItem("myGame_gameData"));
  if (
    saved &&
    typeof saved.production === "number" &&
    typeof saved.profit === "number" &&
    typeof saved.taxRate === "number"
  ) {
    return saved;
  }
  return { production: 0, profit: 0, taxRate: 10 };
}

// Reset game state
function resetGame() {
  localStorage.removeItem("myGame_gameData");
  location.reload();
}
