import React from 'react'
import CanvasState from '../../store/CanvasState'
import ToolState from '../../store/ToolState'
import Brush from '../../Tools/Brush'
import Rectangle from '../../Tools/Rectangle'

const Toolbar = () => {
    return (
        <div className="flex justify-between">
            <div className="space-x-2">
                <button onClick={() => ToolState.setTool(new Brush(CanvasState.canvas))}>Brush
                </button>
                <button onClick={() => ToolState.setTool(new Rectangle(CanvasState.canvas))}>Rect
                </button>
                <button>Circle</button>
                <button>Eraser</button>
                <button>Line</button>
                <input type="color" />
            </div>
            <div className="space-x-2">
                <button>Undo</button>
                <button>Redo</button>
                <button>Save</button>
            </div>
        </div>
    )
}

export default Toolbar
