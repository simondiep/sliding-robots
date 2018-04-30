import Coordinate from '../model/coordinate.js';
import Robot from '../model/robot.js';
import { getBlueRobotImage, getYellowRobotImage } from '../view/dom-helper.js';

export function getRandomPuzzleId() {
  return puzzleGetters[Math.floor(Math.random() * puzzleGetters.length)]().id;
}

const puzzleGetters = [];

export function getPuzzle(puzzleId) {
  return puzzleGetters.find(function(puzzleGetter) {
    return puzzleGetter().id === puzzleId;
  })();
}

const getPuzzle1 = () => ({
  id: 1,
  board: {
    SQUARE_SIZE_IN_PIXELS: 50,
    HORIZONTAL_SQUARES: 20,
    VERTICAL_SQUARES: 15,
  },
  robots: [
    new Robot(new Coordinate(1, 1), 'yellow', getYellowRobotImage()),
    new Robot(new Coordinate(2, 2), 'blue', getBlueRobotImage()),
  ],
  goalLocation: new Coordinate(3, 3),
  walls: [new Coordinate(5, 2)],
  minimumNumberOfMoves: 4,
});
puzzleGetters.push(getPuzzle1);

const getPuzzle2 = () => ({
  id: 2,
  board: {
    SQUARE_SIZE_IN_PIXELS: 50,
    HORIZONTAL_SQUARES: 20,
    VERTICAL_SQUARES: 15,
  },
  robots: [
    new Robot(new Coordinate(10, 10), 'yellow', getYellowRobotImage()),
    new Robot(new Coordinate(5, 5), 'blue', getBlueRobotImage()),
  ],
  goalLocation: new Coordinate(2, 2),
  walls: [new Coordinate(2, 8), new Coordinate(11, 10)],
  minimumNumberOfMoves: 5,
});
puzzleGetters.push(getPuzzle2);
