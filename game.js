class Game {
  constructor() {
    //this.bg = new Image();
    // this.bg.src = "./images/background.png";
    // this.bgCloud = new Image();
    // this.bgCloud.src = "./images/background-clouds.png";
    // this.bgCloudWidth = 931;
    // this.bgCloudX = 50; 
    // this.bgCloudX2 = 50 + this.bgCloudWidth;
    this.backgroundLayers = [new Background(), new Clouds(), new Floor()];
    this.character = new Character();
    this.obstaclesArray = [new Obstacle()];
    this.obstaclesInterval = 100; //milliseconds for obstacles to appear
    this.obstaclesTimer = 0; // counter interval
    //this.obstacleType = ["bird", "cactus"]
    this.lastTime = 1;
    this.score = 0;
    this.scoreText = new Text("Score: " + this.score, 25, 50, "left", "black", "25");
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

  // addBackgroundLayers = () => {
  //   let clouds = new Background("./images/background-clouds.png", 4)
  //   let background = new Background("./images/background.png", 4)
  //   this.backgroundLayers = [newBackground, newClouds]
  //   this.backgroundLayers.push(new Clouds());
  //   this.backgroundLayers.push(new BaseLayer());
  // }

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

    this.obstaclesArray.forEach((eachObstacle) => {

    if(this.character.checkCollision(eachObstacle)){
        if (eachObstacle instanceof Cactus) {
          //this.gameover();
        } 
        if (eachObstacle instanceof Bird) {
          this.score +=1;
        }
    }
    });

    //* 3. DRAW ELEMENTS
    this.backgroundLayers.forEach((eachLayer) => {
      eachLayer.drawBackground();
      console.log(this.backgroundLayers)
    })
    this.scoreText.drawText();
    this.character.drawChar();
    this.obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.drawObstacle();
    })
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
