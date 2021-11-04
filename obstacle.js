class Obstacle {
    constructor() {
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
        this.velocityX = 8;
        this.markedForDeletion = false;
    }

    drawObstacle = () => {
        //ctx.fillStyle = "black";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX  * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

    moveObstacle = () => {
        this.x -= this.velocityX;
        //remove enemies from the array
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }

    }    
}
class Cactus extends Obstacle {
    constructor () {
        super()
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.image.src = "./images/cactus-sprite.png";
        this.velocityX = 8 ;
        this.x = canvas.width;
        this.y = 380;
    }
}  
class Bird extends Obstacle {
    constructor () {
        super()
        this.image.src = "./images/black-bird.png";
        this.x = canvas.width;
        this.y = Math.random() * canvas.height * 0.2;
        this.velocityX = Math.random() * 0.1 + 3;
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
    }    
}
