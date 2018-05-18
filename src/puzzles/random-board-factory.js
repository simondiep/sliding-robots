/** Generates random boards with random robot and goals */

const quadrantTemplates = [
  [
    //x 0,  1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  // y
    'NW  ,N   ,NE  ,N   ,N   ,N   ,N   ,N   ', // 0
    'W   ,_   ,_   ,_   ,NE  ,_   ,_   ,_   ', // 1
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ', // 2
    'W   ,SW  ,_   ,_   ,_   ,_   ,_   ,_   ', // 3
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ', // 4
    'SW  ,_   ,_   ,_   ,_   ,NW  ,_   ,_   ', // 5
    'W   ,_   ,_   ,SE  ,_   ,_   ,_   ,_   ', // 6
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,NW  ', // 7
  ],
  [
    //x 0,  1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  // y
    'NW  ,N   ,N   ,N   ,N   ,N   ,NW  ,N   ', // 0
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ', // 1
    'W   ,_   ,_   ,NW  ,_   ,_   ,_   ,_   ', // 2
    'SW  ,_   ,_   ,_   ,_   ,SW  ,_   ,_   ', // 3
    'W   ,_   ,NE  ,_   ,_   ,_   ,_   ,_   ', // 4
    'W   ,_   ,_   ,_   ,SE  ,_   ,_   ,_   ', // 5
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ', // 6
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,NW  ', // 7
  ],
  [
    //x 0,  1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  // y
    'NW  ,NE  ,N   ,N   ,N   ,N   ,N   ,N   ', // 0
    'W   ,_   ,_   ,_   ,NE  ,_   ,_   ,_   ', // 1
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ', // 2
    'W   ,SW  ,_   ,_   ,_   ,_   ,_   ,_   ', // 3
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ', // 4
    'SW  ,_   ,_   ,_   ,_   ,NW  ,_   ,_   ', // 5
    'W   ,_   ,_   ,SE  ,_   ,_   ,_   ,_   ', // 6
    'W   ,_   ,_   ,_   ,_   ,_   ,_   ,NW  ', // 7
  ],
];

function rotateWallsClockwise(wallString) {
  return wallString.replace(/N/g, '1')
  .replace(/E/g, '2')
  .replace(/S/g, '3')
  .replace(/W/g, '4')
  .replace(/1/g, 'E')
  .replace(/2/g, 'S')
  .replace(/3/g, 'W')
  .replace(/4/g, 'N');
}

function rotateQuadrantClockwise(quadrant) {
  const newQuadrant = [ [], [], [], [], [], [], [], [] ];
  for (let rowIndex = quadrant.length - 1; rowIndex >= 0; rowIndex--) {
    const columnsForRow = quadrant[rowIndex].split(',');
    for (let colIndex = 0; colIndex < quadrant.length; colIndex++) {
      const value = columnsForRow[colIndex];
      newQuadrant[colIndex].push(columnsForRow[colIndex]);
    }
  }

  for (let rowIndex = 0; rowIndex < newQuadrant.length; rowIndex++) {
    newQuadrant[rowIndex] = rotateWallsClockwise(newQuadrant[rowIndex].join(','));
  }
  return newQuadrant;
}

function getRandomQuadrant() {
  return quadrantTemplates[Math.floor(Math.random() * quadrantTemplates.length)];
}

function getRandomBoardWithOnlyWalls() {
  const topLeftQuadrant = getRandomQuadrant();
  const topRightQuadrant = rotateQuadrantClockwise(getRandomQuadrant());
  const bottomRightQuadrant = rotateQuadrantClockwise(rotateQuadrantClockwise(getRandomQuadrant()));
  const bottomLeftQuadrant = rotateQuadrantClockwise(rotateQuadrantClockwise(rotateQuadrantClockwise(getRandomQuadrant())));

  const fullBoard = [];
  for (let i = 0; i < (topLeftQuadrant.length * 2); i++) {
    fullBoard.push('');
  }
  for (let topRowIndex = 0; topRowIndex < topLeftQuadrant.length; topRowIndex++) {
    fullBoard[topRowIndex] = `${topLeftQuadrant[topRowIndex]},${topRightQuadrant[topRowIndex]}`;
  }
  for (let bottomRowIndex = 0; bottomRowIndex < bottomLeftQuadrant.length; bottomRowIndex++) {
    fullBoard[bottomRowIndex + bottomLeftQuadrant.length] = `${bottomLeftQuadrant[bottomRowIndex]},${bottomRightQuadrant[bottomRowIndex]}`;
  }
  return fullBoard;
}

const BOARD_SIZE = 16;

function getRandomLocation(occupiedLocations) {
  const location = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
  for (const occupiedLocation of occupiedLocations) {
    if (location.x === occupiedLocation.x && location.y === occupiedLocation.y) {
      return getRandomLocation(occupiedLocations);
    }
  }
  return location;
}

function placeCharacterOnBoard(board, location, char) {
  const placedBoard = board.slice(0);
  const rowToReplace = placedBoard[location.y].split(',');
  if (rowToReplace[location.x].trim() === '_') {
    rowToReplace[location.x] = rowToReplace[location.x].replace('_', char);
  } else {
    rowToReplace[location.x] = rowToReplace[location.x].replace(' ', char);
  }
  placedBoard[location.y] = rowToReplace.join(',')

  return placedBoard;
}

const goalStrings = ['gb', 'gg', 'gr', 'gy'];

function getRandomGoalString() {
  return goalStrings[Math.floor(Math.random() * goalStrings.length)];
}

export function getRandomBoard() {
  let board = getRandomBoardWithOnlyWalls();
  const occupiedLocations = [
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 8, y: 7 },
    { x: 8, y: 8 },
  ];

  // Place robots
  const blueRobotLocation = getRandomLocation(occupiedLocations);
  board = placeCharacterOnBoard(board, blueRobotLocation, 'B');
  occupiedLocations.push(blueRobotLocation);
  const greenRobotLocation = getRandomLocation(occupiedLocations);
  board = placeCharacterOnBoard(board, greenRobotLocation, 'G');
  occupiedLocations.push(greenRobotLocation);
  const redRobotLocation = getRandomLocation(occupiedLocations);
  board = placeCharacterOnBoard(board, redRobotLocation, 'R');
  occupiedLocations.push(redRobotLocation);
  const yellowRobotLocation = getRandomLocation(occupiedLocations);
  board = placeCharacterOnBoard(board, yellowRobotLocation, 'Y');
  occupiedLocations.push(yellowRobotLocation);

  // Place goal
  // TODO Smartly place goal at a wall intersection
  const goalLocation = getRandomLocation(occupiedLocations);
  board = placeCharacterOnBoard(board, goalLocation, getRandomGoalString());

  return board;
}
