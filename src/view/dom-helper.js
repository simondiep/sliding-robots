/**
 * DOM manipulation helper
 */

export function clearGameBoardDiv() {
  document.getElementById('game-board').innerHTML = '';
}

export function createElement(elementName) {
  return document.createElement(elementName);
}

export function getBody() {
  return document.body;
}

export function getGameBoardDiv() {
  return document.getElementById('game-board');
}

export function getRobotImages(color) {
  return {
    front: document.getElementById(`${color}-robot-front`),
    back: document.getElementById(`${color}-robot-back`),
    left: document.getElementById(`${color}-robot-left`),
    right: document.getElementById(`${color}-robot-right`),
  };
}

export function getRestartButton() {
  return document.getElementById('restartButton');
}

export function incrementNumberOfMovesLabel() {
  const numberOfMovesLabel = document.getElementById('numberOfMovesLabel');
  let numberOfMoves = numberOfMovesLabel.innerHTML;
  numberOfMovesLabel.innerHTML = ++numberOfMoves;
}

export function resetNumberOfMovesLabel() {
  document.getElementById('numberOfMovesLabel').innerHTML = 0;
}

export function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

export function setMinimumNumberOfMovesLabel(moves) {
  document.getElementById('minimumNumberOfMovesLabel').innerHTML = moves;
}

export function showApp() {
  document.getElementById('app').style.display = 'table';
}

export function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

export function swapRobotControlsToRedGreen() {
  document.getElementById('wasd-yellow-blue').style.display = 'none';
  document.getElementById('wasd-red-green').style.display = 'block';
}

export function swapRobotControlsToYellowBlue() {
  document.getElementById('wasd-red-green').style.display = 'none';
  document.getElementById('wasd-yellow-blue').style.display = 'block';
}
