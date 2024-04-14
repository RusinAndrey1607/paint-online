import React from 'react'
import "../styles/toolbar.scss"
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'

export default function ToolBar() {
  
  return (
    <div className='toolbar'>
        <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
        <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
        <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
        <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
        <button className="toolbar__btn line" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
        <input type="color" className='toolbar__input'/>
        <button className="toolbar__btn undo"></button>
        <button className="toolbar__btn redo"></button>
        <button className="toolbar__btn redo"></button>
        <button className="toolbar__btn save"></button>
    </div>
  )
}
