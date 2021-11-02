class Platform {
    constructor(width, height) {
        this.x = canvas.width;
        this.y = canvas.height - height;
        this.width = width;
        this.height = height;
        this.speed = 10;
    }

    drawPlatform = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    movePlatform = () => {
        this.x -= this.speed;
    }

    
}