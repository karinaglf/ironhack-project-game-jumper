class Character {
  constructor() {
    this.img = new Image();
    this.img.src = "./images/dino.png";
    this.floorPositionY = 320; //correction for flor position
    this.width = 120;
    this.height = 120;
    this.x = 50;
    this.y = this.floorPositionY;
    this.velocityX = 0   ; //retirar se não for usar
    this.velocityY = 180;
    this.isJumping = false;
    this.gravity = 8;
  }

  drawChar = () => {
    //ctx.fillStyle = "green";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  
  };

  gravityChar = () => {
    //only add gravity if char is not on the ground
    //this.y + this.height < canvas.height
    if (this.y <= this.floorPositionY) {
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
