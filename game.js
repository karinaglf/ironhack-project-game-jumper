class Game {
  constructor() {
    this.backgroundLayers = [new Background(), new Clouds(), new Floor()];
    this.character = new Character();
    this.explosionArray = [new Explosion()];
    this.obstaclesArray = [new Obstacle()];
    this.cactusTypes = [];
    this.cactusInterval = 120;
    this.birdsInterval = 50;
    this.birdsTimer = 0;
    this.cactusTimer = 0;
    this.cactusVelocity = 7;
    this.birdsVelocity = 8;
    this.lastTime = 1;
    this.score = 0;
    this.scoreText = new Text("Score: " + this.score, 1000, 50,"right", "black");
    this.levelText = new Text("Level: " + "1", 1000, 80,"right", "#3a3a3a");
    this.isGameover = false;
    this.levelControl = 1;
    this.level = 1;
  }

  //Random Function to be used as a utility
  getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  gameover = () => {
    //stop the game
    this.isGameover = true;
    //hide canvas
    canvas.style.display = "none";
    //show restart state
    gameoverScreen.style.display = "flex";
  };
  increaseGameLevel = () => {
    if (this.score > 1 && this.score % 10 == 0) {
      this.cactusVelocity += 2;
      this.birdsVelocity  += 3;
      this.levelControl += 0.01;
      this.level = Math.floor(this.levelControl);
    }
  };
  updateScore = () => {
    this.scoreText.t = "Score: " + this.score;
    this.levelText.t = "Level: " + this.level;
  };

  cleanObstacles = () => {
    this.obstaclesArray = this.obstaclesArray.filter(
      (eachObstacle) => !eachObstacle.markedForDeletion
    );
  };
  spawnObstacles = () => {
    this.cactusTimer ++;
    if (this.cactusTimer > this.cactusInterval) {
      this.obstaclesArray.push(new Cactus(this.cactusVelocity));
      this.cleanObstacles();
      this.cactusTimer = 0;
    }
    this.birdsTimer ++;
    if (this.birdsTimer > this.birdsInterval) {
      this.obstaclesArray.push(new Bird(this.birdsVelocity));
      this.cleanObstacles();
      this.birdsTimer = 0;
    }
  };
  gameLoop = (timeStamp) => {
    //* 1. CLEAR THE CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //* 2. MOVEMENTS AND CHANGES ON ELEMENTS

    this.character.gravityChar();
    this.character.animateChar();
    this.obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.moveObstacle();
    });

    this.backgroundLayers.forEach((eachLayer) => {
      eachLayer.moveBackground();
    });
    this.explosionArray.forEach((eachExplosion) => {
      eachExplosion.animateExplosion();
    });

    this.spawnObstacles();
    this.obstaclesArray.forEach((eachObstacle, index, obstaclesArray) => {
      if (this.character.checkCollision(eachObstacle, index)) {
        if (eachObstacle instanceof Cactus) {
          this.gameover();
        }
        if (eachObstacle instanceof Bird) {
          this.score += 1;
          //console.log(this.score);
          //console.log(index)
          obstaclesArray.splice(index, 1);
          this.explosionArray.push(
            new Explosion(eachObstacle.x, eachObstacle.y)
          );
        }
      }
    });
    this.increaseGameLevel();

    //* 3. DRAW ELEMENTS
    this.backgroundLayers.forEach((eachLayer) => {
      eachLayer.drawBackground();
    });
    this.scoreText.drawText();
    this.levelText.drawText();
    this.character.drawChar();
    this.obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.drawObstacle();
    });
    this.explosionArray.forEach((eachExplosion) => {
      eachExplosion.drawExplosion();
    });
    //* 4. ANIMATION FRAME AND LOGIC
    this.updateScore();
    if (!this.isGameover) {
      requestAnimationFrame(this.gameLoop);
    }

    //const deltaTime = timeStamp - this.lastTime;
    //this.lastTime = timeStamp;
    //console.log(deltaTime);
  };
}
