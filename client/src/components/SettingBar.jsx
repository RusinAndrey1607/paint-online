import React, { useState } from 'react'
import "../styles/toolbar.scss"
import toolState from '../store/toolState'

export default function SettingBar() {
  const changeLineWidth = (e) =>{
    toolState.setLineWidth(e.currentTarget.value)
  }
  const changeStrokeColor = (e) =>{
    toolState.setStrokeColor(e.currentTarget.value)
  }
  return (
    <div className='setting-bar'>
      <label htmlFor="line-width">Line width</label>
      <input className='setting-bar__input' id="line-width" type="number" onChange={changeLineWidth} defaultValue={1} min={1} max={20} />
      <label htmlFor="stroke-color">Stroke color</label>
      <input className='setting-bar__input' id="stroke-color" type="color" onChange={changeStrokeColor} defaultValue={1} min={1} max={20} />
    </div>
  )
}
