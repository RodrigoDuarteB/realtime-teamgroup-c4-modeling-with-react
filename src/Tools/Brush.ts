import Tool from "./Tool";

export default class Brush extends Tool {
    mouseDown: boolean
    constructor(canvas: any){
        super(canvas)
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
    }

    mouseDownHandler(event: any) {
        this.mouseDown = true
        this.context.beginPath()
        this.context.moveTo(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop)
    }

    mouseMoveHandler(event: any) {
        if(this.mouseDown){
            this.draw(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop)
        }
    }

    draw(x: any, y: any) {
        this.context.lineTo(x, y)
        this.context.stroke()
    }
}