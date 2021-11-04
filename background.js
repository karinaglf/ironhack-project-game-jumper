class Background {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/background.png";
    this.width = canvas.width;
    this.height = canvas.height;
    this.x = 0;
    this.y = 0;
    this.x2 = this.width - 1;
    this.speed = 2;
  }
  moveBackground = () => {
    this.x -= this.speed;
    this.x2 -= this.speed;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
  };
  drawBackground = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  };
}
class Clouds extends Background {
  constructor() {
    super();
    this.width = 931;
    this.height = 111;
    this.y = 80;
    this.image.src = "./images/background-clouds.png";
    this.speed = 1;
  }
}
class Floor extends Background {
  constructor() {
    super();
    this.image.src = "./images/background-floor.png";
    this.speed = 2;
  }
}
