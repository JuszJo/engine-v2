function transferEnergy(entity1, entity2) {
    if (Math.abs(entity1.speed) > Math.abs(entity2.speed)) {
        entity2.speed = entity1.speed;
        entity1.speed = 0;
    }
    else {
        entity1.speed = entity2.speed;
        entity2.speed = 0;
    }
}
export default class CollisionSystem {
    constructor(...entities) {
        this.collisionEntities = [];
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
                currentEntity.speed *= -1;
            }
            if (currentEntity.position.x + currentEntity.size.width > 800) {
                currentEntity.position.x = 800 - currentEntity.size.width;
                currentEntity.speed *= -1;
            }
            if (currentEntity.position.y < 0) {
                currentEntity.position.y = 0;
            }
            if (currentEntity.position.y + currentEntity.size.height > 600) {
                currentEntity.position.y = 600 - currentEntity.size.height;
            }
        }
    }
    checkCollision() {
        for (let i = 0; i < this.collisionEntities.length - 1; ++i) {
            const currentEntity = this.collisionEntities[i];
            for (let j = i + 1; j < this.collisionEntities.length; ++j) {
                const nextEntity = this.collisionEntities[j];
                if (this.isColliding(currentEntity, nextEntity)) {
                    transferEnergy(currentEntity, nextEntity);
                }
            }
        }
    }
}
