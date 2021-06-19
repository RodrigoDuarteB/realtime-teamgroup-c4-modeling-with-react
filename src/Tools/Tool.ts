export default class Tool {
    canvas 
    context
    socket
    id
    constructor(canvas: any, socket: any, id: any){
        this.canvas = canvas
        this.socket = socket
        this.id = id 
        this.context = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color: any){
        this.context.fillStyle = color
    }

    set strokeColor(color: any){
        this.context.strokeStyle = color
    }

    set lineWidth(width: any){
        this.context.lineWidth = width
    }

    destroyEvents(){
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}