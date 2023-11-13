import Square from "./Square.js";

export default class Platform extends Square {
    collisionType = "static"

    constructor(
        drawingSurface: CanvasRenderingContext2D | null, x: number, y: number, width: number, height: number, speed: { x: number; y: number;}
    ) {
        super(drawingSurface, x, y, width, height, speed)
        this.name = "platform";
    }

    update() {
        this.draw()
    }
}