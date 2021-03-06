import Tool from "./Tool";

export default class Brush extends Tool {
    mouseDown: boolean

    constructor(canvas: any, id?: any){
        super(canvas, id)
        this.listen()
        this.mouseDown = false
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(event: any) {
        this.mouseDown = false
        /* this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        })) */
    }

    mouseDownHandler(event: any) {
        this.mouseDown = true
        this.context.beginPath()
        this.context.moveTo(event.pageX - event.target.offsetLeft, 
            event.pageY - event.target.offsetTop)
    }

    mouseMoveHandler(event: any) {
        if(this.mouseDown){
            this.draw(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop)
            /* this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: event.pageX - event.target.offsetLeft,
                    y: event.pageY - event.target.offsetTop
                }
            })) */
        }
    }

    draw(x: number, y: number) {
        this.context.lineTo(x, y)
        this.context.stroke()
    }

    static staticDraw(context: any, x: any, y: any) {
        context.lineTo(x, y)
        context.stroke()
    }
}