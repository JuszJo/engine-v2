import CollisionSystem from "./Collision.js";
import Square from "./Square.js";
const canvas = document.querySelector('canvas');
const drawingSurface = canvas && canvas.getContext('2d');
class SquareFactory {
    constructor(...createdSquares) {
        this.squares = [];
        for (let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i]);
        }
    }
    createSquare(x, y, width, height, speed) {
        this.addSquares(new Square(drawingSurface, x, y, width, height, speed));
    }
    addSquares(...createdSquares) {
        for (let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i]);
        }
    }
    updateAll() {
        for (let i = 0; i < this.squares.length; ++i) {
            const currentSquare = this.squares[i];
            currentSquare.update();
        }
    }
    getAll() {
        const squareArray = [];
        for (let i = 0; i < this.squares.length; ++i) {
            squareArray[i] = this.squares[i];
        }
        return squareArray;
    }
}
class GravitySystem {
    constructor(squares) {
        this.entities = [];
        this.gForce = 5;
        this.entities = squares;
    }
    applyGravity() {
        for (let i = 0; i < this.entities.length; ++i) {
            const currentEntity = this.entities[i];
            currentEntity.position.y += this.gForce;
        }
    }
}
const squareFactory = new SquareFactory();
squareFactory.createSquare(25, 50, 40, 40, 5);
squareFactory.createSquare(125, 50, 40, 40, 0);
squareFactory.createSquare(425, 50, 40, 40, -5);
squareFactory.createSquare(525, 50, 40, 40, -5);
squareFactory.createSquare(300, 100, 50, 50, 5);
const collider = new CollisionSystem(...squareFactory.getAll());
const gravitySystem = new GravitySystem(squareFactory.getAll());
function update() {
    if (drawingSurface) {
        drawingSurface.clearRect(0, 0, 800, 600);
        squareFactory.updateAll();
        gravitySystem.applyGravity();
        collider.checkWallCollision();
        collider.checkCollision();
        requestAnimationFrame(update);
    }
}
requestAnimationFrame(update);
