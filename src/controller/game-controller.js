import { createCanvasView } from '../view/canvas-factory.js';
import GameView from '../view/game-view.js';
import Coordinate from '../model/coordinate.js';
import Robot from '../model/robot.js';
import { applyKeyCodeToRobot, moveRobot } from './movement-controller.js';

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
        this.redRobot = new Robot(new Coordinate(1,1), 'red');
        this.goalLocation = new Coordinate(3,3);
        const board = {
            SQUARE_SIZE_IN_PIXELS: 25,
            HORIZONTAL_SQUARES: 20,
            VERTICAL_SQUARES: 15,
        };
        this.initializeWalls(board.HORIZONTAL_SQUARES, board.VERTICAL_SQUARES);
        this.createBoard(board);
        this.gameView.initializeGame();
        this.renderGame();
    }

    renderGame() {

        // Move the robot and keep track of number of moves
        const previousRedRobotDirection = this.redRobot.getDirection();
        moveRobot(this.redRobot, this.walls);
        // TODO Don't count moving into wall as a move
        if (previousRedRobotDirection && !this.redRobot.getDirection()) {
            this.gameView.incrementNumberOfMoves();
        }

        this.canvasView.clear();

        this.canvasView.drawSquare(this.goalLocation, 'green');

        this.canvasView.drawSquare(this.redRobot.getLocation(), this.redRobot.getColor());

        this.canvasView.drawSquares(this.walls, 'gray');

        if (this.redRobot.getLocation().equals(this.goalLocation)) {
            this.gameView.incrementNumberOfMoves();
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

        // Make it easy to win
        this.walls.push(new Coordinate(this.goalLocation.getX() + 1, 1));
    }

    /*******************
     *  View Callbacks *
     *******************/

    keyDownCallback(keyCode) {
        applyKeyCodeToRobot(keyCode, this.redRobot);
    }
}
