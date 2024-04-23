import Tool from "./tool";

export default class Eraser extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
    this.initialColor = this.ctx.strokeStyle
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.restoreInitialColor()
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 20; 
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "erase",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
          },
        })
      );
    }
  }
  static draw(ctx,x, y) {
    ctx.lineWidth = 20; 
    ctx.strokeStyle = "#ffffff";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  restoreInitialColor() {
    this.ctx.strokeStyle = this.initialColor; 
  }
}
