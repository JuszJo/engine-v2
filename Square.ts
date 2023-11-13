export default class Square {
    name = "square"
    drawingSurface: CanvasRenderingContext2D | null;
    position = {
        x: 0,
        y: 0
    }
    size = {
        width: 0,
        height: 0,
    }
    speed = 0
    color = "black"

    constructor(drawingSurface: CanvasRenderingContext2D | null, x: number, y: number, width: number, height: number, speed: number) {
        this.position.x = x;
        this.position.y = y;
        this.size.width = width;
        this.size.height = height;
        this.speed = speed;
        this.drawingSurface = drawingSurface;
    }

    draw() {
        if(this.drawingSurface) {
            this.drawingSurface.fillStyle = this.color
    
            this.drawingSurface.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }

    update() {
        this.draw()

        this.position.x += this.speed;
    }
}