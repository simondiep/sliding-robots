import CanvasFactory from '../view/canvas-factory.js';
import GameView from '../view/game-view.js';
import Coordinate from '../model/coordinate.js';
import { applyKeyCodeToPlayerLocation } from './key-input-controller.js';

/**
 * Controls all game logic
 */
export default class GameController {
    constructor() {
        this.playerLocation = new Coordinate(1,1);
        this.keyDownCallback = this.keyDownCallback.bind(this);
        this.gameView = new GameView(this.keyDownCallback);
        const board = {
            SQUARE_SIZE_IN_PIXELS: 12.5,
            HORIZONTAL_SQUARES: 50,
            VERTICAL_SQUARES: 40,
        };
        this.initializeWalls(board.HORIZONTAL_SQUARES, board.VERTICAL_SQUARES);
        this.createBoard(board);
        this.renderGame();
    }

    renderGame() {
        this.canvasView.clear();

        this.canvasView.drawSquare(this.playerLocation, 'red');

        this.canvasView.drawSquares(this.walls, 'gray');

        const self = this;
        // Run in a loop
        setTimeout(() => {
            requestAnimationFrame(self.renderGame.bind(self));
        }, 1000 / 30); // 30 FPS
    }

    createBoard(board) {
        this.canvasView =
            CanvasFactory.createCanvasView(
                board.SQUARE_SIZE_IN_PIXELS, board.HORIZONTAL_SQUARES, board.VERTICAL_SQUARES);
        this.canvasView.clear();
    }

    initializeWalls(horizontalSquares, verticalSquares) {
        this.walls = [];
        // Make a wall for the top row
        for (let index = 0; index <= horizontalSquares; index++) {
          this.walls.push(new Coordinate(index, 0));
        }

        // Make a wall for the bottom row
        for (let index = 0; index <= horizontalSquares; index++) {
          this.walls.push(new Coordinate(index, verticalSquares));
        }

        // Make a wall for the left column
        for (let index = 0; index <= verticalSquares; index++) {
          this.walls.push(new Coordinate(0, index));
        }

        // Make a wall for the right column
        for (let index = 0; index <= verticalSquares; index++) {
          this.walls.push(new Coordinate(horizontalSquares, index));
        }
    }

    /*******************
     *  View Callbacks *
     *******************/

    keyDownCallback(keyCode) {
        this.playerLocation = applyKeyCodeToPlayerLocation(keyCode, this.playerLocation);
    }
}
