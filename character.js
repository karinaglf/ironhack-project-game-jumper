class Character {
  constructor() {
    this.img = new Image();
    this.img.src = "./images/dino-sprite.png";
    this.floorPositionY = 320; //correction for floor position 
    this.spriteWidth = 680;
    this.spriteHeight = 472;
    this.width = this.spriteWidth * 0.21;
    this.height = this.spriteHeight * 0.21;
    this.frameX = 0;
    this.frameY = 0;
    this.x = 100; 
    this.y = this.floorPositionY;
    this.velocityY = 1;
    this.maxJumpHeight = 40;
    this.isGrounded = true;
    this.gravity = 5;
    this.sound = new Audio();
    this.sound.src = "./sounds/jump.wav";
    this.animationTimer = 0;
    this.animationStagger = 5;
    this.spriteOffset = 1.45;
  }

  drawChar = () => {
    //ctx.fillStyle = "black";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.frameX,
      this.spriteHeight * this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width * this.spriteOffset,
      this.height * this.spriteOffset,
    );
  };
  animateChar = () => {
    let position = Math.floor(this.animationTimer/this.animationStagger) % 7; //makes sure loop through existing sprite frames
    this.frameX = this.spriteWidth * position;
    this.animationTimer++

  };
  gravityChar = () => {
    //only add gravity if char is not on the ground
    if (this.y <= this.floorPositionY) {
      this.y += this.gravity;
      this.isGrounded = false;
      this.frameY = 0;
      this.spriteLength = 11;
    } else if (this.y > this.floorPositionY) {
      this.isGrounded = true;
      this.frameY = 1;
      this.spriteLength = 7;
    }
  };
  checkCollision = (singleObstacle, index, obstaclesArray) => {
    if (
      this.x < singleObstacle.x + singleObstacle.width &&
      this.x + this.width > singleObstacle.x &&
      this.y < singleObstacle.y + singleObstacle.height &&
      this.y + this.height > singleObstacle.y
    ) {
      return true;
    }
  };
  jumpChar = () => {
    this.isJumping = true;
    this.sound.play();
    while (this.y > this.maxJumpHeight) {
      this.y -= this.velocityY * 0.1;
    }
  };
  stopJumpChar = () => {
    this.isJumping = false;
    this.y -= 0;
  };
}
