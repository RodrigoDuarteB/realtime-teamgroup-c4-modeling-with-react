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

    mouseMoveHandler(event: any) {
        if(this.mouseDown){
            //this.draw(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: event.pageX - event.target.offsetLeft,
                    y: event.pageY - event.target.offsetTop
                }
            }))
        }
    }

    static staticDraw(context: CanvasRenderingContext2D, x: number, y: number){
        context.fillStyle = "#000"
        context.lineWidth = 30
        context.lineTo(x, y)
        context.stroke()
    }

}