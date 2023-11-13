function transferEnergy(entity1, entity2) {
    if (Math.abs(entity1.speed.x) > Math.abs(entity2.speed.x)) {
        entity2.speed.x = entity1.speed.x;
        entity1.speed.x = 0;
    }
    else {
        entity1.speed.x = entity2.speed.x;
        entity2.speed.x = 0;
    }
}
export default class CollisionSystem {
    constructor(gravitySystem, ...entities) {
        this.collisionEntities = [];
        this.gravitySystem = gravitySystem;
        this.collisionEntities = [...entities];
    }
    addEntities(...entities) {
        for (let i = 0; i < entities.length; ++i) {
            this.collisionEntities.push(entities[i]);
        }
    }
    isColliding(entity1, entity2) {
        if (entity1.position.x + entity1.size.width > entity2.position.x &&
            entity1.position.x < entity2.position.x + entity2.size.width &&
            entity1.position.y + entity1.size.height > entity2.position.y &&
            entity1.position.y < entity2.position.y + entity2.size.height) {
            return true;
        }
        else
            return false;
    }
    checkWallCollision() {
        for (let i = 0; i < this.collisionEntities.length; ++i) {
            const currentEntity = this.collisionEntities[i];
            if (currentEntity.position.x < 0) {
                currentEntity.position.x = 0;
                currentEntity.speed.x *= -1;
            }
            if (currentEntity.position.x + currentEntity.size.width > 800) {
                currentEntity.position.x = 800 - currentEntity.size.width;
                currentEntity.speed.x *= -1;
            }
            if (currentEntity.position.y < 0) {
                currentEntity.position.y = 0;
                currentEntity.canJump = false;
            }
            if (currentEntity.position.y + currentEntity.size.height > 600) {
                currentEntity.position.y = 600 - currentEntity.size.height;
                currentEntity.canJump = true;
            }
        }
    }
    checkCollision() {
        for (let i = 0; i < this.collisionEntities.length - 1; ++i) {
            const currentEntity = this.collisionEntities[i];
            for (let j = i + 1; j < this.collisionEntities.length; ++j) {
                const nextEntity = this.collisionEntities[j];
                if (this.isColliding(currentEntity, nextEntity)) {
                    const collidables = {
                        [currentEntity.name]: currentEntity,
                        [nextEntity.name]: nextEntity
                    };
                    const square = collidables["square"];
                    const platform = collidables["platform"];
                    if (square.speed.y > 0) {
                        square.position.y -= (square.position.y + square.size.height) - platform.position.y;
                        square.speed.y = 0;
                        square.canJump = true;
                    }
                    if (square.speed.y < 0) {
                        square.position.y += (platform.position.y + platform.size.height) - square.position.y;
                        square.speed.y = 0;
                    }
                    // transferEnergy(currentEntity, nextEntity);
                }
            }
        }
    }
}
