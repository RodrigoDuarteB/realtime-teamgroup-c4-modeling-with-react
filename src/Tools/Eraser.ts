import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas: any, id?: any){
        super(canvas, id)
    }

    draw(x: number, y: number){
        this.context.strokeStyle = "#f5f5f5"
        this.context.lineWidth = 30
        this.context.lineTo(x, y)
        this.context.stroke()
    }

}