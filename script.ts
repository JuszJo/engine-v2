const canvas = document.querySelector('canvas');

const drawingSurface = canvas && canvas.getContext('2d');

class Square {
    name = "square"
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

    constructor(x: number, y: number, width: number, height: number, speed: number) {
        this.position.x = x;
        this.position.y = y;
        this.size.width = width;
        this.size.height = height
        this.speed = speed;
    }

    draw() {
        if(drawingSurface) {
            drawingSurface.fillStyle = this.color
    
            drawingSurface.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }

    update() {
        this.draw()

        this.position.x += this.speed;
    }
}

class SquareFactory {
    squares: Array<Square> = [];

    constructor(...createdSquares: Array<Square>) {
        for(let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i])
        }
    }

    createSquare(x: number, y: number, width: number, height: number, speed: number) {
        this.addSquares(new Square(x, y, width, height, speed));
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

class CollisionSystem {
    collisionEntities: Array<Square> = []

    constructor(...entities: Array<Square>) {
        this.collisionEntities =  [...entities]
    }

    addEntities(...entities: Array<Square>) {
        for(let i = 0; i < entities.length; ++i) {
            this.collisionEntities.push(entities[i])
        }
    }

    isColliding(entity1: Square, entity2: Square): Boolean {
        if(
            entity1.position.x + entity1.size.width > entity2.position.x &&
            entity1.position.x < entity2.position.x + entity2.size.width &&
            entity1.position.y + entity1.size.height > entity2.position.y &&
            entity1.position.y < entity2.position.y + entity2.size.height
        ) {
            return true;
        }
        else return false
    }

    checkWallCollision() {
        for(let i = 0; i < this.collisionEntities.length; ++i) {
            const currentEntity = this.collisionEntities[i]

            if(currentEntity.position.x < 0) {
                currentEntity.position.x = 0;

                currentEntity.speed *= -1;
            }
            if(currentEntity.position.x + currentEntity.size.width > 800) {
                currentEntity.position.x = 800 - currentEntity.size.width;

                currentEntity.speed *= -1;
            }
            if(currentEntity.position.y < 0) {
                currentEntity.position.y = 0;
            }
            if(currentEntity.position.y + currentEntity.size.height > 600) {
                currentEntity.position.y = 600 - currentEntity.size.height;
            }
        }
    }

    checkCollision() {
        for(let i = 0; i < this.collisionEntities.length - 1; ++i) {
            const currentEntity = this.collisionEntities[i];

            for(let j = i + 1; j < this.collisionEntities.length; ++j) {
                const nextEntity = this.collisionEntities[j];
                
                if(this.isColliding(currentEntity, nextEntity)) {
                    transferEnergy(currentEntity, nextEntity);
                }
            }
        }
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

function transferEnergy(entity1: Square, entity2: Square) {
    if(Math.abs(entity1.speed) > Math.abs(entity2.speed)) {
        entity2.speed = entity1.speed

        entity1.speed = 0;
    }
    else {
        
        entity1.speed = entity2.speed;

        entity2.speed = 0;
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