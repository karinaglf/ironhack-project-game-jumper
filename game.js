class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/background-full.png";
    this.score = 0;
    this.scoreText = new Text("Score: " + this.score, 25, 50, "left", "black", "20");
    this.character = new Character();
    this.obstaclesArray = [new Obstacle(Math.random() * canvas.height)];
    this.obstaclesInterval = 150; //milliseconds for obstacles to appear
    this.obstaclesTimer = 0; // counter interval
    this.obstacleType = ["bird", "cactus"]
    this.gravity = 5;
    this.lastTime = 1;
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
    //this.score ++;
    //console.log(this.score);
    this.scoreText.t = "Score: " + this.score;
  }

  spawnObstacles = () => {
    let randomObstacle = this.obstacleType[(Math.floor(Math.random)*this.obstacleType.length)]
    //let randomWorm = new Obstacle(Math.random() * canvas.height);  
    // if(randomObstacle == "bird") {
    //   this.obstaclesArray.push(new Bird());
    // } else if(randomObstacle == "cactus") {
    //   this.obstaclesArray.push(new Cactus())
    // }
    this.obstaclesArray.push(new Cactus());
    this.obstaclesArray.push(new Bird());
    this.obstaclesArray.sort((a,b) => a.y - b.y)
  }

  gameLoop = (timeStamp) => {
    //console.log("Yay the game is running")
    //* 1. CLEAR THE CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //* 2. MOVEMENTS AND CHANGES ON ELEMENTS

    this.character.gravityChar();
    this.updateScore();

    this.obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.moveObstacle();
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
    //console.log("collision happened")
    //this.gameover();
    }
    });

    //* 3. DRAW ELEMENTS
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    this.scoreText.drawText();
    this.character.drawChar();
    this.obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.drawObstacle();
    })
    //* 4. ANIMATION FRAME AND LOGIC
    requestAnimationFrame(this.gameLoop);
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    //console.log(deltaTime);
  };
}
