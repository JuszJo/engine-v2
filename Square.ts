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
    speed = {
        x: 0,
        y: 0
    }
    velocity = {
        x: 0,
        y: 0
    }
    maxSpeed = 15
    color = "black"

    constructor(drawingSurface: CanvasRenderingContext2D | null, x: number, y: number, width: number, height: number, speed: {x: number, y: number}) {
        this.position.x = x;
        this.position.y = y;
        this.size.width = width;
        this.size.height = height;
        this.speed = speed
        this.drawingSurface = drawingSurface;
        // this.velocity = {
        //     x: 0,
        //     y: 0
        // }
    }

    draw() {
        if(this.drawingSurface) {
            this.drawingSurface.fillStyle = this.color

            this.drawingSurface.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }

    limitSpeed() {
        if(Math.abs(this.speed.x) > this.maxSpeed) {
            if(this.speed.x < 0) {
                this.speed.x = -this.maxSpeed
            }
            else {
                this.speed.x = this.maxSpeed
            }
        }
        if(Math.abs(this.speed.y) > this.maxSpeed) {
            if(this.speed.y < 0) {
                this.speed.y = -this.maxSpeed
            }
            else {
                this.speed.y = this.maxSpeed
            }
        }
    }

    update() {
        console.log(`${this.position.x} speed = ${this.speed.y}`);

        this.draw()

        this.limitSpeed()

        this.speed.x += this.velocity.x;

        this.speed.y += this.velocity.y;

        this.position.x += this.speed.x;

        this.position.y += this.speed.y;

        this.velocity.x = 0;

        this.velocity.y = 0;
    }
}