import Tool from "./tool";

export default class Eraser extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
    this.initialCompositeOperation = this.ctx.globalCompositeOperation
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.restoreCompositeOperation();

  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineWidth = 20;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let x = e.pageX - e.target.offsetLeft;
      let y = e.pageY - e.target.offsetTop;
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
  restoreCompositeOperation() {
    this.ctx.globalCompositeOperation = this.initialCompositeOperation; 
  }
}