class Obstacle {
  constructor(velocityX) {
    this.image = new Image();
    this.spriteWidth = 261;
    this.spriteHeight = 209;
    this.frameX = 0;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.x = canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 80;
    this.height = 80;
    this.velocityX = velocityX;
    this.markedForDeletion = false;
  }

  drawObstacle = () => {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  moveObstacle = () => {
    this.x -= this.velocityX;
    //remove obstacles from the array
    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
    }
  };
}
class Cactus extends Obstacle {
  constructor(velocityX) {
    super(velocityX);
    this.width = 230 * 0.4;
    this.height = 210 * 0.4;
    this.image.src = "./images/cactus-1.png";
    this.velocityX = velocityX;
    this.x = canvas.width;
    this.y = 360;
  }
}
class Bird extends Obstacle {
  constructor(velocityX) {
    super(velocityX);
    this.image.src = "./images/black-bird.png";
    this.x = canvas.width;
    this.y = Math.random() * canvas.height * 0.2;
    this.velocityX = velocityX;
    this.angle = 0;
    this.radius = 4;
  }
  moveObstacle = () => {
    this.spriteWidth = 261;
    this.spriteHeight = 291;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x -= this.velocityX;
    this.y += Math.sin(this.angle) * this.radius;
    this.angle += 0.1;
    //remove obstacles from the array
    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
    }
  };
}
