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
    acceleration = {
        x: 0.1,
        y: 0.1
    }
    movement = {
        up: false,
        down: false,
        left: false,
        right: false,
    }
    maxSpeed = 10
    color = "black"

    constructor(drawingSurface: CanvasRenderingContext2D | null, x: number, y: number, width: number, height: number, speed: {x: number, y: number}) {
        this.position.x = x;
        this.position.y = y;
        this.size.width = width;
        this.size.height = height;
        this.speed = speed
        this.drawingSurface = drawingSurface;
    }

    draw() {
        if(this.drawingSurface) {
            this.drawingSurface.fillStyle = this.color

            this.drawingSurface.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }

    handleKeyDown(key: String) {
        if(key == 'w') {
            // this.velocity
        }
        if(key == 's') {

        }
        if(key == 'a') {
            this.movement.left = true
        }
        if(key == 'd') {
            this.movement.right = true
        }
    }
    
    handleKeyUp(key: String) {
        if(key == 'w') {
            // this.velocity
        }
        if(key == 's') {
            
        }
        if(key == 'a') {
            this.movement.left = false
        }
        if(key == 'd') {
            this.movement.right = false
        }
    }

    move() {
        if(this.movement.up) {
            
        }
        if(this.movement.down) {

        }
        if(this.movement.left) {
            this.velocity.x -= this.acceleration.x
        }
        if(this.movement.right) {
            this.velocity.x += this.acceleration.x
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
        this.draw()

        this.limitSpeed()

        this.move()

        this.speed.x += this.velocity.x;

        this.speed.y += this.velocity.y;

        this.position.x += this.speed.x;

        this.position.y += this.speed.y;

        this.velocity.x = 0;

        this.velocity.y = 0;
    }
}