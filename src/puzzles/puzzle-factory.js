import Coordinate from '../model/coordinate.js';
import WallCoordinate from '../model/wall-coordinate.js';
import Robot, { ROBOTS } from '../model/robot.js';

const puzzleFactory = {
  1: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(0, 0), ROBOTS.YELLOW),
      new Robot(new Coordinate(1, 1), ROBOTS.BLUE),
      new Robot(new Coordinate(5, 5), ROBOTS.RED),
      new Robot(new Coordinate(6, 6), ROBOTS.GREEN),
    ],
    goalColor: 'yellow',
    goalLocation: new Coordinate(2, 2),
    walls: [
      new WallCoordinate(4, 1, { left: true, top: true }),
      new WallCoordinate(7, 8, { right: true }),
    ],
    minimumNumberOfMoves: 4,
  }),
  2: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(10, 8), ROBOTS.YELLOW),
      new Robot(new Coordinate(4, 4), ROBOTS.BLUE),
      new Robot(new Coordinate(5, 5), ROBOTS.RED),
      new Robot(new Coordinate(6, 6), ROBOTS.GREEN),
    ],
    goalColor: 'red',
    goalLocation: new Coordinate(8, 2),
    walls: [
      new WallCoordinate(1, 7, { bottom: true }),
      new WallCoordinate(7, 8, { left: true }),
      new WallCoordinate(8, 3, { right: true }),
    ],
    minimumNumberOfMoves: 6,
  }),
  3: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(0, 0), ROBOTS.YELLOW),
      new Robot(new Coordinate(1, 0), ROBOTS.BLUE),
      new Robot(new Coordinate(2, 0), ROBOTS.RED),
      new Robot(new Coordinate(3, 0), ROBOTS.GREEN),
    ],
    goalColor: 'green',
    goalLocation: new Coordinate(11, 3),
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
      new Robot(new Coordinate(0, 0), ROBOTS.YELLOW),
      new Robot(new Coordinate(1, 0), ROBOTS.BLUE),
      new Robot(new Coordinate(2, 0), ROBOTS.RED),
      new Robot(new Coordinate(3, 0), ROBOTS.GREEN),
    ],
    goalColor: 'red',
    goalLocation: new Coordinate(1, 2),
    walls: [
      new WallCoordinate(1, 1, { top: true }),
      new WallCoordinate(2, 1, { top: true }),
      new WallCoordinate(3, 1, { top: true }),
    ],
    minimumNumberOfMoves: 6,
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
