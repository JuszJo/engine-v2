import Square from "./Square.js"

export default class GravitySystem {
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