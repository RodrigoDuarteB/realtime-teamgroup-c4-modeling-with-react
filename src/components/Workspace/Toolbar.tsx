import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../../firebase.config'
import CanvasState from '../../store/CanvasState'
import ToolState from '../../store/ToolState'
import Brush from '../../Tools/Brush'
import Cursor from '../../Tools/Cursor'
import Eraser from '../../Tools/Eraser'
import Rectangle from '../../Tools/Rectangle'
import Text from '../../Tools/Text'

const Toolbar = () => {
    const params: any = useParams()
    const [undoButton, setUndoButton] = useState(true)
    const [redoButton, setRedoButton] = useState(true)


    const changeColor = (e: any) => {
        ToolState.setStrokeColor(e.target.value)
        ToolState.setFillColor(e.target.value)
    }

    const download = () => {
        CanvasState.canvas.toBlob((blob: any) => {
            const image = new File([blob], params.id, 
                {type: 'image/jpg'})
            storage.ref(`/files/images/${params.id}`)
            .put(image)
            .on('state_changed', snapshot => {
                console.log('subiendo!');
            }, e => console.log(e), () => {
                console.log('subido!')
            })
        })
        const a = document.createElement('a')
        a.href = CanvasState.canvas.toDataURL()
        a.download = params.id + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="flex justify-between">
            <div className="space-x-2">
                <button onClick={() => ToolState.setTool(new Brush(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn bg-primary hover:bg-primary-dark">Brush
                </button>

                <button onClick={() => ToolState.setTool(new Rectangle(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn bg-primary hover:bg-primary-dark">Rect</button>

                <button className="btn bg-primary hover:bg-primary-dark">Circle</button>

                <button onClick={() => ToolState.setTool(new Eraser(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn bg-primary hover:bg-primary-dark">Eraser</button>
                <button className="btn bg-primary hover:bg-primary-dark">Line</button>

                <button onClick={() => ToolState.setTool(new Text(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId))} className="btn bg-primary hover:bg-primary-dark">Text</button>

                <button onClick={() => ToolState.setTool(new Cursor(CanvasState.canvas, 
                    CanvasState.socket, CanvasState.sessionId, []))} className="btn bg-primary hover:bg-primary-dark">Cursor</button>

                <input type="color" onChange={e => changeColor(e)}/>
            </div>
            <div className="space-x-2">
                <button onClick={() => CanvasState.clear()} className="btn bg-primary hover:bg-primary-dark">Clear</button>

                <button disabled={undoButton} onClick={() => CanvasState.undo()} className="btn bg-primary hover:bg-primary-dark">Undo</button>

                <button disabled={redoButton} onClick={() => CanvasState.redo()} className="btn bg-primary hover:bg-primary-dark">Redo</button>

                <button onClick={() => download()} className="btn bg-primary hover:bg-primary-dark">Save</button>
            </div>
        </div>
    )
}

export default Toolbar
