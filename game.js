class Game {
  constructor() {
    this.character = new Character();
    this.obstaclesArray = [new Obstacle(Math.random() * canvas.height)];
    this.obstaclesInterval = 100; //milliseconds for obstacles to appear
    this.obstaclesTimer = 0; // counter interval
    this.obstacleType = ["worm", "ghost"]
    this.gravity = 5;
    this.lastTime = 1;
  }

  //Random Function to be used as a utility
  getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  spawnObstacles = () => {
    let randomObstacle = this.obstacleType[(Math.floor(Math.random)*this.obstacleType.length)]
    //let randomWorm = new Obstacle(Math.random() * canvas.height);  
    // if(randomObstacle == "worm") {
    //   this.obstaclesArray.push(new Worm());
    // } else if(randomObstacle == "ghost") {
    //   this.obstaclesArray.push(new Ghost())
    // }
    this.obstaclesArray.push(new Worm());
    this.obstaclesArray.push(new Ghost());
    this.obstaclesArray.sort((a,b) => a.y - b.y)
  }

  spawnPlatforms = () => {
    // to determine when to add a new platform
    // will check if the last platform is in defined value for platformAppearingDistance
    let lastIndex = this.platformArray.length - 1;
    let lastPlatform = this.platformArray[lastIndex];

    if (lastPlatform.x === this.platformMaxDistanceBetween) {
      // get a random random number to assign as height and width
      let randomHeight = this.getRandomNumber(50, 80);
      let randomWidth = this.getRandomNumber(50, 90);
      let randomPlatform = new Platform(randomWidth, randomHeight);
      this.platformArray.push(randomPlatform);
    }
  };

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
      //clean array when it is outside canva
      this.obstaclesArray = this.obstaclesArray.filter(eachObstacle => !eachObstacle.markedForDeletion)
      this.obstaclesTimer = 0;
      //console.log(this.obstaclesArray);
    } else {
      this.obstaclesTimer += 1;
    }

    this.obstaclesArray.forEach((eachObstacle) => {

    if(this.character.checkCollision(eachObstacle)){
    //console.log("collision happened")
    }
    });

    //* 3. DRAW ELEMENTS
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
