import { useParams } from 'react-router-dom'
import CanvasState from '../../store/CanvasState'
import ToolState from '../../store/ToolState'
import Cursor from '../../Tools/Cursor'
import Eraser from '../../Tools/Eraser'
import RelationshipLine from '../../Tools/RelationshipLine'
import Person from '../../Tools/Person'
import System from '../../Tools/System'
import Text from '../../Tools/Text'
import IconLabel from '../Style/IconText'

//icons
import { IoText as IconText } from 'react-icons/io5'
import { BsCursorFill as IconCursor } from 'react-icons/bs'
import { FaUserAlt as IconPerson, FaEraser as IconEraser } from 'react-icons/fa'
import { AiOutlineClear as Clear } from 'react-icons/ai'
import { ImArrowUpRight2 as Arrow } from 'react-icons/im'
import { RiArrowGoBackFill as Undo, RiArrowGoForwardFill as Redo } from 'react-icons/ri'
import { IoIosSave as Save } from 'react-icons/io'
import { BiRectangle as IconRectangle } from 'react-icons/bi'
import { useState } from 'react'

const Toolbar = () => {
    const params: any = useParams()
    const [active, setActive] = useState<boolean[]>([true, false, false, false, false, false])

    const changeColor = (e: any) => {
        ToolState.setStrokeColor(e.target.value)
        ToolState.setFillColor(e.target.value)
    }

    const setText = (e: any) => {
        ToolState.setText(e.target.value)
    }

    const download = () => {
        const a = document.createElement('a')
        a.href = CanvasState.canvas.toDataURL()
        a.download = params.id + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const setFocused = (index: number) => {
        const newActive = active.map((item, i) => {
            if(i === index){
                return true
            }
            return false
        })
        setActive(newActive)
    }

    const setTool = (index: number) => {
        switch(index){
            case 0:
                ToolState.setTool(new Person(CanvasState.canvas))
                break
            case 1:
                ToolState.setTool(new System(CanvasState.canvas))
                break
            case 2:
                ToolState.setTool(new RelationshipLine(CanvasState.canvas))
                break
            case 3:
                ToolState.setTool(new Text(CanvasState.canvas))
                break
            case 4:
                ToolState.setTool(new Cursor(CanvasState.canvas, []))
                break
            case 5:
                ToolState.setTool(new Eraser(CanvasState.canvas))
                break
            default:
                ToolState.setTool(new Person(CanvasState.canvas))
        }
        setFocused(index)
    }

    return (
        <div className="flex justify-between p-2 bg-gray-300 border-gray-700 border-b-2">
            <div className="space-x-2">

                {/* Person */}
                <button onClick={() => setTool(0)} className={`btn bg-primary hover:bg-primary-dark ${ active[0] ? 'bg-primary-dark' : ''}`}>
                    <IconLabel text="Persona">
                        <IconPerson size={40}/>
                    </IconLabel>
                </button>

                {/* System */}
                <button onClick={() => setTool(1)} className={`btn bg-primary hover:bg-primary-dark ${ active[1] ? 'bg-primary-dark' : ''}`}>
                    <IconLabel text="Sistema">
                        <IconRectangle size={40}/>
                    </IconLabel>
                </button>

                {/* Relationship */}
                <button onClick={() => setTool(2)} className={`btn bg-primary hover:bg-primary-dark ${ active[2] ? 'bg-primary-dark' : ''}`}>
                    <IconLabel text="Relacion">
                        <Arrow size={40}/>
                    </IconLabel>
                </button>

                {/* Text */}
                <button onClick={() => setTool(3)} className={`btn bg-primary hover:bg-primary-dark ${ active[3] ? 'bg-primary-dark' : ''}`}>
                    <IconLabel text="Texto">
                        <IconText size={40}/>
                    </IconLabel>
                </button>

                {/* Cursor */}
                <button onClick={() => setTool(4)} className={`btn bg-primary hover:bg-primary-dark ${ active[4] ? 'bg-primary-dark' : ''}`}>
                    <IconLabel text="Cursor">
                        <IconCursor size={40}/>
                    </IconLabel>
                </button>

                {/* Eraser */}
                <button onClick={() => setTool(5)} className={`btn bg-primary hover:bg-primary-dark ${ active[5] ? 'bg-primary-dark' : ''}`}>
                    <IconLabel text="Borrador">
                        <IconEraser size={40}/>
                    </IconLabel>
                </button>

                <input type="color" onChange={e => changeColor(e)}/>

                <input type="text" onChange={e => setText(e)}/>
            </div>

            <div className="space-x-2">
                {/* Clean */}
                <button onClick={() => CanvasState.clear()} className="btn bg-primary hover:bg-primary-dark">
                    <IconLabel text="Limpiar">
                        <Clear size={40}/>
                    </IconLabel>
                </button>

                {/* Undo */}
                <button onClick={() => CanvasState.undo()} className="btn bg-primary hover:bg-primary-dark">
                    <IconLabel text="Deshacer">
                        <Undo size={40}/>
                    </IconLabel>
                </button>

                {/* Redo */}
                <button onClick={() => CanvasState.redo()} className="btn bg-primary hover:bg-primary-dark">
                    <IconLabel text="Rehacer">
                        <Redo size={40}/>
                    </IconLabel>
                </button>

                {/* Save - Download */}
                <button onClick={() => download()} className="btn bg-primary hover:bg-primary-dark">
                    <IconLabel text="Guardar">
                        <Save size={40}/>
                    </IconLabel>
                </button>
            </div>
        </div>
    )
}

export default Toolbar
