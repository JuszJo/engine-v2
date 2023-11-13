import Square from "./Square.js"

export default class GravitySystem {
    entities: Array<Square> = []
    gForce = 1

    constructor(squares: Array<Square>) {
        this.entities = squares
    }

    applyGravity() {
        for(let i = 0; i < this.entities.length; ++i) {
            const currentEntity = this.entities[i]

            currentEntity.velocity.y += this.gForce
        }
    }
}