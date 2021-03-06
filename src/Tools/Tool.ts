export default class Tool {
    canvas: HTMLCanvasElement 
    context: CanvasRenderingContext2D
    id: string
    text: any
    
    constructor(canvas: any, id?: any){
        this.canvas = canvas
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

    resetProps(){
        this.context.lineWidth = 1
        this.context.strokeStyle = "#000"
        this.context.setLineDash([])
    }

    destroyEvents(){
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onclick = null
        this.resetProps()
    }
}