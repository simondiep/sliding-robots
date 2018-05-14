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

export function getMuteButton() {
  return document.getElementById('muteButton');
}

export function getNewPuzzleButton() {
  return document.getElementById('newPuzzleButton');
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

export function muteBackgroundMusic() {
  const music = document.getElementById('music-background');
  music.pause();
}

export function playBackgroundMusic(volume) {
  const music = document.getElementById('music-background');
  music.volume = volume/2;
  music.play();
}

export function playThudSound(volume) {
  const music = document.getElementById('sound-thud');
  music.volume = volume;
  music.play();
}

export function playWinSound(volume) {
  const music = document.getElementById('sound-win');
  music.volume = volume;
  music.play();
}

export function setMinimumNumberOfMovesLabel(moves) {
  document.getElementById('minimumNumberOfMovesLabel').innerHTML = moves;
}

export function setPuzzleNumber(puzzleNumber) {
  document.getElementById('puzzleLabel').innerHTML = puzzleNumber;
}

export function showApp() {
  document.getElementById('app').style.display = 'table';
}

export function showHeaderBar() {
  document.getElementById('header').style.visibility = 'visible';
}

export function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

export function swapRobotControlsToRed() {
  setAllRobotsToUnselected();
  document.getElementById('red-robot-control').className = 'selected';
}

export function swapRobotControlsToGreen() {
  setAllRobotsToUnselected();
  document.getElementById('green-robot-control').className = 'selected';
}

export function swapRobotControlsToBlue() {
  setAllRobotsToUnselected();
  document.getElementById('blue-robot-control').className = 'selected';
}

export function swapRobotControlsToYellow() {
  setAllRobotsToUnselected();
  document.getElementById('yellow-robot-control').className = 'selected';
}

function setAllRobotsToUnselected() {
  document.getElementById('red-robot-control').className = 'unselected';
  document.getElementById('green-robot-control').className = 'unselected';
  document.getElementById('blue-robot-control').className = 'unselected';
  document.getElementById('yellow-robot-control').className = 'unselected';
}
