// Save the current game state
function saveGameState(production, profit, taxRate) {
  const gameData = {
    production,
    profit,
    taxRate
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
}

// Load saved game state
function loadGameState() {
  const saved = JSON.parse(localStorage.getItem("gameData"));
  return saved || { production: 0, profit: 0, taxRate: 10 };
}

// Reset game state
function resetGame() {
  localStorage.removeItem("gameData");
  location.reload();
}
