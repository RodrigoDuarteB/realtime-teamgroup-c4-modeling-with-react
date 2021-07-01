import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../firebase.config'
import canvasState from '../../store/CanvasState'
import toolState from '../../store/ToolState'
import { Figure } from '../../Tools/Figure'
import Person from '../../Tools/Person'
import Loading from '../Style/Loading'

const Canvas = observer(() => {
    const canvasRef = useRef<any>()
    const workspaceRef = useRef<any>()
    const params: any = useParams()

    const [figures, setFigures] = useState<Figure[]>([])
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [meet, setMeet] = useState<any>()
    const [users, setUsers] = useState<any[]>()

    const setCanvas = () => {
        setWidth(workspaceRef.current.offsetWidth)
        setHeight(workspaceRef.current.offsetHeight)
        canvasState.setCanvas(canvasRef.current)
        canvasState.setTabIndex()
        canvasState.setFigures(figures)
        canvasState.setSocket(null)
        canvasState.setSessionId(params.id)
        toolState.setTool(new Person(canvasRef.current))
    }

    // inicio ( se ejecuta una sola vez)
    useEffect(() => {
        store.collection('meets')
        .doc(params.id).get()
        .then(r => {
            setMeet(r.data())
        })
        .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if(meet){
            setCanvas()
        }
        store.collection('meets').doc(params.id)
        .onSnapshot(doc => {
            const image = new Image()
            image.src = doc.data()!.image
            setImage(image)
        })
    }, [meet])


    const mouseDownHandler = () => {
        console.log('empecé')
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        canvasState.sendToServer()
    }

    const mouseUpHandler = () => {
        console.log('terminé')
        canvasRef.current.getContext('2d').beginPath()
        canvasState.sendToServer()
    }

    const setImage = (image: HTMLImageElement) => {
        const context: CanvasRenderingContext2D = canvasRef.current.getContext('2d')
        image.onload = () => {
            context.clearRect(0, 0, 
                canvasRef.current.width, 
                canvasRef.current.height)
            context.drawImage(
                image, 0, 0, 
                canvasRef.current.width, 
                canvasRef.current.height)
            context.stroke()
        }        
    }

    return meet ? (
            <div className="h-screen w-full" ref={workspaceRef}>
                <p>Titulo: { meet ? meet.title : '' }</p>   
                <canvas className="border bg-secondary" height={height} width={width} ref={canvasRef}   onMouseDown={mouseDownHandler} 
                onMouseUp={mouseUpHandler} 
                />
            </div>
    ) : <Loading/>
})

export default Canvas
