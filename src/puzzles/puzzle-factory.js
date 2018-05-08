import Coordinate from '../model/coordinate.js';
import Robot from '../model/robot.js';
import {
  getBlueRobotImage,
  getGreenRobotImage,
  getRedRobotImage,
  getYellowRobotImage,
} from '../view/dom-helper.js';

const puzzleFactory = {
  1: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(1, 1), 'yellow', getYellowRobotImage()),
      new Robot(new Coordinate(2, 2), 'blue', getBlueRobotImage()),
      new Robot(new Coordinate(6, 6), 'red', getRedRobotImage()),
      new Robot(new Coordinate(7, 7), 'green', getGreenRobotImage()),
    ],
    goalColor: 'yellow',
    goalLocation: new Coordinate(3, 3),
    walls: [new Coordinate(5, 2), new Coordinate(8, 9)],
    minimumNumberOfMoves: 4,
  }),
  2: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(11, 9), 'yellow', getYellowRobotImage()),
      new Robot(new Coordinate(5, 5), 'blue', getBlueRobotImage()),
      new Robot(new Coordinate(6, 6), 'red', getRedRobotImage()),
      new Robot(new Coordinate(7, 7), 'green', getGreenRobotImage()),
    ],
    goalColor: 'red',
    goalLocation: new Coordinate(9, 3),
    walls: [new Coordinate(2, 8), new Coordinate(8, 9), new Coordinate(9, 4)],
    minimumNumberOfMoves: 6,
  }),
  3: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(1, 1), 'yellow', getYellowRobotImage()),
      new Robot(new Coordinate(2, 1), 'blue', getBlueRobotImage()),
      new Robot(new Coordinate(3, 1), 'red', getRedRobotImage()),
      new Robot(new Coordinate(4, 1), 'green', getGreenRobotImage()),
    ],
    goalColor: 'green',
    goalLocation: new Coordinate(12, 4),
    walls: [],
    minimumNumberOfMoves: 10,
  }),
  4: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(1, 1), 'yellow', getYellowRobotImage()),
      new Robot(new Coordinate(2, 1), 'blue', getBlueRobotImage()),
      new Robot(new Coordinate(3, 1), 'red', getRedRobotImage()),
      new Robot(new Coordinate(4, 1), 'green', getGreenRobotImage()),
    ],
    goalColor: 'red',
    goalLocation: new Coordinate(2, 3),
    walls: [new Coordinate(2,2)],
    minimumNumberOfMoves: 4,
  }),
};

// Store last random puzzle
let lastRandomPuzzleId;

// Return a new puzzle if you've recently completed one
export function getRandomPuzzleId() {
  const ids = Object.keys(puzzleFactory);
  if (lastRandomPuzzleId) {
    const index = ids.indexOf(lastRandomPuzzleId);
    if (index !== -1) {
      ids.splice(index, 1);
    }
  }
  const randomPuzzleId = ids[Math.floor(Math.random() * ids.length)];
  lastRandomPuzzleId = randomPuzzleId;
  return randomPuzzleId;
}

export function getPuzzle(puzzleId) {
  return puzzleFactory[puzzleId]();
}
