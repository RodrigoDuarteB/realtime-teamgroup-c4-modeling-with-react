import axios from 'axios'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../firebase.config'
import canvasState from '../../store/CanvasState'
import toolState from '../../store/ToolState'
import { Figure } from '../../Tools/Figure'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Person from '../../Tools/Person'

const Canvas = observer(() => {
    const canvasRef = useRef<any>()
    const workspaceRef = useRef<any>()
    const params: any = useParams()

    const [figures, setFigures] = useState<Figure[]>([])
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [last, setLast] = useState<HTMLImageElement>(new Image())
    
    const diagramRef = store.collection('meets')
    const [diagram] = useCollectionData(diagramRef.where('id', '==', params.id), {idField: 'id'})

    useEffect(() => {
        setWidth(workspaceRef.current.offsetWidth)
        setHeight(workspaceRef.current.offsetHeight)
        canvasState.setCanvas(canvasRef.current)
        canvasState.setTabIndex()
        canvasState.setFigures(figures)
        /* axios.get(`http://localhost:5000/image?id=${params.id}`)
        .then(response => {
            const image = new Image()
            image.src = response.data
            setImage(image)
        }) */
    }, [])

    useEffect(() => {
        //const socket = new WebSocket('ws://localhost:5000/')
        canvasState.setSocket(null)
        canvasState.setSessionId(params.id)
        toolState.setTool(new Person(canvasRef.current))
        /* socket.onopen = () => {
            socket.send(JSON.stringify({
                id: params.id,
                username: canvasState.username,
                method: "connection"
            }))
        }
        socket.onmessage = (e) => {
            let msg = JSON.parse(e.data)
            switch (msg.method){
                case "draw":
                    drawHandler(msg)    
                break
            }
        } */
    }, [])

    useEffect(() => {
        /* window.onresize = (() => {
            setWidth(workspaceRef.current.offsetWidth)
            setHeight(workspaceRef.current.offsetHeight)
            setImage(last)
        }) */
        console.log(diagram)
    }, [diagram])

    /* const drawHandler = (msg: any) => {
        const figure = msg.figure
        const context: CanvasRenderingContext2D = canvasRef.current.getContext('2d')
        switch(figure.type) {
            case "brush":
                Brush.staticDraw(context, figure.x, figure.y)
            break
            case "rect":
                System.staticDraw(context, figure.x, figure.y, 
                    figure.width, figure.height, figure.color)
                figures.push({id: '', x: figure.x, y: figure.y, width: figure.width, 
                    height: figure.height})
            break
            case "text":
                Text.staticDraw(context, 
                    "Hola", figure.x, figure.y, 
                    figure.color)
            break
            case "eraser":
                Eraser.staticDraw(context, 
                figure.x, figure.y)
            break
            case "finish":
                context.beginPath()
            break
        }
    } */

    const mouseDownHandler = () => {
        console.log('empecé')
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        /* axios.post(`http://localhost:5000/image?id=${params.id}`, {img: 
        canvasRef.current.toDataURL()}) */
    }

    const mouseUpHandler = () => {
        console.log('termine de dibujar')
        const image = new Image()
        image.src = canvasRef.current.toDataURL()
        setLast(image)
    }

    const mouseMoveHandler = () => {
        //console.log('dibujando')
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

    return (
        <Fragment>
            <div className="h-screen w-full" ref={workspaceRef}>
                <p>Titulo: { diagram ? diagram : '' }</p>   
                <canvas className="border bg-secondary" height={height} width={width} ref={canvasRef}   onMouseDown={mouseDownHandler} 
                onMouseUp={mouseUpHandler} 
                onMouseMove={mouseMoveHandler}
                />
            </div>
        </Fragment>
    )
})

export default Canvas
