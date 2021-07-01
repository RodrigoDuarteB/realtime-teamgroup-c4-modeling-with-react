import { EventHandler } from "./EventHandler";
import Tool from "./Tool";

export default class Person extends Tool implements EventHandler {
    mouseDown: boolean
    // rectangle
    startX: number
    startY: number
    finalX: number
    width: number
    height: number
    
    //circle
    startXCircle: number
    startYCircle: number

    saved: string
    
    constructor(canvas: any){
        super(canvas)
        this.listen()
        this.mouseDown = false
        this.startX = 0
        this.finalX = 0
        this.startY = 0
        this.width = 0
        this.height = 0
        this.startXCircle = 0
        this.startYCircle = 0
        this.saved = ''
    }

    onClickHandler(e: any): void {
        console.log(e.pageX - e.target.offsetLeft)
        console.log(e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e: any): void {
        if(this.mouseDown){
            let currentX, currentY
            currentX = e.pageX - e.target.offsetLeft
            currentY = e.pageY - e.target.offsetTop
            this.width = currentX - this.startX
            this.height = currentY - this.startY
            this.finalX = currentX
            this.draw(20)
        }
    }

    mouseDownHandler(e: any): void {
        this.mouseDown = true
        this.context.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler(e: any): void {
        this.mouseDown = false
        let middle = this.finalX - this.width / 2
        let radius = (this.width * 0.4) / 2
        this.context.beginPath()
        this.context.arc(middle, this.startY - 30, radius, 
            0, 2*Math.PI)
        this.context.fill()
        this.context.stroke()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onclick = this.onClickHandler.bind(this)
    }

    draw(radius?: any) {
        const image = new Image()
        image.src = this.saved
        image.onload = () => {
            this.context.clearRect(0, 0, this.canvas.width, 
                this.canvas.height)
            this.context.drawImage(image, 0, 0, 
                this.canvas.width, this.canvas.height)
            this.rounded(radius)
        }
    }

    rounded(radius?: any) {
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        }else{
            var defaultRadius: any = {tl: 0, tr: 0, br: 0, bl: 0};
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        this.context.beginPath();
        this.context.moveTo(this.startX + radius.tl, this.startY);
        this.context.lineTo(this.startX + this.width - radius.tr, this.startY);
        this.context.quadraticCurveTo(this.startX + this.width, this.startY, 
            this.startX + this.width, this.startY + radius.tr);
        this.context.lineTo(this.startX + this.width, this.startY + this.height - 
            radius.br);
        this.context.quadraticCurveTo(this.startX + this.width, this.startY + 
            this.height, this.startX + this.width - radius.br, this.startY + 
            this.height);
        this.context.lineTo(this.startX + radius.bl, this.startY + this.height);
        this.context.quadraticCurveTo(this.startX, this.startY + this.height, 
            this.startX, this.startY + this.height - radius.bl);
        this.context.lineTo(this.startX, this.startY + radius.tl);
        this.context.quadraticCurveTo(this.startX, this.startY, 
            this.startX + radius.tl, this.startY);
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
}