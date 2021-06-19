import axios from 'axios'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import canvasState from '../../store/CanvasState'
import toolState from '../../store/ToolState'
import Brush from '../../Tools/Brush'
import Rectangle from '../../Tools/Rectangle'

const Canvas = observer(() => {
    const canvasRef = useRef<any>()
    const usernameRef = useRef<any>()
    const params: any = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        axios.get(`http://localhost:5000/image?id=${params.id}`)
        .then(response => {
            const context = canvasRef.current.getContext('2d')
            const image = new Image()
            image.src = response.data
            image.onload = () => {
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                context.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height)
                context.stroke()
            }
        })
    }, [])

    useEffect(() => {
        if(canvasState.username){
            const socket = new WebSocket('ws://localhost:5000/')
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (e) => {
                let msg = JSON.parse(e.data)
                switch (msg.method){
                    case "connection":
                        console.log(msg)
                    break
                    case "draw":
                        drawHandler(msg)    
                    break
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg: any) => {
        const figure = msg.figure
        const context = canvasRef.current.getContext('2d')
        switch(figure.type) {
            case "brush":
                Brush.draw(context, figure.x, figure.y)
            break
            case "rect":
                Rectangle.staticDraw(context, figure.x, figure.y, figure.width, 
                    figure.height, figure.color)
            break
            case "finish":
                context.beginPath()
            break
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: 
        canvasRef.current.toDataURL()})
        .then(response => {
            console.log(response.data)
        }) 
    }

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
    }

    return (
        <div>
            <input type="text" ref={usernameRef}/>
            <button onClick={connectHandler} className="ml-2">Set user</button>
            <canvas className="border-t-2" width={2000} height={1000} ref={canvasRef} onMouseDown={() => mouseDownHandler()}/>
        </div>
    )
})

export default Canvas
