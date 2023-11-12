const canvas = document.querySelector('canvas');

const drawingSurface = canvas && canvas.getContext('2d');

interface Entity {
    name: string,
    position: {
        x: number,
        y: number,
    },
    size: {
        width: number,
        height: number,
    },
    speed?: number
}

class CollisionSystem {
    collisionEntities: Array<Entity> = []

    constructor(...entities: Array<Entity>) {
        this.collisionEntities =  [...entities]
    }

    addEntities(entity: Entity) {
        this.collisionEntities.push(entity)
    }

    isColliding(entity1: Entity, entity2: Entity): Boolean {
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

    checkCollision() {
        for(let i = 0; i < this.collisionEntities.length - 1; ++i) {
            const currentEntity = this.collisionEntities[i];

            for(let j = i + 1; j < this.collisionEntities.length; ++j) {
                const nextEntity = this.collisionEntities[j];
                
                if(this.isColliding(currentEntity, nextEntity)) {
                    nextEntity.speed = 0;
                }
            }
        }
    }
}

const square1: Entity = {
    name: "one",
    position: {
        x: 50,
        y: 50,
    },
    size: {
        width: 100,
        height: 100,
    }
}

const square2: Entity = {
    name: "two",
    position: {
        x: 650,
        y: 50,
    },
    size: {
        width: 100,
        height: 100,
    },
    speed: -10
}

const collider = new CollisionSystem(square1, square2)

function update() {
    if(drawingSurface) {
        drawingSurface.clearRect(0, 0, 800, 600);

        drawingSurface.fillRect(square1.position.x, square1.position.y, square1.size.width, square1.size.height);

        square2.speed ? square2.position.x += square2.speed : null;

        drawingSurface.fillRect(square2.position.x, square2.position.y, square2.size.width, square2.size.height);

        collider.checkCollision()
    
        requestAnimationFrame(update)
    }
}

requestAnimationFrame(update)