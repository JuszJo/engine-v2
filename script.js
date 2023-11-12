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
var Square = /** @class */ (function () {
    function Square(x, y, width, height, speed) {
        this.name = "square";
        this.position = {
            x: 0,
            y: 0
        };
        this.size = {
            width: 0,
            height: 0,
        };
        this.speed = 0;
        this.color = "black";
        this.position.x = x;
        this.position.y = y;
        this.size.width = width;
        this.size.height = height;
        this.speed = speed;
    }
    Square.prototype.draw = function () {
        if (drawingSurface) {
            drawingSurface.fillStyle = this.color;
            drawingSurface.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    };
    Square.prototype.update = function () {
        this.draw();
        this.position.x += this.speed;
    };
    return Square;
}());
var SquareFactory = /** @class */ (function () {
    function SquareFactory() {
        var createdSquares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            createdSquares[_i] = arguments[_i];
        }
        this.squares = [];
        for (var i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i]);
        }
    }
    SquareFactory.prototype.createSquare = function (x, y, width, height, speed) {
        this.addSquares(new Square(x, y, width, height, speed));
    };
    SquareFactory.prototype.addSquares = function () {
        var createdSquares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            createdSquares[_i] = arguments[_i];
        }
        for (var i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i]);
        }
    };
    SquareFactory.prototype.updateAll = function () {
        for (var i = 0; i < this.squares.length; ++i) {
            var currentSquare = this.squares[i];
            currentSquare.update();
        }
    };
    SquareFactory.prototype.getAll = function () {
        var squareArray = [];
        for (var i = 0; i < this.squares.length; ++i) {
            squareArray[i] = this.squares[i];
        }
        return squareArray;
    };
    return SquareFactory;
}());
var CollisionSystem = /** @class */ (function () {
    function CollisionSystem() {
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        this.collisionEntities = [];
        this.collisionEntities = __spreadArray([], entities, true);
    }
    CollisionSystem.prototype.addEntities = function () {
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        for (var i = 0; i < entities.length; ++i) {
            this.collisionEntities.push(entities[i]);
        }
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
    CollisionSystem.prototype.checkWallCollision = function () {
        for (var i = 0; i < this.collisionEntities.length; ++i) {
            var currentEntity = this.collisionEntities[i];
            if (currentEntity.position.x < 0) {
                currentEntity.position.x = 0;
                currentEntity.speed *= -1;
            }
            if (currentEntity.position.x + currentEntity.size.width > 800) {
                currentEntity.position.x = 800 - currentEntity.size.width;
                currentEntity.speed *= -1;
            }
        }
    };
    CollisionSystem.prototype.checkCollision = function () {
        for (var i = 0; i < this.collisionEntities.length - 1; ++i) {
            var currentEntity = this.collisionEntities[i];
            for (var j = i + 1; j < this.collisionEntities.length; ++j) {
                var nextEntity = this.collisionEntities[j];
                if (this.isColliding(currentEntity, nextEntity)) {
                    transferEnergy(currentEntity, nextEntity);
                }
            }
        }
    };
    return CollisionSystem;
}());
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
var squareFactory = new SquareFactory();
squareFactory.createSquare(25, 50, 40, 40, 5);
squareFactory.createSquare(125, 50, 40, 40, 0);
squareFactory.createSquare(425, 50, 40, 40, -5);
squareFactory.createSquare(525, 50, 40, 40, -5);
squareFactory.createSquare(300, 100, 50, 50, 5);
var collider = new (CollisionSystem.bind.apply(CollisionSystem, __spreadArray([void 0], squareFactory.getAll(), false)))();
function update() {
    if (drawingSurface) {
        drawingSurface.clearRect(0, 0, 800, 600);
        squareFactory.updateAll();
        collider.checkWallCollision();
        collider.checkCollision();
        requestAnimationFrame(update);
    }
}
requestAnimationFrame(update);
