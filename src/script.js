import CollisionSystem from "./Collision.js";
import SquareFactory from "./SquareFactory.js";
import GravitySystem from "./GravitySystem.js";
import Platform from "./Platform.js";
const canvas = document.querySelector('canvas');
const drawingSurface = canvas && canvas.getContext('2d');
class InputSystem {
    constructor(player) {
        this.player = player;
        // this.systemManager = systemManager
        // this.entityManager = entityManager
    }
    listen() {
        addEventListener('keydown', e => {
            const key = e.key;
            this.player.handleKeyDown(key);
            // const entities = this.entityManager.getEntitiesWithComponents("position", "size", "movement")
            // this.systemManager.systems.movementSystem.handleKeyDownEvent(key, entities)
        });
        addEventListener('keyup', e => {
            const key = e.key;
            this.player.handleKeyUp(key);
            // this.systemManager.systems.movementSystem.handleKeyUpEvent(key, entities)
        });
    }
}
const squareFactory = new SquareFactory(drawingSurface);
const squareSpeed = {
    x: 0,
    y: 0
};
squareFactory.createSquare(350, 50, 40, 40, squareSpeed);
const platform = new Platform(drawingSurface, 350, 500, 200, 20, { x: 0, y: 0 });
// squareFactory.createSquare(125, 50, 40, 40, squareSpeed)
// squareFactory.createSquare(425, 50, 40, 40, squareSpeed)
// squareFactory.createSquare(525, 50, 40, 40, squareSpeed)
// squareFactory.createSquare(300, 100, 50, 50, squareSpeed)
const inputSystem = new InputSystem(squareFactory.getAll()[0]);
inputSystem.listen();
const collider = new CollisionSystem(...squareFactory.getAll(), platform);
const gravitySystem = new GravitySystem(squareFactory.getAll());
function update() {
    if (drawingSurface) {
        drawingSurface.clearRect(0, 0, 800, 600);
        squareFactory.updateAll();
        platform.update();
        gravitySystem.applyGravity();
        collider.checkWallCollision();
        collider.checkCollision();
        requestAnimationFrame(update);
    }
}
requestAnimationFrame(update);
