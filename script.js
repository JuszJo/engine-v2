var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var canvas = document.querySelector('canvas');
var drawingSurface = canvas && canvas.getContext('2d');
var CollisionSystem = /** @class */ (function () {
    function CollisionSystem() {
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        this.collisionEntities = [];
        this.collisionEntities = __spreadArray([], entities, true);
    }
    CollisionSystem.prototype.addEntities = function (entity) {
        this.collisionEntities.push(entity);
    };
    CollisionSystem.prototype.isColliding = function (entity1, entity2) {
        if (entity1.position.x + entity1.size.width > entity2.position.x &&
            entity1.position.x < entity2.position.x + entity2.size.width &&
            entity1.position.y + entity1.size.height > entity2.position.y &&
            entity1.position.y < entity2.position.y + entity2.size.height) {
            return true;
        }
        else
            return false;
    };
    CollisionSystem.prototype.checkCollision = function () {
        for (var i = 0; i < this.collisionEntities.length - 1; ++i) {
            var currentEntity = this.collisionEntities[i];
            for (var j = i + 1; j < this.collisionEntities.length; ++j) {
                var nextEntity = this.collisionEntities[j];
                if (this.isColliding(currentEntity, nextEntity)) {
                    nextEntity.speed = 0;
                }
            }
        }
    };
    return CollisionSystem;
}());
var square1 = {
    name: "one",
    position: {
        x: 50,
        y: 50,
    },
    size: {
        width: 100,
        height: 100,
    }
};
var square2 = {
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
};
var collider = new CollisionSystem(square1, square2);
function update() {
    if (drawingSurface) {
        drawingSurface.clearRect(0, 0, 800, 600);
        drawingSurface.fillRect(square1.position.x, square1.position.y, square1.size.width, square1.size.height);
        square2.speed ? square2.position.x += square2.speed : null;
        drawingSurface.fillRect(square2.position.x, square2.position.y, square2.size.width, square2.size.height);
        collider.checkCollision();
        requestAnimationFrame(update);
    }
}
requestAnimationFrame(update);
