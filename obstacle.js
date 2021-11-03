class Obstacle {
    constructor() {
        this.image = new Image();
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth * 2;
        this.height = this.spriteHeight * 2;
        this.x = canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 80;
        this.height = 80;
        this.velocityX = 3;
        this.markedForDeletion = false;
    }

    drawObstacle = () => {
        //ctx.fillStyle = "black";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height) 
    }

    moveObstacle = () => {
        this.x -= this.velocityX;
        //remove enemies from the array
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }    
}
class Worm extends Obstacle {
    constructor () {
        super()
        this.image = cactus;
        this.x = canvas.width;
        this.y = 383;
        this.velocityX = Math.random() * 0.5 + 3;
    }
}
class Ghost extends Obstacle {
    constructor () {
        super()
        this.image = blackbird;
        this.x = canvas.width;
        this.y = Math.random() * canvas.height * 0.2;
        this.velocityX = Math.random() * 0.2 + 5;
        this.angle = 0;
        this.radius = 3  ;
    }   

    moveObstacle = () => {
        this.x -= this.velocityX;
        this.y += Math.sin(this.angle) * this.radius;
        this.angle += 0.1;
        //remove enemies from the array
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }    
}
