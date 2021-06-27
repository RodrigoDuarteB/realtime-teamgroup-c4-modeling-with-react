import { useState } from 'react'
import CanvasState from '../../store/CanvasState'
import ToolState from '../../store/ToolState'
import Brush from '../../Tools/Brush'
import Cursor from '../../Tools/Cursor'
import Eraser from '../../Tools/Eraser'
import Rectangle from '../../Tools/Rectangle'
import Text from '../../Tools/Text'

const Toolbar = () => {
    const [undoButton, setUndoButton] = useState(true)
    const [redoButton, setRedoButton] = useState(true)


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
            <div className="space-x-2">
                <button onClick={() => ToolState.setTool(new Brush(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn">Brush
                </button>

                <button onClick={() => ToolState.setTool(new Rectangle(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn">Rect
                </button>

                <button className="btn">Circle</button>

                <button onClick={() => ToolState.setTool(new Eraser(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn">Eraser</button>
                <button className="btn">Line</button>

                <button onClick={() => ToolState.setTool(new Text(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn">Text</button>

                <button onClick={() => ToolState.setTool(new Cursor(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId, []))} className="btn">Cursor</button>

                <input type="color" onChange={e => changeColor(e)}/>
            </div>
            <div className="space-x-2">
                <button onClick={() => CanvasState.clear()} className="btn">Clear</button>

                <button disabled={undoButton} onClick={() => CanvasState.undo()} className="btn">Undo</button>

                <button disabled={redoButton} onClick={() => CanvasState.redo()} className="btn">Redo</button>

                <button onClick={() => download()} className="btn">Save</button>
            </div>
        </div>
    )
}

export default Toolbar
