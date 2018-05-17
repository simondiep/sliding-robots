import { createCanvasView } from '../view/canvas-factory.js';
import GameView from '../view/game-view.js';
import { applyKeyCodeToRobot, moveRobot } from './movement-controller.js';
import { getPuzzle, getRandomPuzzleId } from '../puzzles/puzzle-factory.js';
import { ROBOTS } from '../model/robot.js';

/**
 * Controls all game logic
 */
export default class GameController {
  constructor() {
    const keyDownCallback = this.keyDownCallback.bind(this);
    const initializeGameCallback = this.initializeGame.bind(this);
    const initializeGameWithPuzzleIdCallback = this.initializeGameWithPuzzleId.bind(this);
    this.gameView = new GameView(
      keyDownCallback,
      initializeGameCallback,
      initializeGameWithPuzzleIdCallback,
    );
    this.board = {
      SQUARE_SIZE_IN_PIXELS: 35,
      HORIZONTAL_SQUARES: 16,
      VERTICAL_SQUARES: 16,
    };
    this.canvasView = createCanvasView(
      this.board.SQUARE_SIZE_IN_PIXELS,
      this.board.HORIZONTAL_SQUARES,
      this.board.VERTICAL_SQUARES,
    );
    this.canvasView.showSplashScreen('Sliding Robots', 'Press Space to begin');
  }

  initializeGame() {
    this.initializeGameWithPuzzleId(getRandomPuzzleId());
  }

  initializeGameWithPuzzleId(puzzleId) {
    this.activeRobotInfo = ROBOTS.RED;
    this.puzzle = getPuzzle(puzzleId);
    this.canvasView = createCanvasView(
      this.board.SQUARE_SIZE_IN_PIXELS,
      this.board.HORIZONTAL_SQUARES,
      this.board.VERTICAL_SQUARES,
    );
    this.gameView.initializeGame(puzzleId, this.puzzle.minimumNumberOfMoves, this.activeRobotInfo);
    this.lastMoveTime = Date.now();
    this.renderGame();
  }

  // Call this when you have initiated a change that needs to be rendered
  // Set the lastMoveTime to run in a loop for longer than a second (To save CPU usage)
  renderGame() {
    for (const robot of this.puzzle.robots) {
      // Move the robot and keep track of number of moves
      const previousRobotDirection = robot.getDirection();
      moveRobot(robot, this.puzzle.walls, this.puzzle.robots);

      if (previousRobotDirection && !robot.getDirection()) {
        this.gameView.robotHasStoppedMoving(robot.hasMoved());
      }
    }

    this.canvasView.clearAndDrawBoard();

    this.canvasView.drawSquare(this.puzzle.goalLocation, this.puzzle.goalColor);
    this.canvasView.drawText(this.puzzle.goalLocation, 'white', 'Goal');
    this.canvasView.drawWalls(this.puzzle.walls, '#373b42', 'lightgray');

    // Draw all robots
    for (const robot of this.puzzle.robots) {
      this.canvasView.drawImage(robot.getLocation(), robot.getImage());
    }

    // Draw arrows around active robot
    for (const robot of this.puzzle.robots) {
      if (this.activeRobotInfo.color === robot.getColor() && !robot.getDirection()) {
        this.canvasView.drawArrowsAround(robot.getLocation(), this.activeRobotInfo.color);
        break;
      }
    }

    for (const robot of this.puzzle.robots) {
      if (
        this.puzzle.goalColor === robot.getColor() &&
        robot.getLocation().equals(this.puzzle.goalLocation)
      ) {
        this.gameView.robotHasStoppedMoving();
        this.gameView.showVictoryScreen();
        return;
      }
    }

    const self = this;
    // Run in a loop for a second after the last move
    // Make sure you can cross the entire screen within this time and fps combo
    if (Date.now() - self.lastMoveTime < 1000) {
      this.rendering = true;
      setTimeout(() => {
        requestAnimationFrame(self.renderGame.bind(self));
      }, 1000 / 30); // 30 FPS
    } else {
      this.rendering = false;
    }
  }

  /*******************
   *  View Callbacks *
   *******************/

  keyDownCallback(keyCode) {
    if (this.swapActiveRobot(keyCode)) {
      this.renderGame();
      return;
    }

    const validKey = applyKeyCodeToRobot(keyCode, this.puzzle.robots, this.activeRobotInfo);
    if (validKey) {
      this.lastMoveTime = Date.now();
      if (!this.rendering) {
        this.renderGame();
      }
    }
  }

  swapActiveRobot(keyCode) {
    if (ROBOTS.RED.keyCodes.indexOf(keyCode) > -1) {
      this.activeRobotInfo = ROBOTS.RED;
      return true;
    } else if (ROBOTS.GREEN.keyCodes.indexOf(keyCode) > -1) {
      this.activeRobotInfo = ROBOTS.GREEN;
      return true;
    } else if (ROBOTS.BLUE.keyCodes.indexOf(keyCode) > -1) {
      this.activeRobotInfo = ROBOTS.BLUE;
      return true;
    } else if (ROBOTS.YELLOW.keyCodes.indexOf(keyCode) > -1) {
      this.activeRobotInfo = ROBOTS.YELLOW;
      return true;
    }
  }
}
