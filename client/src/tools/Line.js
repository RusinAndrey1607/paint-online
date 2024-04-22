import Tool from "./tool";

export default class Line extends Tool {
  constructor(canvas, socket, id) {
    super(canvas,socket,id);
    this.listen();
  }
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "line",
          x: this.startX,
          y: this.startY,
          endX: this.endX,
          endY: this.endY,
          strokeColor: this.ctx.strokeStyle,
          strokeWidth: this.ctx.lineWidth,

        },
      })
    );
    
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.endX = e.pageX - e.target.offsetLeft;
      this.endY = e.pageY - e.target.offsetTop;
      this.ctx.lineWidth = 2;

      this.draw(this.startX, this.startY, this.endX, this.endY);
    }
  }
  draw(x, y, endX, endY) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath()
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(endX,endY);
      this.ctx.stroke();
    };
  }
  static staticDraw(ctx,x, y, endX, endY,stroke,strokeWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX,endY);
    ctx.stroke();
  }
}
