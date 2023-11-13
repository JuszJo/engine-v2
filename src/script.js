import CollisionSystem from "./Collision.js";
import SquareFactory from "./SquareFactory.js";
import GravitySystem from "./GravitySystem.js";
const canvas = document.querySelector('canvas');
const drawingSurface = canvas && canvas.getContext('2d');
const squareFactory = new SquareFactory(drawingSurface);
const squareSpeed = {
    x: 0,
    y: 0
};
squareFactory.createSquare(25, 50, 40, 40, squareSpeed);
// squareFactory.createSquare(125, 50, 40, 40, squareSpeed)
// squareFactory.createSquare(425, 50, 40, 40, squareSpeed)
// squareFactory.createSquare(525, 50, 40, 40, squareSpeed)
// squareFactory.createSquare(300, 100, 50, 50, squareSpeed)
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