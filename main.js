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

const restartGame = () => {
  gameoverScreen.style.display = "none";
  canvas.style.display = "flex";
  //you will need to create a new instance of the game
  //you might need to restart some default variables
  game = new Game();
  game.gameLoop();  
};

const movePlayer = (event) => {
  if (event.type === "keydown" && event.code === "Space") {
    if(game.character.isGrounded) { //only allow Dino to jump if on the ground
    game.character.jumpChar(); 
    }
  }
  if (event.type === "keyup" && event.code === "Space") {
    game.character.stopJumpChar();
  }
};

//* ADD EVENT LISTENERS
startBtn.addEventListener("click", startGame);

document.addEventListener("keydown", movePlayer);

document.addEventListener("keyup", movePlayer);

restartBtn.addEventListener("click", restartGame);
