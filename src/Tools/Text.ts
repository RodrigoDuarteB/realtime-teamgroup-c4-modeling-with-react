import Tool from "./Tool";

export default class Text extends Tool {
    constructor(canvas: any, socket: any, id: any){
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onclick = this.onClick.bind(this)
    }

    onClick(event: any) {
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'text',
                x: event.clientX - event.target.offsetLeft,
                y: event.clientY - event.target.offsetTop,
                color: this.context.fillStyle
            }
        }))
    }

    static staticDraw(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
        context.font = "bold 24px verdana"
        context.textAlign = "start"
        context.fillText(text, x, y)  
        /* context.textBaseline = "top"   
        var dims = context.measureText(text)
        context.strokeRect(x-10, y-10, dims.width+20, 48)   */
    }
}