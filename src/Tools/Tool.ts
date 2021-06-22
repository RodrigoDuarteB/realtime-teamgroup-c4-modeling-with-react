export default class Tool {
    canvas: HTMLCanvasElement 
    context: CanvasRenderingContext2D
    socket: WebSocket
    id: string
    
    constructor(canvas: any, socket: any, id: any){
        this.canvas = canvas
        this.socket = socket
        this.id = id 
        this.context = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color: string){
        this.context.fillStyle = color
    }

    set strokeColor(color: string){
        this.context.strokeStyle = color
    }

    set lineWidth(width: number){
        this.context.lineWidth = width
    }

    destroyEvents(){
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onclick = null
    }
}