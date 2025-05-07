// Load saved data
const savedGame = loadGameState();
let production = savedGame.production;
let profit = savedGame.profit;
let taxRate = savedGame.taxRate;
let wood = savedGame.wood || 0;
let iron = savedGame.iron || 0;
let nails = savedGame.nails || 0;
let smelterBuilt = savedGame.smelterBuilt || false;

// DOM Elements
const outputDisplay = document.getElementById("score");
const profitDisplay = document.getElementById("profit");
const taxRateDisplay = document.getElementById("taxRateDisplay");

const laborButton = document.getElementById("clickBtn");
const themeToggle = document.getElementById("themeToggle");
const resetGameBtn = document.getElementById("resetGameBtn");

const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const closeSettings = document.getElementById("closeSettings");

const propertyMenu = document.getElementById("propertyMenu");
const propertyMenuBtn = document.getElementById("propertyBtn");
const closePropertyBtn = document.getElementById("closeProperty");

const cityBtn = document.getElementById("cityBtn");
const cityMenu = document.getElementById("cityMenu");
const shedBtn = document.getElementById("shedBtn");
const houseBtn = document.getElementById("houseBtn");
const smelterBtn = document.getElementById("smelterBtn");
const smelterStatus = document.getElementById("smelterStatus");

const jobsMenu = document.getElementById("jobsMenu");
const startWoodcutting = document.getElementById("startWoodcutting");
const startIronMining = document.getElementById("startIronMining");
const startSmelting = document.getElementById("startSmelting");

const woodProgress = document.getElementById("woodProgress");
const ironProgress = document.getElementById("ironProgress");
const smelterProgress = document.getElementById("smelterProgress");

const closeJobsBtn = document.getElementById("closeJobs");

const valuePerGood = 10;

// Job times (seconds)
const TREE_CUT_TIME = 5;
const IRON_MINE_TIME = 10;
const SMELT_NAIL_TIME = 10;

// Load theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
} else {
  document.body.classList.add("dark-mode");
}

// Save/load functions
function saveGameState() {
  const gameData = {
    production,
    profit,
    taxRate,
    wood,
    iron,
    nails,
    smelterBuilt
  };
  localStorage.setItem("myGame_gameData", JSON.stringify(gameData));
}

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
  return {
    production: 0,
    profit: 0,
    taxRate: 10,
    wood: 0,
    iron: 0,
    nails: 0,
    smelterBuilt: false
  };
}

// Update UI
function updateUI() {
  outputDisplay.textContent = production;
  profitDisplay.textContent = profit.toFixed(2);
  taxRateDisplay.textContent = taxRate;
  document.getElementById("woodCount").textContent = wood;
  document.getElementById("ironCount").textContent = iron;
  document.getElementById("nailsCount").textContent = nails;
  smelterStatus.textContent = `Status: ${smelterBuilt ? "Built" : "Not Built"}`;
}

// Job progress handler
function startJobProgress(jobType) {
  let progressElement, timeRequired, resourceName;

  switch (jobType) {
    case "woodcutting":
      progressElement = woodProgress;
      timeRequired = TREE_CUT_TIME;
      resourceName = "Wood";
      break;
    case "ironMining":
      progressElement = ironProgress;
      timeRequired = IRON_MINE_TIME;
      resourceName = "Iron";
      break;
    case "smelting":
      progressElement = smelterProgress;
      timeRequired = SMELT_NAIL_TIME;
      resourceName = "Nails";
      break;
  }

  let timeLeft = timeRequired;
  progressElement.textContent = `${resourceName} Progress: ${timeLeft}s`;

  const interval = setInterval(() => {
    timeLeft--;
    progressElement.textContent = `${resourceName} Progress: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      if (jobType === "woodcutting") wood++;
      else if (jobType === "ironMining") iron++;
      else if (jobType === "smelting") nails++;
      updateUI();
      progressElement.textContent = `${resourceName} Done!`;
      saveGameState();
    }
  }, 1000);
}

// Event listeners

// Clicker logic
laborButton.addEventListener("click", () => {
  production++;
  const leaderCut = valuePerGood * (taxRate / 100);
  profit += leaderCut;
  updateUI();
  saveGameState();
});

// Tax rate buttons
document.getElementById("increaseTax").addEventListener("click", () => {
  if (taxRate < 100) {
    taxRate += 5;
    updateUI();
    saveGameState();
  }
});

document.getElementById("decreaseTax").addEventListener("click", () => {
  if (taxRate > 0) {
    taxRate -= 5;
    updateUI();
    saveGameState();
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const currentTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);
});

// Menu controls
settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.add("show");
});
closeSettings.addEventListener("click", () => {
  settingsMenu.classList.remove("show");
});
resetGameBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset the game? This cannot be undone.")) {
    localStorage.removeItem("myGame_gameData");
    location.reload();
  }
});
propertyMenuBtn.addEventListener("click", () => {
  propertyMenu.classList.toggle("show");
});
closePropertyBtn.addEventListener("click", () => {
  propertyMenu.classList.remove("show");
});

// City menu
cityBtn.addEventListener("click", () => {
  cityMenu.classList.toggle("hidden");
});

// Shed building
shedBtn.addEventListener("click", () => {
  if (wood >= 5 && nails >= 5) {
    wood -= 5;
    nails -= 5;
    alert("You built a Shed!");
    updateUI();
    saveGameState();
  } else {
    alert("You need 5 wood and 5 nails to build a shed.");
  }
});

// Smelter building
smelterBtn.addEventListener("click", () => {
  if (!smelterBuilt) {
    if (wood >= 10 && nails >= 5) {
      wood -= 10;
      nails -= 5;
      smelterBuilt = true;
      alert("Smelter built!");
      updateUI();
      saveGameState();
    } else {
      alert("You need 10 wood and 5 nails to build a smelter.");
    }
  } else {
    alert("Smelter is already built.");
  }
});

// Jobs
startWoodcutting.addEventListener("click", () => {
  if (woodProgress.textContent === "Idle" || woodProgress.textContent.includes("Done")) {
    startJobProgress("woodcutting");
  }
});
startIronMining.addEventListener("click", () => {
  if (ironProgress.textContent === "Idle" || ironProgress.textContent.includes("Done")) {
    startJobProgress("ironMining");
  }
});
startSmelting.addEventListener("click", () => {
  if (!smelterBuilt) {
    alert("You need to build a smelter first!");
    return;
  }
  if (smelterProgress.textContent === "Idle" || smelterProgress.textContent.includes("Done")) {
    if (iron >= 1) {
      iron--;
      startJobProgress("smelting");
    } else {
      alert("You need at least 1 iron to smelt nails.");
    }
  }
});
closeJobsBtn.addEventListener("click", () => {
  jobsMenu.classList.add("hidden");
});

// Initial UI update
updateUI();
