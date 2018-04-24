import { createCanvasView } from '../view/canvas-factory.js';
import GameView from '../view/game-view.js';
import Coordinate from '../model/coordinate.js';
import { applyKeyCodeToPlayerLocation } from './movement-controller.js';

/**
 * Controls all game logic
 */
export default class GameController {
    constructor() {
        this.keyDownCallback = this.keyDownCallback.bind(this);
        const initializeGameCallback = this.initializeGame.bind(this);
        this.gameView = new GameView(this.keyDownCallback, initializeGameCallback);
        this.initializeGame();
    }

    initializeGame() {
        this.playerLocation = new Coordinate(1,1);
        this.goalLocation = new Coordinate(3,3);
        const board = {
            SQUARE_SIZE_IN_PIXELS: 12.5,
            HORIZONTAL_SQUARES: 50,
            VERTICAL_SQUARES: 40,
        };
        this.initializeWalls(board.HORIZONTAL_SQUARES, board.VERTICAL_SQUARES);
        this.createBoard(board);
        this.gameView.initializeGame();
        this.renderGame();
    }

    renderGame() {

        this.canvasView.clear();

        this.canvasView.drawSquare(this.goalLocation, 'green');

        this.canvasView.drawSquare(this.playerLocation, 'red');

        this.canvasView.drawSquares(this.walls, 'gray');

        if (this.playerLocation.equals(this.goalLocation)) {
            this.gameView.showVictoryScreen();
            return;
        }

        const self = this;
        // Run in a loop
        setTimeout(() => {
            requestAnimationFrame(self.renderGame.bind(self));
        }, 1000 / 30); // 30 FPS
    }

    createBoard(board) {
        this.canvasView =
            createCanvasView(
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
        const previousPlayerLocation = this.playerLocation;
        this.playerLocation = applyKeyCodeToPlayerLocation(keyCode, this.playerLocation, this.walls);
        if (!previousPlayerLocation.equals(this.playerLocation)) {
            this.gameView.incrementNumberOfMoves();
        }
    }
}
