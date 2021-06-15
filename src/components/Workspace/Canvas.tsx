import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import canvasState from '../../store/CanvasState'
import toolState from '../../store/ToolState'
import Brush from '../../Tools/Brush'

const Canvas = observer(() => {
    const canvasRef = useRef(null)
    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    return (
        <div>
            <h1>Canvas</h1>
            <canvas className="border-t-2" width={600} height={300} ref={canvasRef}/>
        </div>
    )
})

export default Canvas
