import { makeAutoObservable } from "mobx"
import { Figure } from "../Tools/Figure"

class CanvasState {
    canvas!: HTMLCanvasElement
    undoList: any = []
    redoList: any = []
    username: any

    socket: any
    sessionId: any

    figures: Figure[] | any

    constructor(){
        makeAutoObservable(this)
    }

    setTabIndex(){
        this.canvas!.tabIndex = 1000
        this.canvas!.style.outline = "none"
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

    setCanvas(canvas: HTMLCanvasElement){
        this.canvas = canvas
    }
    
    setFigures(figures: Figure[]){
        this.figures = figures
    }

    pushToUndo(data: any){
        this.undoList.push(data)
    }

    pushToRedo(data: any){
        this.redoList.push(data)
    }

    undo(){
        if(this.undoList.length > 0){
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let image = new Image()
            image.src = dataUrl
            this.setImage(image)
        }else{
            this.clear()
        }
    }

    redo(){
        if(this.redoList.length > 0){
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let image = new Image()
            image.src = dataUrl
            this.setImage(image)
        }
    }

    clear() {
        this.canvas.getContext('2d')!.clearRect(0, 0, 
            this.canvas!.width, this.canvas!.height) 
    }
    
    setImage(image: HTMLImageElement){
        const context: CanvasRenderingContext2D = this.canvas.getContext('2d')!
        image.onload = () => {
            context.clearRect(0, 0, 
                this.canvas.width, 
                this.canvas.height)
            context.drawImage(
                image, 0, 0, 
                this.canvas.width, 
                this.canvas.height)
            context.stroke()
        }        
    }
}

export default new CanvasState()             
