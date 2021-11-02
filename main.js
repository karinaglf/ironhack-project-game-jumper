//* GLOBAL VARIABLES

// Canvas Setup
let canvas = document.querySelector("#my-canvas");
let ctx = canvas.getContext("2d");

// DOM Elements
let startBtn = document.querySelector("#start-btn");
let restartBtn = document.querySelector("#restart-btn");
let splashScreen = document.querySelector("#splash-screen");
let gameoverScreen = document.querySelector("#gameover-screen");

// Game Objects
let game;

//* FUNCTIONS

const startGame = () => {
  //hide splash screen
  splashScreen.style.display = "none";
  //show canvas screen
  canvas.style.display = "flex";
  //start the game
  game = new Game();
  game.gameLoop();
};

const movePlayer = (event) => {
  if (event.code === "Space") {
    game.character.jumpChar();
  }
};

//* ADD EVENT LISTENERS
startBtn.addEventListener("click", startGame);

document.addEventListener("keydown", movePlayer);
