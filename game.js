class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/background.png";
    this.bgCloud = new Image();
    this.bgCloud.src = "./images/background-clouds.png";
    this.bgCloudWidth = 931;
    this.bgCloudX = 50; 
    this.bgCloudX2 = 50 + this.bgCloudWidth;
    this.character = new Character();
    this.obstaclesArray = [new Obstacle(Math.random() * canvas.height)];
    this.obstaclesInterval = 100; //milliseconds for obstacles to appear
    this.obstaclesTimer = 0; // counter interval
    this.obstacleType = ["bird", "cactus"]
    this.lastTime = 1;
    this.gameSpeed = 1;
    this.score = 0;
    this.scoreText = new Text("Score: " + this.score, 25, 50, "left", "black", "25");
    this.isGameover = false;
  }

  //Random Function to be used as a utility
  getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  animateBackground = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(this.bgCloud, this.bgCloudX, 70, this.bgCloudWidth , 111);
    ctx.drawImage(this.bgCloud, this.bgCloudX2, 70, this.bgCloudWidth , 111);
    
    if(this.bgCloudX < -this.bgCloudWidth - this.gameSpeed) {
      this.bgCloudX = 0;
    } else {
      this.bgCloudX -= this.gameSpeed;
    }
    if(this.bgCloudX2 < -this.bgCloudWidth  - this.gameSpeed) {
      this.bgCloudX2 = 0;
    } else {
      this.bgCloudX2 -= this.gameSpeed;
    }

  }

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

  // spawnObstacles = (type) => {
  //   let randomObstacle = this.obstacleType[(Math.floor(Math.random)*this.obstacleType.length)]
  //   this.obstaclesArray.push(new Cactus());
  //   this.obstaclesArray.push(new Bird());
  //   this.obstaclesArray.sort((a,b) => a.y - b.y)
  // }

    spawnObstacles = () => {
    let randomObstacle = this.obstacleType[(Math.floor(Math.random)*this.obstacleType.length)]
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
        //console.log(eachObstacle);
        if (eachObstacle instanceof Cactus) {
          this.gameover();
        } 
        if (eachObstacle instanceof Bird) {
          this.score +=1;
        
        // else {
        //   this.score +=1;
          // this.updateScore();
        }
        //console.log("collision happened")
    }
    });

    //* 3. DRAW ELEMENTS
    //ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    this.animateBackground();
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
