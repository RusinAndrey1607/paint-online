import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  color;
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
  }
}
export default new ToolState();
