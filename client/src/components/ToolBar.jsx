import React from "react";
import "../styles/toolbar.scss";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";

export default function ToolBar() {
  const changeFillColor = (e) => {
    toolState.setFillColor(e.target.value);
  };

  const udnoChange = () => {
    canvasState.undo();
  };
  const redoChange = () => {
    canvasState.redo();
  };
  const download = () =>{
    const dataURL = canvasState.canvas.toDataURL()
    console.log(dataURL);
    const a  = document.createElement("a")
    a.href = dataURL
    a.download = canvasState.sessionId + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn rect"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn circle"
        onClick={() =>
          toolState.setTool(
            new Circle(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn eraser"
        onClick={() =>
          toolState.setTool(
            new Eraser(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn line"
        onClick={() =>
          toolState.setTool(
            new Line(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <input
        onChange={(e) => changeFillColor(e)}
        type="color"
        className="toolbar__input"
      />
      <button className="toolbar__btn undo" onClick={udnoChange}></button>
      <button className="toolbar__btn redo" onClick={redoChange}></button>
      <button className="toolbar__btn save" onClick={download}></button>
    </div>
  );
}
