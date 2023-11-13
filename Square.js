export default class Square {
    constructor(drawingSurface, x, y, width, height, speed) {
        this.name = "square";
        this.position = {
            x: 0,
            y: 0
        };
        this.size = {
            width: 0,
            height: 0,
        };
        this.speed = 0;
        this.color = "black";
        this.position.x = x;
        this.position.y = y;
        this.size.width = width;
        this.size.height = height;
        this.speed = speed;
        this.drawingSurface = drawingSurface;
    }
    draw() {
        if (this.drawingSurface) {
            this.drawingSurface.fillStyle = this.color;
            this.drawingSurface.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
    update() {
        this.draw();
        this.position.x += this.speed;
    }
}
