class Explosion {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/boom.png";
    this.x = 20;
    this.y = 20;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.height / 2;
    this.frame = 0;
  }
  updateExplosion = () => {
    this.frame++;
  };
  drawExplosion = () => {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
}