class Explosion {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "./images/boom.png";
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.frameX = 0;
    this.width = this.spriteWidth * 0.6;
    this.height = this.spriteHeight * 0.6;
    this.x = x;
    this.y = y;
    this.animationTimer = 0;
  }
  drawExplosion = () => {
    ctx.drawImage(
      this.img,
      this.spriteWidth * this.frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
  animateExplosion = () => {
    this.animationTimer++;
    if (this.animationTimer % 10 === 0) {
      this.frameX++;
    }
  };
}
