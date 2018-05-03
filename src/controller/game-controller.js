import { createCanvasView } from '../view/canvas-factory.js';
import GameView from '../view/game-view.js';
import { applyKeyCodeToRobot, moveRobot } from './movement-controller.js';
import { getPuzzle, getRandomPuzzleId } from '../puzzles/puzzle-factory.js';
import Coordinate from '../model/coordinate.js';

/**
 * Controls all game logic
 */
export default class GameController {
  constructor() {
    const keyDownCallback = this.keyDownCallback.bind(this);
    const initializeGameCallback = this.initializeGame.bind(this);
    const initializeGameWithPuzzleIdCallback = this.initializeGameWithPuzzleId.bind(this);
    const swapControlsCallback = this.swapControlsCallback.bind(this);
    this.gameView = new GameView(
      keyDownCallback,
      initializeGameCallback,
      initializeGameWithPuzzleIdCallback,
      swapControlsCallback,
    );
    this.initializeGame();
  }

  initializeGame() {
    this.initializeGameWithPuzzleId(getRandomPuzzleId());
  }

  initializeGameWithPuzzleId(puzzleId) {
    this.activeRobots = 'yellowBlue';
    this.puzzle = getPuzzle(puzzleId);
    const borderWalls = this.getBorderWalls(
      this.puzzle.board.HORIZONTAL_SQUARES,
      this.puzzle.board.VERTICAL_SQUARES,
    );
    this.walls = borderWalls.concat(this.puzzle.walls);
    this.createBoard(this.puzzle.board);
    this.gameView.initializeGame(puzzleId, this.puzzle.minimumNumberOfMoves, this.activeRobots);
    this.lastMoveTime = Date.now();
    this.renderGame();
  }

  // Call this when you have initiated a change that needs to be rendered
  // Set the lastMoveTime to run in a loop for longer than a second (To save CPU usage)
  renderGame() {
    for (const robot of this.puzzle.robots) {
      // Move the robot and keep track of number of moves
      const previousRobotDirection = robot.getDirection();
      moveRobot(robot, this.walls, this.puzzle.robots);

      // TODO Don't count moving into wall as a move
      if (previousRobotDirection && !robot.getDirection()) {
        this.gameView.incrementNumberOfMoves();
      }
    }

    this.canvasView.clear();

    this.canvasView.drawSquares(this.walls, 'gray');
    this.canvasView.drawSquare(this.puzzle.goalLocation, this.puzzle.goalColor);
    this.canvasView.drawText(this.puzzle.goalLocation, 'white', 'Goal');
    // Draw all robots
    for (const robot of this.puzzle.robots) {
      this.canvasView.drawImage(robot.getLocation(), robot.getImage());
    }

    for (const robot of this.puzzle.robots) {
      if (
        this.puzzle.goalColor === robot.getColor() &&
        robot.getLocation().equals(this.puzzle.goalLocation)
      ) {
        this.gameView.incrementNumberOfMoves();
        this.gameView.showVictoryScreen();
        return;
      }
    }

    const self = this;
    // Run in a loop for a second after the last move
    if (Date.now() - self.lastMoveTime < 1000) {
      this.rendering = true;
      setTimeout(() => {
        requestAnimationFrame(self.renderGame.bind(self));
      }, 1000 / 30); // 30 FPS
    } else {
      this.rendering = false;
    }
  }

  createBoard(board) {
    this.canvasView = createCanvasView(
      board.SQUARE_SIZE_IN_PIXELS,
      board.HORIZONTAL_SQUARES,
      board.VERTICAL_SQUARES,
    );
    this.canvasView.clear();
  }

  getBorderWalls(horizontalSquares, verticalSquares) {
    const borderWalls = [];
    // Make a wall for the top row
    for (let index = 0; index <= horizontalSquares; index++) {
      borderWalls.push(new Coordinate(index, 0));
    }

    // Make a wall for the bottom row
    for (let index = 0; index <= horizontalSquares; index++) {
      borderWalls.push(new Coordinate(index, verticalSquares));
    }

    // Make a wall for the left column
    for (let index = 0; index <= verticalSquares; index++) {
      borderWalls.push(new Coordinate(0, index));
    }

    // Make a wall for the right column
    for (let index = 0; index <= verticalSquares; index++) {
      borderWalls.push(new Coordinate(horizontalSquares, index));
    }
    return borderWalls;
  }

  /*******************
   *  View Callbacks *
   *******************/

  keyDownCallback(keyCode) {
    const validKey = applyKeyCodeToRobot(keyCode, this.puzzle.robots, this.activeRobots);
    if (validKey) {
      this.lastMoveTime = Date.now();
      if (!this.rendering) {
        this.renderGame();
      }
    }
  }

  swapControlsCallback() {
    if (this.activeRobots === 'yellowBlue') {
      this.activeRobots = 'redGreen';
    } else {
      this.activeRobots = 'yellowBlue';
    }
  }
}
