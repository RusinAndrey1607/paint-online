import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  color = "#000";
  strokeColor = "#000";
  lineWidth = 1
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }
  setFillColor(color) {
    this.tool.fillColor = color;
  }
  setStrokeColor(color) {
    this.tool.strokeColor = color;
    this.strokeColor = color;
  }
  setLineWidth(width){
    this.tool.lineWidth = width
    this.lineWidth = width
  }
}
export default new ToolState();
