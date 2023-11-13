import Square from "./Square.js"

export default class GravitySystem {
    entities: Array<Square> = []
    gForce = 0.5
    applyG = true

    constructor(squares: Array<Square>) {
        this.entities = squares
    }

    applyGravity() {
        if(this.applyG) {
            for(let i = 0; i < this.entities.length; ++i) {
                const currentEntity = this.entities[i]
    
                currentEntity.velocity.y += this.gForce
            }
        }
    }
    
    stopGravity() {
        this.applyG = false;
    }
}