import { EventHandler } from "./EventHandler";
import Tool from "./Tool";

export default class System extends Tool implements EventHandler {
    mouseDown: boolean
    startX: any
    startY: any
    width: any
    height: any
    saved: any
    
    constructor(canvas: any, id?: any){
        super(canvas, id)
        this.listen()
        this.mouseDown = false
        this.startX = null
        this.startY = null
        this.saved = null
    }
    onClickHandler(e: any): void {
        throw new Error("Method not implemented.");
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
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                color: this.context.fillStyle
            }
        })) */
    }

    mouseDownHandler(event: any) {
        this.mouseDown = true
        this.context.beginPath()
        this.startX = event.pageX - event.target.offsetLeft
        this.startY = event.pageY - event.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(event: any) {
        if(this.mouseDown){
            let currentX, currentY
            currentX = event.pageX - event.target.offsetLeft
            currentY = event.pageY - event.target.offsetTop
            this.width = currentX - this.startX
            this.height = currentY - this.startY
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x: any, y: any, width: any, height: any) {
        const image = new Image()
        image.src = this.saved
        image.onload = () => {
            this.context.clearRect(0, 0, this.canvas.width, 
                this.canvas.height)
            this.context.drawImage(image, 0, 0, 
                this.canvas.width, this.canvas.height)
            this.context.beginPath()
            this.context.rect(x, y, width, height)
            this.context.fill()
            this.context.stroke()
        }
    }

    static staticDraw(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
        context.fillStyle = color
        context.beginPath()
        context.rect(x, y, width, height)
        context.fill()
        context.stroke()
    }
}