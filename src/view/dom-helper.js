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

export function getBlueRobotImage() {
  return document.getElementById('blue-robot');
}

export function getYellowRobotImage() {
  return document.getElementById('yellow-robot');
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

export function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}
