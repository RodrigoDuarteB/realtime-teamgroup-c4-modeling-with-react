import React from 'react'
import ToolState from '../../store/ToolState'

const Settingbar = () => {
    return (
        <div>
            <label htmlFor="line-width" className="mx-2">Grosor de Línea</label>
            <input id="line-width" type="number" min={1} max={50} defaultValue={1} onChange={e => ToolState.setLineWidth(e.target.value)}/>
            <label htmlFor="">Color de Contorno</label>
            <input onChange={e => ToolState.setStrokeColor(e.target.value)} type="color" id="stroke-color"/>
        </div>
    )
}

export default Settingbar
