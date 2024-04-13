import React from 'react'
import "../styles/toolbar.scss"

export default function ToolBar() {
  return (
    <div className='toolbar'>
        <button className="toolbar__btn brush"></button>
        <button className="toolbar__btn rect"></button>
        <button className="toolbar__btn circle"></button>
        <button className="toolbar__btn eraser"></button>
        <button className="toolbar__btn line"></button>
        <input type="color" className='toolbar__input'/>
        <button className="toolbar__btn undo"></button>
        <button className="toolbar__btn redo"></button>
        <button className="toolbar__btn redo"></button>
        <button className="toolbar__btn save"></button>
    </div>
  )
}
