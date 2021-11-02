class Character {
  constructor() {
    this.x = 50;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.velocityX = 0   ; //retirar se não for usar
    this.velocityY = 180;
    this.isJumping = false;
    this.gravity = 8;
  }

  drawChar = () => {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  gravityChar = () => {
    //only add gravity if char is not on the ground
    if (this.y + this.height < canvas.height) {
    this.y += this.gravity;
    this.isJumping = false;
    }
  };

  checkCollision = (singleObstacle) => {
    //singlePlatform is coming from the game method that calls this collision in eachPlatform through the foreach in platform array
    //check if char is on each Platform
    if (
      this.x < singleObstacle.x + singleObstacle.width &&
      this.x + this.width > singleObstacle.x &&
      this.y < singleObstacle.y + singleObstacle.height &&
      this.y + this.height > singleObstacle.y
    ) {
      return true
      //this.gravity = 0
    } else {
      return false
      //this.gravity = 2
    }
  };
  jumpChar = () => {
    this.isJumping = true;
    this.y -= this.velocityY;
    this.x += this.velocityX;
    //console.log("is jumping");

    //stop char to go outside canvas
    if(this.y < 0) {
      this.y= 0;
    }
  };
}
