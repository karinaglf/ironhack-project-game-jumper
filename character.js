class Character {
  constructor() {
    this.img = new Image();
    this.img.src = "./images/dino.png";
    this.floorPositionY = 320; //correction for floor position
    this.width = 120;
    this.height = 120;
    this.x = 100;
    this.y = this.floorPositionY;
    this.velocityX = 0   ; //retirar se não for usar
    this.velocityY = 1;
    this.maxJumpHeight = 50;
    this.isGrounded = true;
    this.gravity = 5;
    this.sound = new Audio();
    this.sound.src = "./sounds/jump.wav"
  }

  drawChar = () => {  
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  
  };

  gravityChar = () => {
    //only add gravity if char is not on the ground
    if (this.y <= this.floorPositionY) {
    this.y += this.gravity;
    this.isGrounded = false;
    } else if (this.y > this.floorPositionY){
    this.isGrounded = true;
    }
  };
  checkCollision = (singleObstacle, index, obstaclesArray) => {
    if (
      this.x < singleObstacle.x + singleObstacle.width &&
      this.x + this.width > singleObstacle.x &&
      this.y < singleObstacle.y + singleObstacle.height &&
      this.y + this.height > singleObstacle.y
    ) {
      return true
    } else {
      return false
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
  }
}
