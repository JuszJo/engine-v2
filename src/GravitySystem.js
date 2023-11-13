export default class GravitySystem {
    constructor(squares) {
        this.entities = [];
        this.gForce = 1;
        this.applyG = true;
        this.entities = squares;
    }
    applyGravity() {
        if (this.applyG) {
            for (let i = 0; i < this.entities.length; ++i) {
                const currentEntity = this.entities[i];
                currentEntity.velocity.y += this.gForce;
            }
        }
    }
    stopGravity() {
        this.applyG = false;
    }
}
