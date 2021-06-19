import { makeAutoObservable } from "mobx"

class CanvasState {
    canvas: any
    undoList: any = []
    redoList: any = []
    username: any

    socket: any
    sessionId: any

    constructor(){
        makeAutoObservable(this)
    }

    setUsername(username: any){
        this.username = username
    }

    setSessionId(sessionId: any){
        this.sessionId = sessionId
    }

    setSocket(socket: any){
        this.socket = socket
    }

    setCanvas(canvas: any){
        this.canvas = canvas
    }

    pushToUndo(data: any){
        this.undoList.push(data)
    }

    pushToRedo(data: any){
        this.redoList.push(data)
    }

    undo(){
        let context = this.canvas.getContext('2d')
        if(this.undoList.length > 0){
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let image = new Image()
            image.src = dataUrl
            image.onload = () => {
                context.clearRect(0, 0, this.canvas.width, this.canvas.height) 
                context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            }
        }else{
            context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo(){
        let context = this.canvas.getContext('2d')
        if(this.redoList.length > 0){
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let image = new Image()
            image.src = dataUrl
            image.onload = () => {
                context.clearRect(0, 0, this.canvas.width, this.canvas.height) 
                context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()             
