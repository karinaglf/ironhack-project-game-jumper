class Text {
    constructor (t, x, y, a, c) {
      this.t = t;
      this.x = x;
      this.y = y;
      this.a = a;
      this.c = c;
    }
  
    drawText () { 
      ctx.beginPath();
      ctx.fillStyle = this.c;
      //ctx.font = "bolder" + this.s + "px sans-serif";
      ctx.font='600 25px Helvetica Neue';
      ctx.textAlign = this.a;
      ctx.fillText(this.t, this.x, this.y);
      ctx.closePath();
    }
  }
