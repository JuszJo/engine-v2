import Square from "./Square.js";

export default class SquareFactory {
    squares: Array<Square> = [];
    drawingSurface: CanvasRenderingContext2D | null;

    constructor(drawingSurface: CanvasRenderingContext2D | null, ...createdSquares: Array<Square>) {
        this.drawingSurface = drawingSurface;

        for(let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i])
        }
    }

    createSquare(x: number, y: number, width: number, height: number, speed: {x: number, y: number}) {
        this.addSquares(new Square(this.drawingSurface, x, y, width, height, speed));
    }

    addSquares(...createdSquares: Array<Square>) {
        for(let i = 0; i < createdSquares.length; ++i) {
            this.squares.push(createdSquares[i])
        }
    }

    updateAll() {
        for(let i = 0; i < this.squares.length; ++i) {
            const currentSquare = this.squares[i]

            currentSquare.update();
        }
    }

    getCount() {
       return this.squares.length 
    }

    getAll() {
        const squareArray: Array<Square> = []

        for(let i = 0; i < this.squares.length; ++i) {
            squareArray[i] = this.squares[i]
        }

        return squareArray;
    }
}