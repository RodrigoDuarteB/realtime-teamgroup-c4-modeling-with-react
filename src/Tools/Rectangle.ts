import Tool from "./Tool";

export default class Rectangle extends Tool {
    mouseDown: boolean
    startX: any
    startY: any
    saved: any
    constructor(canvas: any){
        super(canvas)
        this.listen()
        this.mouseDown = false
        this.startX = null
        this.startY = null
        this.saved = null
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
        this.startX = event.pageX - event.target.offsetLeft
        this.startY = event.pageY - event.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(event: any) {
        if(this.mouseDown){
            let currentX, currentY, width, height
            currentX = event.pageX - event.target.offsetLeft
            currentY = event.pageY - event.target.offsetTop
            width = currentX - this.startX
            height = currentY - this.startY
            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x: any, y: any, width: any, height: any) {
        const image = new Image()
        image.src = this.saved
        image.onload = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            this.context.beginPath()
            this.context.rect(x, y, width, height)
            this.context.fill()
            this.context.stroke()
        }
    }
}