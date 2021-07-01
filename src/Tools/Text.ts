import Tool from "./Tool";

export default class Text extends Tool {
    text: string

    constructor(canvas: any, socket?: any, id?: any){
        super(canvas, socket, id)
        this.listen()
        this.text = 'prueba'
    }

    listen() {
        this.canvas.onclick = this.onClick.bind(this)
    }

    onClick(event: any) {
        let x = event.clientX - event.target.offsetLeft
        let y = event.clientY - event.target.offsetTop
        this.draw(x, y)
        /* this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'text',
                x: event.clientX - event.target.offsetLeft,
                y: event.clientY - event.target.offsetTop,
                color: this.context.fillStyle
            }
        })) */
    }

    draw(x: number, y: number, color?: string){
        this.context.font = "bold 24px verdana"
        this.context.textAlign = "start"
        this.context.fillText(this.text, x, y)  
        /* context.textBaseline = "top"   
        var dims = context.measureText(text)
        context.strokeRect(x-10, y-10, dims.width+20, 48)   */
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