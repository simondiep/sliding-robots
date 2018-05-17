import Coordinate from '../model/coordinate.js';
import WallCoordinate from '../model/wall-coordinate.js';
import Robot, { ROBOTS } from '../model/robot.js';
import { board as board1, minimumNumberOfMoves as minimumNumberOfMoves1 } from './board1.js';
import { board as board2, minimumNumberOfMoves as minimumNumberOfMoves2 } from './board2.js';
import { board as board3, minimumNumberOfMoves as minimumNumberOfMoves3 } from './board3.js';

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
    ...parseBoard(board3),
    minimumNumberOfMoves: minimumNumberOfMoves3,
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
