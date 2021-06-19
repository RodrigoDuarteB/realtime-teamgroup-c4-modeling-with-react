import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas: any, socket: any, id: any){
        super(canvas, socket, id)
    }

    draw(x: any, y: any){
        this.context.strokeStyle = "white"
        this.context.lineWidth = 30
        this.context.lineTo(x, y)
        this.context.stroke()
    }
}