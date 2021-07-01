import { useParams } from 'react-router-dom'
import { storage } from '../../firebase.config'
import CanvasState from '../../store/CanvasState'
import ToolState from '../../store/ToolState'
import Cursor from '../../Tools/Cursor'
import Eraser from '../../Tools/Eraser'
import RelationshipLine from '../../Tools/RelationshipLine'
import Person from '../../Tools/Person'
import System from '../../Tools/System'
import Text from '../../Tools/Text'

//icons
import { IoText as IconText } from 'react-icons/io5'
import { BsCursorFill as IconCursor } from 'react-icons/bs'
import { FaUserAlt as IconPerson, FaEraser as IconEraser } from 'react-icons/fa'
import { AiOutlineClear as Clear } from 'react-icons/ai'
import { ImArrowUpRight2 as Arrow } from 'react-icons/im'
import { RiArrowGoBackFill as Undo, RiArrowGoForwardFill as Redo } from 'react-icons/ri'
import { IoIosSave as Save } from 'react-icons/io'
import { BiRectangle as IconRectangle } from 'react-icons/bi'

const Toolbar = () => {
    const params: any = useParams()

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

                {/* Person */}
                <button onClick={() => ToolState.setTool(new Person(CanvasState.canvas))} className="btn bg-primary hover:bg-primary-dark"><IconPerson/>
                </button>

                {/* System */}
                <button onClick={() => ToolState.setTool(new System(CanvasState.canvas))} className="btn bg-primary hover:bg-primary-dark"><IconRectangle/></button>

                {/* Relationship */}
                <button onClick={() => ToolState.setTool(new RelationshipLine(CanvasState.canvas))} className="btn bg-primary hover:bg-primary-dark"><Arrow /></button>

                {/* Text */}
                <button onClick={() => ToolState.setTool(new Text(CanvasState.canvas))} className="btn bg-primary hover:bg-primary-dark"><IconText/></button>

                {/* Cursor */}
                <button onClick={() => ToolState.setTool(new Cursor(CanvasState.canvas, []))} className="btn bg-primary hover:bg-primary-dark"><IconCursor/></button>

                {/* Eraser */}
                <button onClick={() => ToolState.setTool(new Eraser(CanvasState.canvas))} className="btn bg-primary hover:bg-primary-dark"><IconEraser/></button>

                <input type="color" onChange={e => changeColor(e)}/>
            </div>

            <div className="space-x-2">
                {/* Clean */}
                <button onClick={() => CanvasState.clear()} className="btn bg-primary hover:bg-primary-dark"><Clear/></button>

                {/* Undo */}
                <button onClick={() => CanvasState.undo()} className="btn bg-primary hover:bg-primary-dark"><Undo/></button>

                {/* Redo */}
                <button onClick={() => CanvasState.redo()} className="btn bg-primary hover:bg-primary-dark"><Redo/></button>

                {/* Save - Download */}
                <button onClick={() => download()} className="btn bg-primary hover:bg-primary-dark"><Save/></button>
            </div>
        </div>
    )
}

export default Toolbar
