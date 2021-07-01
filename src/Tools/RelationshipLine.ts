import { EventHandler } from "./EventHandler";
import Tool from "./Tool";

export default class RelationshipLine extends Tool implements EventHandler {
    mouseDown: boolean
    currentX: number
    currentY: number
    finalX: number
    finalY: number
    saved: any
        
    constructor(canvas: any) {
        super(canvas);
        this.listen()
        this.mouseDown = false
        this.currentX = 0
        this.currentY = 0
        this.finalX = 0
        this.finalY = 0
    }
    
    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }
    
    onClickHandler(e: any): void {
        throw new Error("Method not implemented.");
    }

    mouseDownHandler(e: any) {
        this.mouseDown = true
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop
        this.context.lineWidth = 2
        this.context.setLineDash([12, 12])
        this.context.beginPath()
        this.context.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler(e: any) {
        this.mouseDown = false
        this.finalX = e.pageX-e.target.offsetLeft
        this.finalY = e.pageY-e.target.offsetTop
        this.drawArrow()
    }

    mouseMoveHandler(e: any) {
        if (this.mouseDown) {
            this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
        }
    }

    draw(x: number, y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.context.clearRect(0,0, this.canvas.width, 
                this.canvas.height)
            this.context.drawImage(img, 0, 0, 
                this.canvas.width, this.canvas.height)
            this.context.beginPath()
            this.context.moveTo(this.currentX, this.currentY)
            this.context.lineTo(x, y)
            this.context.stroke()    
        }
    }

    drawArrow(r = 10){
        this.context.setLineDash([])
        var x_center = this.finalX;
    	var y_center = this.finalY;
    	var angle;
    	var x;
    	var y;
    	
    	this.context.beginPath();
    	
    	angle = Math.atan2(this.finalY - this.currentY,this.finalX - this.currentX)
    	x = r*Math.cos(angle) + x_center;
    	y = r*Math.sin(angle) + y_center;
    
    	this.context.moveTo(x, y);
    	
    	angle += (1/3)*(2*Math.PI)
    	x = r*Math.cos(angle) + x_center;
    	y = r*Math.sin(angle) + y_center;
    	
    	this.context.lineTo(x, y);
    	
    	angle += (1/3)*(2*Math.PI)
    	x = r*Math.cos(angle) + x_center;
    	y = r*Math.sin(angle) + y_center;
    	
    	this.context.lineTo(x, y);
    	
    	this.context.closePath();
    	
    	this.context.fill();
    }
}