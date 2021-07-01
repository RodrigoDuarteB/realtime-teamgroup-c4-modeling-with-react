import { Figure } from "./Figure";
import Tool from "./Tool";

export default class Cursor extends Tool {
    figures: Figure[]
    selected: Figure | null
    startX: number
    startY: number

    constructor(canvas: any, figures: Figure[], socket?: any, id?: any){
        super(canvas, socket, id)
        this.listen()
        this.figures = figures
        this.selected = null
        this.startX = 0
        this.startY = 0
    }

    setFigures(figures: Figure[]){
        this.figures = figures
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(event: any) {
        this.selected = null
    }

    mouseDownHandler(event: any) {
        for(let i=0; i<this.figures.length; i++){
            let current = this.figures[i]
            if(current.x < event.clientX && (current.width + current.x > event.clientX) && current.y < event.clientY && (current.height + current.y > event.clientY)){
                this.selected = current 
                this.startX = event.clientX - current.x
                this.startY = event.clientY - current.y
                break
            }
        }
    }

    mouseMoveHandler(event: any) {
        if(this.selected != null){
            this.selected.x = event.clientX - this.startX
            this.selected.y = event.clientY - this.startY
            this.figures.filter(figure => {
                if(this.selected!.id == figure.id){
                    figure.x = this.selected!.x
                    figure.y = this.selected!.y
                    figure.width = this.selected!.width
                    figure.height = this.selected!.height
                }
            })
        }
    }

}