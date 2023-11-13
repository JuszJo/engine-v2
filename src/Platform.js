import Square from "./Square.js";
export default class Platform extends Square {
    constructor(drawingSurface, x, y, width, height, speed) {
        super(drawingSurface, x, y, width, height, speed);
        this.collisionType = "static";
        this.name = "platform";
    }
    update() {
        this.draw();
    }
}
