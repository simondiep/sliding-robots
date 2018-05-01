import Coordinate from '../model/coordinate.js';
import Robot from '../model/robot.js';
import { getBlueRobotImage, getYellowRobotImage } from '../view/dom-helper.js';

const puzzleFactory = {
  1: () => ({
    id: 1,
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(1, 1), 'yellow', getYellowRobotImage()),
      new Robot(new Coordinate(2, 2), 'blue', getBlueRobotImage()),
    ],
    goalLocation: new Coordinate(3, 3),
    walls: [new Coordinate(5, 2)],
    minimumNumberOfMoves: 4,
  }),
  2: () => ({
    id: 2,
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(10, 9), 'yellow', getYellowRobotImage()),
      new Robot(new Coordinate(5, 5), 'blue', getBlueRobotImage()),
    ],
    goalLocation: new Coordinate(2, 2),
    walls: [new Coordinate(2, 8), new Coordinate(8, 9)],
    minimumNumberOfMoves: 5,
  }),
};

export function getRandomPuzzleId() {
  const ids = Object.keys(puzzleFactory);
  return ids[Math.floor(Math.random() * ids.length)];
}

export function getPuzzle(puzzleId) {
  return puzzleFactory[puzzleId]();
}
