import Square from "./Square.js";
export default class SquareFactory {
    constructor(drawingSurface, ...createdSquares) {
        this.squares = [];
        this.drawingSurface = drawingSurface;
        for (let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i]);
        }
    }
    createSquare(x, y, width, height, speed) {
        this.addSquares(new Square(this.drawingSurface, x, y, width, height, speed));
    }
    addSquares(...createdSquares) {
        for (let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i]);
        }
    }
    updateAll() {
        for (let i = 0; i < this.squares.length; ++i) {
            const currentSquare = this.squares[i];
            currentSquare.update();
        }
    }
    getAll() {
        const squareArray = [];
        for (let i = 0; i < this.squares.length; ++i) {
            squareArray[i] = this.squares[i];
        }
        return squareArray;
    }
}
