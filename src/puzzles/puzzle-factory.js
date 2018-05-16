import Coordinate from '../model/coordinate.js';
import WallCoordinate from '../model/wall-coordinate.js';
import Robot, { ROBOTS } from '../model/robot.js';
import { board as board1, minimumNumberOfMoves as minimumNumberOfMoves1 } from './board1.js';
import { board as board2, minimumNumberOfMoves as minimumNumberOfMoves2 } from './board2.js';

// TODO Convert rest of puzzles to individual boards
const puzzleFactory = {
  1: () => ({
    ...parseBoard(board1),
    minimumNumberOfMoves: minimumNumberOfMoves1,
  }),
  2: () => ({
    ...parseBoard(board2),
    minimumNumberOfMoves: minimumNumberOfMoves2,
  }),
  3: () => ({
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
      new WallCoordinate(14, 2, { top: true, right: true }),
      new WallCoordinate(2, 8, { top: true, left: true }),
      new WallCoordinate(14, 8, { bottom: true, right: true }),
    ],
    minimumNumberOfMoves: 8,
  }),
  4: () => ({
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
      new WallCoordinate(12, 3, { top: true, right: true }),
      new WallCoordinate(4, 7, { top: true, left: true }),
      new WallCoordinate(12, 7, { bottom: true, right: true }),
      new WallCoordinate(6, 4, { bottom: true, left: true }),
      new WallCoordinate(14, 4, { top: true, right: true }),
      new WallCoordinate(6, 6, { bottom: true, left: true }),
      new WallCoordinate(14, 6, { bottom: true, right: true }),
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

// Converts a board array into an structure of robots, walls, and goal objects
function parseBoard(boardAsArray) {
  let blueRobotLocation;
  let greenRobotLocation;
  let redRobotLocation;
  let yellowRobotLocation;
  let goalColor;
  let goalLocation;
  let walls = [];
  for (let rowIndex = 0; rowIndex < boardAsArray.length; rowIndex++) {
    const columns = boardAsArray[rowIndex].split(',');
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const value = columns[colIndex].trim();
      if (value === '_') {
        continue;
      }
      // Walls
      if (value.indexOf('N') > -1) {
        walls.push(new WallCoordinate(colIndex, rowIndex, { top: true }));
      }
      if (value.indexOf('E') > -1) {
        walls.push(new WallCoordinate(colIndex, rowIndex, { right: true }));
      }
      if (value.indexOf('S') > -1) {
        walls.push(new WallCoordinate(colIndex, rowIndex, { bottom: true }));
      }
      if (value.indexOf('W') > -1) {
        walls.push(new WallCoordinate(colIndex, rowIndex, { left: true }));
      }

      // Robots
      if (value.indexOf('B') > -1) {
        blueRobotLocation = new Coordinate(colIndex, rowIndex);
      } else if (value.indexOf('G') > -1) {
        greenRobotLocation = new Coordinate(colIndex, rowIndex);
      } else if (value.indexOf('R') > -1) {
        redRobotLocation = new Coordinate(colIndex, rowIndex);
      } else if (value.indexOf('Y') > -1) {
        yellowRobotLocation = new Coordinate(colIndex, rowIndex);
      }

      // Goal
      if (value.indexOf('Gb') > -1) {
        goalColor = 'blue';
        goalLocation = new Coordinate(colIndex, rowIndex);
      } else if (value.indexOf('Gg') > -1) {
        goalColor = 'green';
        goalLocation = new Coordinate(colIndex, rowIndex);
      } else if (value.indexOf('Gr') > -1) {
        goalColor = 'red';
        goalLocation = new Coordinate(colIndex, rowIndex);
      } else if (value.indexOf('Gy') > -1) {
        goalColor = 'yellow';
        goalLocation = new Coordinate(colIndex, rowIndex);
      }
    }
  }
  return {
    robots: [
      new Robot(blueRobotLocation, ROBOTS.BLUE),
      new Robot(greenRobotLocation, ROBOTS.GREEN),
      new Robot(redRobotLocation, ROBOTS.RED),
      new Robot(yellowRobotLocation, ROBOTS.YELLOW),
    ],
    goalColor,
    goalLocation,
    walls,
  };
}
