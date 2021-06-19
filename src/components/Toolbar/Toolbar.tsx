import React from 'react'
import CanvasState from '../../store/CanvasState'
import ToolState from '../../store/ToolState'
import Brush from '../../Tools/Brush'
import Eraser from '../../Tools/Eraser'
import Rectangle from '../../Tools/Rectangle'

const Toolbar = () => {
    const changeColor = (e: any) => {
        ToolState.setStrokeColor(e.target.value)
        ToolState.setFillColor(e.target.value)
    }

    const download = () => {
        const dataUrl = CanvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = CanvasState.sessionId + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="flex justify-between">
            <div className="space-x-2 ml-2">
                <button onClick={() => ToolState.setTool(new Brush(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}>Brush
                </button>
                <button onClick={() => ToolState.setTool(new Rectangle(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}>Rect
                </button>
                <button>Circle</button>
                <button onClick={() => ToolState.setTool(new Eraser(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}>Eraser</button>
                <button>Line</button>
                <input type="color" onChange={e => changeColor(e)}/>
            </div>
            <div className="space-x-2 mr-2">
                <button onClick={() => CanvasState.undo()}>Undo</button>
                <button onClick={() => CanvasState.redo()}>Redo</button>
                <button onClick={() => download()}>Save</button>
            </div>
        </div>
    )
}

export default Toolbar
