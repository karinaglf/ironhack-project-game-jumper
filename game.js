class Game {
  constructor() {
    this.backgroundLayers = [new Background(), new Clouds(), new Floor()];
    this.character = new Character();
    this.explosion = new Explosion(50,50);
    this.obstaclesArray = [new Obstacle()];
    this.obstaclesInterval = 100; //milliseconds for obstacles to appear
    this.obstaclesTimer = 0; // counter interval
    //this.obstacleType = ["bird", "cactus"]
    this.lastTime = 1;
    this.score = 0;
    this.scoreText = new Text("Score: " + this.score, 1000, 50, "right", "black");
    this.isGameover = false;
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
  }
  
  updateScore = () => {
    this.scoreText.t = "Score: " + this.score;
  }

  spawnObstacles = () => {
    //let randomObstacle = this.obstacleType[(Math.floor(Math.random)*this.obstacleType.length)]
    this.obstaclesArray.push(new Cactus());
    this.obstaclesArray.push(new Bird());
  }

  gameLoop = (timeStamp) => {
    //console.log("Yay the game is running")
    //* 1. CLEAR THE CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //* 2. MOVEMENTS AND CHANGES ON ELEMENTS

    this.character.gravityChar();

    this.obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.moveObstacle();
    })

    this.backgroundLayers.forEach((eachLayer) => {
      eachLayer.moveBackground();
    })

    // Spawn obstacles at a certain interval
    if(this.obstaclesTimer > this.obstaclesInterval) {
      this.spawnObstacles();
      //clean array when it is outside canvas
      this.obstaclesArray = this.obstaclesArray.filter(eachObstacle => !eachObstacle.markedForDeletion)
      this.obstaclesTimer = 0;
      //console.log(this.obstaclesArray);
    } else {
      this.obstaclesTimer += 1;
    }

    this.obstaclesArray.forEach((eachObstacle, index, obstaclesArray) => {

    if(this.character.checkCollision(eachObstacle, index)){
        if (eachObstacle instanceof Cactus) {
          this.gameover();
        } 
        if (eachObstacle instanceof Bird) {
          this.score +=1;
          //console.log(this.score);
          //console.log(index)
          obstaclesArray.splice(index, 1);
          this.explosion.drawExplosion();
        }
    }
    });

    //* 3. DRAW ELEMENTS
    this.backgroundLayers.forEach((eachLayer) => {
      eachLayer.drawBackground();
    })
    this.scoreText.drawText();
    this.character.drawChar();
    this.obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.drawObstacle();
    })
    this.explosion.drawExplosion();
    //* 4. ANIMATION FRAME AND LOGIC
    this.updateScore();
    if(!this.isGameover) {
      requestAnimationFrame(this.gameLoop);
    }

    //const deltaTime = timeStamp - this.lastTime;
    //this.lastTime = timeStamp;
    //console.log(deltaTime);
  };
}
