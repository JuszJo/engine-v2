import CollisionSystem from "./Collision.js";
import Square from "./Square.js";

const canvas = document.querySelector('canvas');

const drawingSurface = canvas && canvas.getContext('2d');

class SquareFactory {
    squares: Array<Square> = [];

    constructor(...createdSquares: Array<Square>) {
        for(let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i])
        }
    }

    createSquare(x: number, y: number, width: number, height: number, speed: number) {
        this.addSquares(new Square(drawingSurface, x, y, width, height, speed));
    }

    addSquares(...createdSquares: Array<Square>) {
        for(let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i])
        }
    }

    updateAll() {
        for(let i = 0; i < this.squares.length; ++i) {
            const currentSquare = this.squares[i]

            currentSquare.update();
        }
    }

    getAll() {
        const squareArray: Array<Square> = []

        for(let i = 0; i < this.squares.length; ++i) {
            squareArray[i] = this.squares[i]
        }

        return squareArray;
    }
}

class GravitySystem {
    entities: Array<Square> = []
    gForce = 5

    constructor(squares: Array<Square>) {
        this.entities = squares
    }

    applyGravity() {
        for(let i = 0; i < this.entities.length; ++i) {
            const currentEntity = this.entities[i]

            currentEntity.position.y += this.gForce
        }
    }

}

const squareFactory = new SquareFactory()

squareFactory.createSquare(25, 50, 40, 40, 5)

squareFactory.createSquare(125, 50, 40, 40, 0)

squareFactory.createSquare(425, 50, 40, 40, -5)

squareFactory.createSquare(525, 50, 40, 40, -5)

squareFactory.createSquare(300, 100, 50, 50, 5)

const collider = new CollisionSystem(...squareFactory.getAll())

const gravitySystem = new GravitySystem(squareFactory.getAll())

function update() {
    if(drawingSurface) {
        drawingSurface.clearRect(0, 0, 800, 600);

        squareFactory.updateAll();
        
        gravitySystem.applyGravity();

        collider.checkWallCollision();

        collider.checkCollision();
    
        requestAnimationFrame(update);
    }
}

requestAnimationFrame(update);