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
      new Robot(new Coordinate(13, 4), ROBOTS.RED),
      new Robot(new Coordinate(18, 2), ROBOTS.GREEN),
    ],
    goalColor: 'yellow',
    goalLocation: new Coordinate(2, 2),
    walls: [
      new WallCoordinate(4, 1, { left: true, top: true }),
      new WallCoordinate(7, 8, { right: true }),
      new WallCoordinate(13, 4, { right: true, top: true }),
      new WallCoordinate(18, 2, { bottom: true, right: true }),
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
      new Robot(new Coordinate(7, 8), ROBOTS.BLUE),
      new Robot(new Coordinate(5, 5), ROBOTS.RED),
      new Robot(new Coordinate(8, 3), ROBOTS.GREEN),
    ],
    goalColor: 'red',
    goalLocation: new Coordinate(8, 2),
    walls: [
      new WallCoordinate(1, 7, { bottom: true, left: true }),
      new WallCoordinate(7, 8, { left: true, top: true }),
      new WallCoordinate(8, 3, { right: true, top: true }),
    ],
    minimumNumberOfMoves: 5,
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
    goalLocation: new Coordinate(4, 5),
    walls: [
      new WallCoordinate(4, 2, { top: true, left: true }),
      new WallCoordinate(15, 2, { top: true, right: true }),
      new WallCoordinate(2, 8, { top: true, left: true }),
      new WallCoordinate(15, 8, { bottom: true, right: true }),
    ],
    minimumNumberOfMoves: 8,
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
  5: () => ({
    board: {
      SQUARE_SIZE_IN_PIXELS: 50,
      HORIZONTAL_SQUARES: 20,
      VERTICAL_SQUARES: 10,
    },
    robots: [
      new Robot(new Coordinate(8, 2), ROBOTS.YELLOW),
      new Robot(new Coordinate(12, 5), ROBOTS.BLUE),
      new Robot(new Coordinate(5, 8), ROBOTS.RED),
      new Robot(new Coordinate(3, 0), ROBOTS.GREEN),
    ],
    goalColor: 'green',
    goalLocation: new Coordinate(6, 5),
    walls: [
      new WallCoordinate(4, 3, { top: true, left: true }),
      new WallCoordinate(15, 3, { top: true, right: true }),
      new WallCoordinate(4, 7, { top: true, left: true }),
      new WallCoordinate(15, 7, { bottom: true, right: true }),
      new WallCoordinate(6, 4, { bottom: true, left: true }),
      new WallCoordinate(17, 4, { top: true, right: true }),
      new WallCoordinate(6, 6, { bottom: true, left: true }),
      new WallCoordinate(17, 6, { bottom: true, right: true }),
    ],
    minimumNumberOfMoves: 7,
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
